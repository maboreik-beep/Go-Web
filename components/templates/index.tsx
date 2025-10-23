import React from 'react';
import { TemplateProps } from './types';
import { DefaultTemplate } from './designs/DefaultTemplate';
import { VideographTemplate } from './designs/VideographTemplate';
import { KarmaTemplate } from './designs/KarmaTemplate';
import { ConsolutionTemplate } from './designs/ConsolutionTemplate';
import { AranozTemplate } from './designs/AranozTemplate';
import { UmeetTemplate } from './designs/UmeetTemplate';
import { DentoTemplate } from './designs/DentoTemplate';
import { ArcadeTemplate } from './designs/ArcadeTemplate';
import { ProductTemplate } from './designs/ProductTemplate';
import { HomeyTemplate } from './designs/HomeyTemplate';
import { PatoTemplate } from './designs/PatoTemplate';
import { JonyTemplate } from './designs/JonyTemplate';
import { AcademiaTemplate } from './designs/AcademiaTemplate';
import { LawncareTemplate } from './designs/LawncareTemplate';

export const TemplateRenderer: React.FC<TemplateProps> = (props) => {
  const { content } = props;

  switch (content.templateId) {
    case 'videograph':
      return <VideographTemplate {...props} />;
    case 'karma':
      return <KarmaTemplate {...props} />;
    case 'consolution':
      return <ConsolutionTemplate {...props} />;
    case 'aranoz':
      return <AranozTemplate {...props} />;
    case 'umeet':
      return <UmeetTemplate {...props} />;
    case 'dento':
        return <DentoTemplate {...props} />;
    case 'arcade':
        return <ArcadeTemplate {...props} />;
    case 'product':
        return <ProductTemplate {...props} />;
    case 'homey':
        return <HomeyTemplate {...props} />;
    case 'pato':
        return <PatoTemplate {...props} />;
    case 'jony':
        return <JonyTemplate {...props} />;
    case 'academia':
        return <AcademiaTemplate {...props} />;
    case 'lawncare':
        return <LawncareTemplate {...props} />;
    case 'default':
    default:
      return <DefaultTemplate {...props} />;
  }
};
