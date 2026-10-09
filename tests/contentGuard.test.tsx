import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AboutSection } from '../src/components/AboutSection';
import { ResearchSection } from '../src/components/ResearchSection';
import { SelectedWorkSection } from '../src/components/SelectedWorkSection';
import { MethodsSkillsSection } from '../src/components/MethodsSkillsSection';
import { EducationExperienceSection } from '../src/components/EducationExperienceSection';
import { WritingPresentationsSection } from '../src/components/WritingPresentationsSection';
import { EthicalPracticeSection } from '../src/components/EthicalPracticeSection';
import { HeroSection } from '../src/components/HeroSection';
import type { Profile } from '../src/types/profile';
import type { Project } from '../src/types/project';

const baseMockProfile: Profile = {
  name: 'Test Candidate',
  role: 'MSc Student',
  programme: 'MSc Psychology',
  institution: 'Test University',
  contactEmail: 'candidate@test.ac.in',
};

describe('ContentGuard & Conditional Rendering Requirements', () => {
  it('omits AboutSection when bio is absent or whitespace', () => {
    const { container: emptyContainer } = render(
      <AboutSection profile={{ ...baseMockProfile, bio: '' }} />
    );
    expect(emptyContainer.firstChild).toBeNull();

    const { container: spaceContainer } = render(
      <AboutSection profile={{ ...baseMockProfile, bio: '   ' }} />
    );
    expect(spaceContainer.firstChild).toBeNull();
  });

  it('caps working principles at a maximum of 4 entries (Requirement 7.2)', () => {
    const profileWithFivePrinciples: Profile = {
      ...baseMockProfile,
      bio: 'Valid academic bio text here.',
      workingPrinciples: ['One', 'Two', 'Three', 'Four', 'Five - should be discarded'],
    };

    render(<AboutSection profile={profileWithFivePrinciples} />);
    expect(screen.getByText('One')).toBeInTheDocument();
    expect(screen.getByText('Four')).toBeInTheDocument();
    expect(screen.queryByText('Five - should be discarded')).toBeNull();
  });

  it('omits ResearchSection when researchQuestions is empty (Requirement 8.3)', () => {
    const { container } = render(
      <ResearchSection profile={{ ...baseMockProfile, researchQuestions: [] }} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('omits SelectedWorkSection when no projects have visibility "public" (Requirement 9.7)', () => {
    const omittedProjects: Project[] = [
      {
        slug: 'internal-study',
        title: 'Confidential Study',
        summary: 'Internal',
        visibility: 'omit',
      },
    ];

    const { container } = render(
      <BrowserRouter>
        <SelectedWorkSection projects={omittedProjects} />
      </BrowserRouter>
    );
    expect(container.firstChild).toBeNull();
  });

  it('omits hero CV download button when cvPath is absent or empty (Requirement 6.6)', () => {
    render(<HeroSection profile={{ ...baseMockProfile, cvPath: undefined }} />);
    expect(screen.queryByText(/Download CV/i)).toBeNull();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
  });

  it('renders CV button when cvPath is non-empty', () => {
    render(<HeroSection profile={{ ...baseMockProfile, cvPath: '/test-cv.pdf' }} />);
    expect(screen.getByText(/Download CV/i)).toBeInTheDocument();
  });

  it('omits MethodsSkillsSection when skills is empty (Requirement 10.4)', () => {
    const { container } = render(
      <MethodsSkillsSection profile={{ ...baseMockProfile, skills: [] }} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('does NOT render education status as "completed" when status is "in progress" (Requirement 11.3)', () => {
    const profileWithProgressEdu: Profile = {
      ...baseMockProfile,
      education: [
        {
          degree: 'MSc Cognitive Science',
          institution: 'Delhi University',
          startDate: '2025',
          status: 'in progress',
        },
      ],
    };

    render(<EducationExperienceSection profile={profileWithProgressEdu} />);
    expect(screen.getByText('in progress')).toBeInTheDocument();
    expect(screen.queryByText('completed')).toBeNull();
  });

  it('omits WritingPresentationsSection when publication has no date (Requirement 12.1 & 12.3)', () => {
    const profileInvalidPub: Profile = {
      ...baseMockProfile,
      publications: [
        {
          title: 'Paper without date',
          date: '',
        },
      ],
    };

    const { container } = render(
      <WritingPresentationsSection profile={profileInvalidPub} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('omits EthicalPracticeSection when ethicalPractice is empty or whitespace (Requirement 13.3)', () => {
    const { container } = render(
      <EthicalPracticeSection profile={{ ...baseMockProfile, ethicalPractice: '   ' }} />
    );
    expect(container.firstChild).toBeNull();
  });
});
