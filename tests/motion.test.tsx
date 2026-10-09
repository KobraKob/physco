import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AttentionField } from '../src/components/AttentionField';
import { EvidenceTrail } from '../src/components/EvidenceTrail';
import { SectionLabel } from '../src/components/SectionLabel';
import { SiteFooter } from '../src/components/SiteFooter';
import { profile } from '../src/content/profile';
import { projects } from '../src/content/projects';

describe('Motion Design Addendum — The Curious Margin Motion System', () => {
  it('renders AttentionField SVG with aria-hidden="true" and decorative role', () => {
    const { container } = render(<AttentionField />);
    const svg = container.querySelector('svg.attention-field-svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveAttribute('viewBox', '0 0 680 440');
  });

  it('provides accessible Shift Focus toolbar with Notice, Connect, and Context buttons (Signature Interaction D)', () => {
    render(<AttentionField />);
    const toolbar = screen.getByRole('toolbar', { name: /shift focus exploration/i });
    expect(toolbar).toBeInTheDocument();

    const noticeBtn = screen.getByRole('button', { name: 'Notice' });
    const connectBtn = screen.getByRole('button', { name: 'Connect' });
    const contextBtn = screen.getByRole('button', { name: 'Context' });

    expect(noticeBtn).toHaveAttribute('aria-pressed', 'true');
    expect(connectBtn).toHaveAttribute('aria-pressed', 'false');
    expect(contextBtn).toHaveAttribute('aria-pressed', 'false');

    // Activating Connect shifts focus state
    fireEvent.click(connectBtn);
    expect(noticeBtn).toHaveAttribute('aria-pressed', 'false');
    expect(connectBtn).toHaveAttribute('aria-pressed', 'true');
  });

  it('renders EvidenceTrail with all supplied content stages (Signature Interaction B)', () => {
    const testStages = [
      { key: 'question', label: 'Question' },
      { key: 'context', label: 'Context' },
      { key: 'method', label: 'Method' },
      { key: 'findings', label: 'Findings' },
    ];

    render(<EvidenceTrail stages={testStages} />);

    expect(screen.getByText('Question')).toBeInTheDocument();
    expect(screen.getByText('Context')).toBeInTheDocument();
    expect(screen.getByText('Method')).toBeInTheDocument();
    expect(screen.getByText('Findings')).toBeInTheDocument();
  });

  it('renders SectionLabel with Marginalia rule and index in static-first structure (Signature Interaction C)', () => {
    const { container } = render(
      <SectionLabel index="02" label="Focal Areas" title="Research Questions" />
    );

    expect(screen.getByText('[02]')).toBeInTheDocument();
    expect(screen.getByText('Research Questions')).toBeInTheDocument();

    const rule = container.querySelector('.marginalia-bracket-line');
    expect(rule).toBeInTheDocument();
  });

  it('renders accessible Still Mode Motion toggle in SiteFooter (Section 7.8 Addendum)', () => {
    render(<SiteFooter profile={profile} projects={projects} />);

    const motionBtn = screen.getByRole('button', { name: /motion:/i });
    expect(motionBtn).toBeInTheDocument();

    // Toggle Still Mode On/Off
    fireEvent.click(motionBtn);
    expect(document.documentElement.classList.contains('motion-disabled')).toBe(true);

    fireEvent.click(motionBtn);
    expect(document.documentElement.classList.contains('motion-disabled')).toBe(false);
  });
});
