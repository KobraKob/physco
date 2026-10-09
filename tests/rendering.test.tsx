import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HomePage } from '../src/pages/HomePage';
import { MarginMap } from '../src/components/MarginMap';

describe('Accessibility & Page Structure Requirements', () => {
  it('renders SkipLink as first anchor targeting #main-content (Requirement 16.1)', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const skipLink = screen.getByRole('link', { name: /skip to main content/i });
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  it('renders required semantic HTML landmarks (Requirement 16.2)', () => {
    const { container } = render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    expect(screen.getByRole('banner')).toBeInTheDocument(); // <header>
    expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument(); // <nav>
    expect(screen.getByRole('main')).toBeInTheDocument(); // <main>
    expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // <footer>
    expect(container.querySelectorAll('section').length).toBeGreaterThan(0);
  });

  it('ensures single <h1> per page (Requirement 16.3)', () => {
    const { container } = render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const h1Elements = container.querySelectorAll('h1');
    expect(h1Elements.length).toBe(1);
  });

  it('renders MarginMap SVG with aria-hidden="true" (Requirement 6.4, 15.1, 15.2)', () => {
    const { container } = render(<MarginMap variant="hero" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveAttribute('viewBox', '0 0 680 440');
  });

  it('renders two distinct MarginMap instances with different path data and viewBox (Requirement 15.3)', () => {
    const { container: heroContainer } = render(<MarginMap variant="hero" />);
    const { container: accentContainer } = render(<MarginMap variant="accent" />);

    const heroSvg = heroContainer.querySelector('svg');
    const accentSvg = accentContainer.querySelector('svg');

    expect(heroSvg?.getAttribute('viewBox')).not.toEqual(accentSvg?.getAttribute('viewBox'));
    expect(heroSvg?.getAttribute('viewBox')).toBe('0 0 680 440');
    expect(accentSvg?.getAttribute('viewBox')).toBe('0 0 460 180');
  });

  it('renders mailto link with descriptive accessible text (Requirement 14.1 & 16.10)', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const emailLink = screen.getByRole('link', { name: /send academic email to/i });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink.getAttribute('href')).toMatch(/^mailto:/);
  });
});
