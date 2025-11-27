import { ReactNode } from 'react';

interface IfProps {
  condition: string;
  children: ReactNode;
  else?: ReactNode;
}

/**
 * If component that generates Handlebars syntax for conditional rendering
 * Usage: 
 *   <If condition="reason">
 *     <Section>...</Section>
 *   </If>
 * 
 *   <If condition="bannedUntil" else={<Section>Permanent</Section>}>
 *     <Section>Temporary</Section>
 *   </If>
 * 
 * Output: 
 *   {{#if reason}}<Section>...</Section>{{/if}}
 *   {{#if bannedUntil}}<Section>Temporary</Section>{{else}}<Section>Permanent</Section>{{/if}}
 */
export const If = ({ condition, children, else: elseContent }: IfProps) => {
  // This component will be replaced during build with Handlebars syntax
  // The build script will detect this component's usage and wrap the content with {{#if condition}}...{{/if}}
  // We use a special HTML element that the build script can detect
  return (
    <div data-handlebars-if={condition} data-handlebars-else={elseContent ? 'true' : undefined} style={{ display: 'contents' }}>
      {children}
      {elseContent && (
        <div data-handlebars-else-content style={{ display: 'contents' }}>
          {elseContent}
        </div>
      )}
    </div>
  ) as any;
};

