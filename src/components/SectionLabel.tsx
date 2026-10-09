import React from 'react';

export interface SectionLabelProps {
  index: string;
  label: string;
  title: string;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({ index, label, title }) => {
  return (
    <div className="section-header-block">
      <div className="section-label">
        <span className="section-label-index">[{index}]</span>
        <span>{label}</span>
      </div>
      <h2 className="section-title">{title}</h2>
    </div>
  );
};
