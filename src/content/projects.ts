import type { Project } from '../types/project';

/**
 * Academic and research projects archive.
 *
 * Each project conforms to the strict sequence:
 * Question → Context → Method → Contribution → Findings / Learning → Limitations → References / Artefact
 *
 * Fields are conditionally rendered; empty/absent fields are not rendered.
 */
export const projects: Project[] = [
  {
    slug: 'heuristic-drift-probability-estimation',
    title: 'Heuristic Drift: Contextual Shifts in Probability Estimation Under Cognitive Load',
    year: '2025 – 2026',
    context: 'MSc Thesis Investigation (In Progress)',
    summary:
      'An empirical inquiry into how dual-task cognitive load alters reliance on representativeness heuristics versus base-rate probability calibration in complex vignette judgements.',
    question:
      'Does concurrent working memory load induce a systematic bias toward stereotypical heuristics even when normative base-rate probabilities are explicitly highlighted?',
    contribution:
      'Developed the experimental factorial paradigm, pre-registered the analysis plan on OSF, programmed the computerized stimulus sequence in PsychoPy, and conducted preliminary pilot verification across N=24 participants.',
    methods: [
      '2x2 Mixed Factorial Experimental Design',
      'Dual-task N-back working memory load manipulation',
      'Computerised reaction-time and choice registration (PsychoPy)',
      'Linear Mixed-Effects Modelling (LMM) in R and Jamovi',
    ],
    findingsOrLearning:
      'Preliminary pilot trials indicate an 18% increase in stereotypical choice selection under high cognitive load (2-back condition) accompanied by elevated response latencies, suggesting that base-rate integration relies critically on available central executive capacity.',
    limitations:
      'Pilot observations are restricted to a university student sample; generalisation to professional probabilistic risk evaluators remains unverified. Follow-up study will expand the demographic diversity.',
    collaborators: ['R. Nair (Peer Research Associate)'],
    supervisor: 'Dr. V. K. Ramanathan, Associate Professor of Cognitive Psychology',
    references: [
      {
        label: 'Kahneman, D., & Tversky, A. (1973). Availability: A heuristic for judging frequency and probability.',
        href: 'https://doi.org/10.1016/0010-0285(73)90033-9',
      },
      {
        label: 'Evans, J. S. B. (2008). Dual-processing accounts of reasoning, judgment, and social cognition.',
        href: 'https://doi.org/10.1146/annurev.psych.59.103006.093629',
      },
    ],
    artefact: {
      label: 'View Open Science Framework Preregistration',
      href: 'https://osf.io/ananya-sharma/heuristic-drift',
      kind: 'external',
    },
    visibility: 'public',
  },
  {
    slug: 'media-multitasking-attentional-shift-latencies',
    title: 'Media Multitasking and Attentional Shift Latencies Among Young Adults',
    year: '2024 – 2025',
    context: 'Undergraduate BSc Honors Dissertation',
    summary:
      'A laboratory-based behavioral study examining task-switching cost differentials between high and low chronic media multitaskers using a modified cued task-switching paradigm.',
    question:
      'Do frequent media multitaskers demonstrate enhanced attentional flexibility or elevated switch cost penalties when transitioning between rule-governed classification tasks?',
    contribution:
      'Independently formulated the research protocol, adapted the Ophir et al. Media Use Questionnaire (MMI) for university cohorts, recruited N=86 undergraduate participants, executed lab testing sessions, and performed two-way repeated measures ANOVA.',
    methods: [
      'Cued Task-Switching Computerized Protocol',
      'Media Multitasking Index (MMI) Classification',
      'Two-Way Repeated Measures ANOVA in JASP',
      'Error Rate & Reaction Time Trimming Protocols',
    ],
    findingsOrLearning:
      'High media multitaskers exhibited significantly greater switch cost latencies (p < .01, partial η² = .11) than light media multitaskers, corroborating the hypothesis that habitual parallel media consumption correlates with diminished top-down filter control rather than superior multitasking competence.',
    limitations:
      'Cross-sectional observational design precludes causal inferences. Future longitudinal studies are required to determine whether media habits cause filter deficits or individuals with lower attentional control gravitate toward multitasking environments.',
    supervisor: 'Dr. M. Chawla, Senior Lecturer in Experimental Psychology',
    references: [
      {
        label: 'Ophir, E., Nass, C., & Wagner, A. D. (2009). Cognitive control in media multitaskers.',
        href: 'https://doi.org/10.1073/pnas.0903620106',
      },
      {
        label: 'Uncapher, M. R., & Wagner, A. D. (2018). Minds and media, attention and memory: A review of media multitasking.',
        href: 'https://doi.org/10.1016/j.cobeha.2018.06.011',
      },
    ],
    artefact: {
      label: 'Read Dissertation Abstract & Summary Brief',
      href: 'https://doi.org/10.1000/placeholder-student-colloquium-2025',
      kind: 'external',
    },
    visibility: 'public',
  },
  {
    slug: 'framing-effects-prosocial-resource-allocation',
    title: 'Framing Effects in Prosocial Resource Allocation: A Direct Preregistered Replication',
    year: '2023 – 2024',
    context: 'Supervised Advanced Research Methods Coursework',
    summary:
      'A multi-condition experimental replication evaluating how gain versus loss framing modulates public goods donation intentions across hypothetical crisis relief scenarios.',
    question:
      'Does message framing in terms of saved lives versus preventable deaths reliably shift participant willingness to allocate discretionary resources in a South Asian urban context?',
    contribution:
      'Co-designed vignette scenarios, ensured cultural translation validity, programmed online survey instruments in Qualtrics with counterbalanced presentation orders, and conducted non-parametric Mann-Whitney U and Wilcoxon signed-rank tests.',
    methods: [
      'Online Experimental Vignette Design',
      'Gain vs. Loss Framing Semantic Condition Manipulation',
      'Preregistered Hypotheses & Power Analysis (G*Power)',
      'Robust Non-Parametric Hypothesis Verification in R',
    ],
    findingsOrLearning:
      'Participants in the loss-framed scenario demonstrated higher average willingness to contribute (median difference = 24%, p = .023), closely replicating classic prospect theory asymmetries in a novel regional context.',
    limitations:
      'Hypothetical contribution choices may not fully translate to incentivised behavioral giving with real financial stakes.',
    collaborators: ['P. Deshmukh', 'K. Sen'],
    supervisor: 'Prof. S. Sengupta',
    references: [
      {
        label: 'Tversky, A., & Kahneman, D. (1981). The framing of decisions and the psychology of choice.',
        href: 'https://doi.org/10.1126/science.7455683',
      },
    ],
    artefact: {
      label: 'Explore Preregistered Replication Protocol',
      href: 'https://osf.io/ananya-sharma/prosocial-framing',
      kind: 'external',
    },
    visibility: 'public',
  },
];
