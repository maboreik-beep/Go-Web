import { Timestamp } from "firebase/firestore";

export interface User {
  uid: string;
  email: string;
  name?: string;
  company?: string;
  industry?: string;
  phone?: string;
  plan: 'basic' | 'premium' | 'express';
  isAdmin?: boolean;
  isAnonymous?: boolean;
}

// FIX: Add AppView enum and NavigateTo type definition to resolve import errors.
export enum AppView {
  LANDING,
  EDITOR,
  DASHBOARD,
}

export type NavigateTo = (view: AppView) => void;

export type LanguageMode = 'en' | 'ar' | 'bilingual';

export type TemplateId = 'default' | 'videograph' | 'karma' | 'consolution' | 'aranoz' | 'umeet' | 'dento' | 'arcade' | 'product' | 'homey' | 'pato' | 'jony' | 'academia' | 'lawncare' | 'goonlinepro';

export type PageType = 'BLANK' | 'ABOUT' | 'SERVICES' | 'CONTACT' | 'GALLERY' | 'PRODUCTS' | 'TEAM' | 'NEWS_EVENTS' | 'FEATURES' | 'TESTIMONIALS' | 'PRICING' | 'DOWNLOAD_CATALOG';

export type MultilingualText = {
  en: string;
  ar: string;
};

export type TextContent = string | MultilingualText;

export interface SectionConfig {
  id: keyof SectionContent;
  name: string;
  visible: boolean;
}

export interface ServiceItem {
  name: TextContent;
  description: TextContent;
  icon: string;
}

export interface TestimonialItem {
  quote: TextContent;
  author: TextContent;
  authorRole: TextContent;
}

export interface FeatureItem {
    name: TextContent;
    description: TextContent;
    icon: string;
}

export interface TeamMemberItem {
    name: TextContent;
    role: TextContent;
    imageUrl: string;
}

export interface FAQItem {
    question: TextContent;
    answer: TextContent;
}

export interface PricingTier {
    name: TextContent;
    price: TextContent;
    frequency: TextContent;
    features: TextContent[];
    isFeatured: boolean;
}

export interface GalleryItem {
    imageUrl: string;
    caption: TextContent;
}

export interface CallToActionContent {
    headline: TextContent;
    subheadline: TextContent;
    ctaButton: TextContent;
}

export interface FormContent {
    title: TextContent;
    recipientEmail: string;
    submitButtonText: TextContent;
}


export interface SectionContent {
  hero: {
    headline: TextContent;
    subheadline: TextContent;
    ctaButton: TextContent;
    imageUrl: string;
  };
  about: {
    title: TextContent;
    text: TextContent;
    imageUrl: string;
  };
  services: {
    title: TextContent;
    items: ServiceItem[];
  };
  features: {
      title: TextContent;
      items: FeatureItem[];
  };
  team: {
      title: TextContent;
      items: TeamMemberItem[];
  };
  testimonials: {
      title: TextContent;
      items: TestimonialItem[];
  };
  pricing: {
      title: TextContent;
      items: PricingTier[];
  };
  faq: {
      title: TextContent;
      items: FAQItem[];
  };
  gallery: {
      title: TextContent;
      items: GalleryItem[];
  };
  cta: CallToActionContent;
  form: FormContent;
  contact: {
    title: TextContent;
    address: TextContent;
    email: string;
    phone: string;
  };
}


export interface Page {
    id: string;
    name: TextContent;
    slug: string;
    sections: SectionConfig[];
    content: SectionContent;
}


export interface WebsiteContent {
  languageMode: LanguageMode;
  templateId: TemplateId;
  theme: {
    primaryColor: string;
    font: string;
  };
  siteName: TextContent;
  pages: Page[];
  activePageId: string;
  userId: string;
  lastUpdated?: Timestamp,
  // New fields for publishing
  slug?: string;
  isPublished?: boolean;
}


// Summary of website data for the admin panel
export interface AdminWebsiteView {
    id: string;
    siteName: TextContent;
    slug?: string;
    isPublished?: boolean;
    lastUpdated: Date;
    userId: string;
    userEmail: string;
}