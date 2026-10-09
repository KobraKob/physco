import type { LinkItem } from './project';

export type SkillExperienceLevel =
  | 'coursework exposure'
  | 'used in a supervised project'
  | 'independent project experience';

export type SkillItem = {
  name: string;
  category: string;
  experienceLevel?: SkillExperienceLevel;
  example?: string;
};

export type EducationStatus = 'in progress' | 'completed' | 'deferred';

export type EducationItem = {
  degree: string;
  institution: string;
  startDate: string;
  endDate?: string;
  expectedEndDate?: string;
  completionDate?: string;
  status: EducationStatus;
  dissertation?: string;
  thesis?: string;
  relevantCoursework?: string[];
};

export type ExperienceItem = {
  role: string;
  organization: string;
  period: string;
  description: string;
};

export type PublicationItem = {
  title: string;
  authors?: string;
  venue?: string;
  date: string;
  doi?: string;
  url?: string;
};

export type ResearchQuestion = {
  topic: string;
  description?: string;
};

export type Profile = {
  name: string;
  role: string;
  programme: string;
  institution: string;
  expectedCompletionDate?: string;
  headline?: string;
  bio?: string;
  workingPrinciples?: string[];
  researchQuestions?: ResearchQuestion[];
  skills?: SkillItem[];
  education?: EducationItem[];
  experience?: ExperienceItem[];
  publications?: PublicationItem[];
  ethicalPractice?: string;
  portraitPath?: string;
  cvPath?: string;
  contactEmail: string;
  links?: LinkItem[];
};
