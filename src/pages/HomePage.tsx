import React, { useEffect } from 'react';
import { profile } from '../content/profile';
import { projects } from '../content/projects';
import { SITE_CONFIG } from '../content/config';
import { SkipLink } from '../components/SkipLink';
import { SiteHeader } from '../components/SiteHeader';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { ResearchSection } from '../components/ResearchSection';
import { SelectedWorkSection } from '../components/SelectedWorkSection';
import { MethodsSkillsSection } from '../components/MethodsSkillsSection';
import { EducationExperienceSection } from '../components/EducationExperienceSection';
import { WritingPresentationsSection } from '../components/WritingPresentationsSection';
import { EthicalPracticeSection } from '../components/EthicalPracticeSection';
import { ContactSection } from '../components/ContactSection';
import { SiteFooter } from '../components/SiteFooter';

export const HomePage: React.FC = () => {
  // Update document title for SEO
  useEffect(() => {
    document.title = `${profile.name} — ${profile.programme} | Academic Research Portfolio`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', SITE_CONFIG.defaultDescription);
    }
  }, []);

  return (
    <>
      <SkipLink />
      <SiteHeader profile={profile} projects={projects} />

      <main id="main-content" tabIndex={-1}>
        <HeroSection profile={profile} />
        <AboutSection profile={profile} />
        <ResearchSection profile={profile} />
        <SelectedWorkSection projects={projects} />
        <MethodsSkillsSection profile={profile} />
        <EducationExperienceSection profile={profile} />
        <WritingPresentationsSection profile={profile} />
        <EthicalPracticeSection profile={profile} />
        <ContactSection profile={profile} />
      </main>

      <SiteFooter profile={profile} projects={projects} />
    </>
  );
};
