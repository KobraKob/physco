import type { Profile } from '../types/profile';

/**
 * Primary student profile data.
 *
 * All personal details and academic credentials are maintained here.
 * If any optional field is omitted or undefined, the UI automatically hides
 * the corresponding element (ContentGuard policy).
 */
export const profile: Profile = {
  name: 'Ananya Sharma',
  role: 'MSc Psychology Candidate',
  programme: 'MSc in Psychological Science',
  institution: 'Department of Psychology, University of Delhi',
  expectedCompletionDate: 'July 2027',
  headline: 'Questions first. Evidence next. Conclusions held with discipline.',
  bio: 'Currently pursuing an MSc in Psychological Science, focusing on cognitive heuristics, social perception, and the contextual factors that shape decision-making under uncertainty. My academic orientation is grounded in methodological rigor: combining transparent experimental design, reproducible quantitative analysis, and careful appraisal of behavioral evidence. I treat psychology not as a set of static answers, but as a discipline of structured inquiry that demands continual empirical testing and ethical modesty.',
  workingPrinciples: [
    'Empirical grounding over speculative assertion',
    'Contextual boundary awareness in behavioural findings',
    'Methodological transparency and open science principles',
    'Ethical diligence regarding participant autonomy and dignity',
  ],
  researchQuestions: [
    {
      topic: 'Cognitive Framing & Evaluative Choice Under Ambiguity',
      description:
        'Examining how semantic presentation shifts risk assessment and choice justification in time-constrained scenario evaluations.',
    },
    {
      topic: 'Social Perception & Cross-Cultural Attribution Biases',
      description:
        'Investigating whether fundamental attribution patterns replicate consistently across varied socio-economic community settings.',
    },
    {
      topic: 'Metacognitive Confidence & Information Appraisal',
      description:
        'Exploring the alignment between subjective certainty and objective accuracy during complex digital information evaluation.',
    },
  ],
  skills: [
    {
      name: 'Experimental Design & Factorial Tasks',
      category: 'Research Methods',
      experienceLevel: 'used in a supervised project',
      example: 'Designed 2x2 factorial between-subjects laboratory experiment',
    },
    {
      name: 'Systematic Literature Search & PRISMA Review',
      category: 'Research Methods',
      experienceLevel: 'independent project experience',
      example: 'Conducted scoping review of 48 peer-reviewed decision-making studies',
    },
    {
      name: 'Qualitative Semi-Structured Interviewing',
      category: 'Research Methods',
      experienceLevel: 'coursework exposure',
      example: 'Piloted transcript thematic extraction protocol',
    },
    {
      name: 'Statistical Hypothesis Testing (ANOVA, GLM, Regression)',
      category: 'Data & Analysis',
      experienceLevel: 'used in a supervised project',
      example: 'Analysed behavioral reaction time and choice distribution in Jamovi & R',
    },
    {
      name: 'R & RStudio for Behavioral Data Wrangling',
      category: 'Data & Analysis',
      experienceLevel: 'used in a supervised project',
      example: 'Data transformation pipeline with tidyverse and ggplot2 visualisations',
    },
    {
      name: 'JASP & Jamovi Reproducible Analysis',
      category: 'Data & Analysis',
      experienceLevel: 'independent project experience',
      example: 'Parametric and non-parametric verification with open analysis files',
    },
    {
      name: 'Academic Writing & APA 7th Edition Referencing',
      category: 'Scholarly Communication',
      experienceLevel: 'independent project experience',
      example: 'Author of empirical research reports and structured research proposals',
    },
    {
      name: 'Scientific Poster & Oral Presentations',
      category: 'Scholarly Communication',
      experienceLevel: 'used in a supervised project',
      example: 'Presented poster findings at regional student colloquium',
    },
  ],
  education: [
    {
      degree: 'MSc in Psychological Science',
      institution: 'University of Delhi',
      startDate: '2025',
      expectedEndDate: '2027',
      status: 'in progress',
      thesis: 'Heuristic Drift: Contextual Shifts in Probability Estimation Under Cognitive Load',
      relevantCoursework: [
        'Advanced Research Methodology & Statistics',
        'Cognitive Psychology & Neuropsychological Bases',
        'Advanced Social Psychology & Cultural Perspectives',
        'Psychometrics & Test Construction Principles',
      ],
    },
    {
      degree: 'BSc (Hons) in Psychology',
      institution: 'University of Delhi',
      startDate: '2022',
      endDate: '2025',
      completionDate: 'June 2025',
      status: 'completed',
      dissertation: 'Media Multitasking and Attentional Shift Latencies Among Young Adults',
      relevantCoursework: [
        'Experimental Psychology Practicals',
        'Developmental Psychology',
        'Statistics in Psychological Research',
        'Foundations of Biopsychology',
      ],
    },
  ],
  experience: [
    {
      role: 'Graduate Research Assistant (Cognitive Lab)',
      organization: 'Department of Psychology, University of Delhi',
      period: 'Aug 2025 – Present',
      description:
        'Assisting in experimental session coordination, stimulus calibration using PsychoPy, data entry protocol verification, and anonymised dataset archiving.',
    },
    {
      role: 'Undergraduate Peer Tutor — Statistics in Psychology',
      organization: 'Faculty of Arts Academic Support Cell',
      period: 'Jan 2024 – Apr 2025',
      description:
        'Conducted weekly peer tutorial sessions on descriptive statistics, probability distributions, t-tests, and correlation interpretation for second-year psychology cohorts.',
    },
  ],
  publications: [
    {
      title: 'Attentional Re-engagement Latency Following Digital Task Interruption: An Exploratory Student Cohort Study',
      authors: 'Sharma, A., & Gupta, R.',
      venue: 'National Student Psychology Colloquium Proceedings',
      date: 'March 2025',
      url: 'https://doi.org/10.1000/placeholder-student-colloquium-2025',
    },
  ],
  ethicalPractice:
    'Scholarly inquiry in psychology carries profound ethical responsibilities toward participants, data fidelity, and public discourse. I adhere strictly to institutional ethics guidelines (including ICMR ethical principles and APA research standards): ensuring documented voluntary informed consent, uncompromising participant anonymisation, unambiguous boundaries regarding scope of competence, and transparent reporting of methodology without data pruning or ungrounded generalisations. I do not offer clinical diagnoses or psychological treatment, and all presented research reflects academic inquiry under faculty supervision.',
  contactEmail: 'ananya.sharma.psych@gmail.com',
  links: [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/ananya-sharma-psych',
      kind: 'external',
    },
    {
      label: 'ORCID Record',
      href: 'https://orcid.org/0009-0000-0000-0000',
      kind: 'external',
    },
    {
      label: 'Open Science Framework (OSF)',
      href: 'https://osf.io/ananya-sharma',
      kind: 'external',
    },
  ],
};
