export type LinkItem = {
  label: string;
  href: string;
  kind?: "email" | "external" | "download";
};

export type Project = {
  slug: string;
  title: string;
  year?: string;
  context?: string; // thesis, coursework, independent study, presentation, etc.
  summary: string;
  question?: string;
  contribution?: string;
  methods?: string[];
  findingsOrLearning?: string;
  limitations?: string;
  collaborators?: string[];
  supervisor?: string;
  references?: { label: string; href: string }[];
  artefact?: LinkItem;
  visibility: "public" | "omit";
};
