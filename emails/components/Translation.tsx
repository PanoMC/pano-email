import { ReactNode } from 'react';

interface TranslationProps {
  key: string;
  fallback: string;
  children?: ReactNode;
}

/**
 * Translation component that generates Handlebars syntax for translations
 * Usage: <Translation key="reset-password" fallback="Reset Password" />
 * Output: {{#if translation.reset-password}}{{translation.reset-password}}{{else}}Reset Password{{/if}}
 */
export const Translation = ({ key, fallback }: TranslationProps) => {
  // This will be replaced during build with Handlebars syntax
  // The build script will convert this to: {{#if translation.key}}{{translation.key}}{{else}}fallback{{/if}}
  return `{{#if translation.${key}}}{{translation.${key}}}{{else}}${fallback}{{/if}}` as any;
};

