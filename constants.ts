import { TemplateId } from "./types";

export const TEMPLATES: { id: TemplateId; name: string; industries: string[] }[] = [
  { id: 'default', name: 'Evolve', industries: ['Tourism', 'Travel', 'Default'] },
  { id: 'videograph', name: 'Vision', industries: ['Design & Art', 'Entertainment', 'Photography'] },
  { id: 'karma', name: 'Aura', industries: ['Retail', 'Online Store'] },
  { id: 'consolution', name: 'Keystone', industries: ['Consulting', 'Business Services', 'Finance', 'Technology'] },
  { id: 'aranoz', name: 'Hearth', industries: ['Furniture'] },
  { id: 'umeet', name: 'Nexus', industries: ['Event', 'Non-profit'] },
  { id: 'dento', name: 'Serenity', industries: ['Healthcare', 'Medical'] },
  { id: 'arcade', name: 'Foundry', industries: ['Construction', 'Interior Design'] },
  { id: 'product', name: 'Vogue', industries: ['Fashion'] },
  { id: 'homey', name: 'Haven', industries: ['Real Estate'] },
  { id: 'pato', name: 'Savor', industries: ['Restaurant', 'Coffee Shop'] },
  { id: 'jony', name: 'Profile', industries: ['Freelancer', 'Professional Profile', 'Fitness'] },
  { id: 'academia', name: 'Erudite', industries: ['Education'] },
  { id: 'lawncare', name: 'Verdant', industries: ['Agriculture'] },
  { id: 'goonlinepro', name: 'Go Online Pro', industries: ['Gaming'] }
];


export const INDUSTRIES = [...new Set(TEMPLATES.flatMap(t => t.industries).filter(i => i !== 'Default'))].sort();

export const COLOR_PALETTES = [
  { name: 'GoOnline Green', color: '#94c11f' },
  { name: 'Ocean Blue', color: '#3b82f6' },
  { name: 'Sunset Orange', color: '#f97316' },
  { name: 'Royal Purple', color: '#8b5cf6' },
  { name: 'Crimson Red', color: '#dc2626' },
  { name: 'Modern Teal', color: '#14b8a6' },
];

export const AVAILABLE_SECTIONS = [
  { id: 'hero', name: 'Hero Section' },
  { id: 'about', name: 'About Us' },
  { id: 'services', name: 'Services' },
  { id: 'features', name: 'Features' },
  { id: 'team', name: 'Our Team' },
  { id: 'testimonials', name: 'Testimonials' },
  { id: 'pricing', name: 'Pricing' },
  { id: 'faq', name: 'FAQ' },
  { id: 'gallery', name: 'Gallery' },
  { id: 'cta', name: 'Call to Action' },
  { id: 'form', name: 'Contact Form' },
  { id: 'contact', name: 'Contact' },
];