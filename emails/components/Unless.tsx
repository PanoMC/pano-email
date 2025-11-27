import { ReactNode } from 'react';

interface UnlessProps {
  condition: string;
  children: ReactNode;
}

/**
 * Unless component that generates Handlebars syntax for negative conditional rendering
 * Usage: 
 *   <Unless condition="bannedUntil">
 *     <Section>Permanent suspension</Section>
 *   </Unless>
 * 
 * Output: 
 *   {{#unless bannedUntil}}<Section>Permanent suspension</Section>{{/unless}}
 */
export const Unless = ({ condition, children }: UnlessProps) => {
  // This component will be replaced during build with Handlebars syntax
  // The build script will detect this component's usage and wrap the content with {{#unless condition}}...{{/unless}}
  return (
    <div data-handlebars-unless={condition} style={{ display: 'contents' }}>
      {children}
    </div>
  ) as any;
};

