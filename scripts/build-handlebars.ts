import { render } from '@react-email/render';
import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';
import React from 'react';

interface EmailModule {
  default: React.ComponentType<any>;
  [key: string]: any;
}

// Helper function to create translation handlebars syntax
function t(key: string, fallback: string): string {
  return `{{#if translation.${key}}}{{translation.${key}}}{{else}}${fallback}{{/if}}`;
}

async function buildHandlebars() {
  const outputDir = path.join(process.cwd(), 'dist', 'handlebars');
  
  // Output dizinini oluştur
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Email dosyalarını bul
  const emailFiles = await glob('emails/**/*.tsx', {
    ignore: ['**/static/**', '**/*.test.tsx', '**/*.spec.tsx', '**/components/**'],
  });

  console.log(`Found ${emailFiles.length} email templates`);

  for (const emailFile of emailFiles) {
    try {
      // Email modülünü import et
      const emailModule: EmailModule = await import(
        path.resolve(process.cwd(), emailFile)
      );
      
      const EmailComponent = emailModule.default;
      
      if (!EmailComponent) {
        console.warn(`No default export found in ${emailFile}, skipping...`);
        continue;
      }

      // Preview props'ları al (varsa)
      const previewProps = (EmailComponent as any).PreviewProps || {};
      
      // React element'i oluştur ve HTML'e render et
      const element = React.createElement(EmailComponent, previewProps);
      const html = await render(element);

      // Handlebars HTML'i başlat
      let handlebarsHtml = html;
      
      // Preview props'larındaki değerleri Handlebars syntax'ına çevir
      // Önce uzun string'leri değiştir (daha spesifik olanlar önce)
      const sortedKeys = Object.keys(previewProps).sort((a, b) => {
        const aVal = String(previewProps[a]);
        const bVal = String(previewProps[b]);
        return bVal.length - aVal.length; // Uzun olanlar önce
      });

      sortedKeys.forEach((key) => {
        const value = previewProps[key];
        if (value != null && value !== '') {
          const stringValue = String(value);
          // HTML attribute'larındaki değerleri değiştir
          handlebarsHtml = handlebarsHtml.replace(
            new RegExp(`="${escapeRegex(stringValue)}"`, 'g'),
            `="{{${key}}}"`
          );
          // href attribute'larındaki değerleri değiştir
          handlebarsHtml = handlebarsHtml.replace(
            new RegExp(`href="${escapeRegex(stringValue)}"`, 'g'),
            `href="{{${key}}}"`
          );
          // HTML içeriğindeki değerleri değiştir (yalnızca tam eşleşme)
          handlebarsHtml = handlebarsHtml.replace(
            new RegExp(`>${escapeRegex(stringValue)}<`, 'g'),
            `>{{${key}}}<`
          );
          // Text node'lardaki değerleri değiştir
          handlebarsHtml = handlebarsHtml.replace(
            new RegExp(`>\\s*${escapeRegex(stringValue)}\\s*<`, 'g'),
            `>{{${key}}}<`
          );
        }
      });

      // Translation placeholder'larını handlebars syntax'ına çevir
      // {{TRANSLATION:key:fallback}} formatını {{#if translation.key}}{{translation.key}}{{else}}fallback{{/if}} formatına çevir
      handlebarsHtml = handlebarsHtml.replace(
        /\{\{TRANSLATION:([^:]+):([^}]+)\}\}/g,
        '{{#if translation.$1}}{{translation.$1}}{{else}}$2{{/if}}'
      );

      // Dosya adını oluştur
      const fileName = path.basename(emailFile, '.tsx');
      const outputPath = path.join(outputDir, `${fileName}.hbs`);

      // Handlebars dosyasını kaydet
      fs.writeFileSync(outputPath, handlebarsHtml, 'utf-8');
      console.log(`✓ Built ${fileName}.hbs`);
    } catch (error) {
      console.error(`Error building ${emailFile}:`, error);
      if (error instanceof Error) {
        console.error(error.stack);
      }
    }
  }

  console.log(`\n✓ Build complete! Handlebars templates saved to ${outputDir}`);
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

buildHandlebars().catch(console.error);
