import { render } from '@react-email/render';
import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';
import React from 'react';

interface EmailModule {
  default: React.ComponentType<any>;
  [key: string]: any;
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
      
      // Tüm props'larla render et
      const element = React.createElement(EmailComponent, previewProps);
      const html = await render(element);

      // Handlebars HTML'i başlat
      let handlebarsHtml = html;
      
      // Translation placeholder'larını önce çevir (props değerlerini çevirmeden önce)
      // {{TRANSLATION:key:fallback}} formatını {{#if translation.key}}{{translation.key}}{{else}}fallback{{/if}} formatına çevir
      let previousHtml = '';
      let iterations = 0;
      while (previousHtml !== handlebarsHtml && iterations < 10) {
        previousHtml = handlebarsHtml;
        iterations++;
        handlebarsHtml = handlebarsHtml.replace(
          /\{\{TRANSLATION:([^:]+):([^}]+)\}\}/g,
          (match, key, fallback) => {
            let processedFallback = fallback;
            if (processedFallback.includes('{{TRANSLATION:')) {
              processedFallback = processedFallback.replace(
                /\{\{TRANSLATION:([^:]+):([^}]+)\}\}/g,
                '{{#if translation.$1}}{{translation.$1}}{{else}}$2{{/if}}'
              );
            }
            return `{{#if translation.${key}}}{{translation.${key}}}{{else}}${processedFallback}{{/if}}`;
          }
        );
      }
      
      // Eksik {{/if}} kapanışlarını düzelt (HTML render edilirken kesilmiş olabilir)
      handlebarsHtml = handlebarsHtml.replace(
        /\{\{TRANSLATION:([^:]+):([^}]+)\}(?!\}\})/g,
        (match, key, fallback) => {
          let processedFallback = fallback;
          if (processedFallback.includes('{{TRANSLATION:')) {
            processedFallback = processedFallback.replace(
              /\{\{TRANSLATION:([^:]+):([^}]+)\}\}/g,
              '{{#if translation.$1}}{{translation.$1}}{{else}}$2{{/if}}'
            );
          }
          return `{{#if translation.${key}}}{{translation.${key}}}{{else}}${processedFallback}{{/if}}`;
        }
      );

      // If ve Unless component'lerini Handlebars syntax'ına çevir
      // data-handlebars-if attribute'unu bul ve içeriği {{#if condition}}...{{/if}} ile sarmala
      handlebarsHtml = handlebarsHtml.replace(
        /<div[^>]*data-handlebars-if="([^"]+)"[^>]*data-handlebars-else="true"[^>]*>([\s\S]*?)<div[^>]*data-handlebars-else-content[^>]*>([\s\S]*?)<\/div><\/div>/g,
        (match, condition, content, elseContent) => {
          // data-handlebars-if ve data-handlebars-else-content attribute'larını içeren div tag'lerini kaldır
          const cleanContent = content.replace(/<div[^>]*data-handlebars-[^>]*>[\s\S]*?<\/div>/g, '').trim();
          const cleanElseContent = elseContent.replace(/<div[^>]*data-handlebars-[^>]*>[\s\S]*?<\/div>/g, '').trim();
          return `{{#if ${condition}}}${cleanContent}{{else}}${cleanElseContent}{{/if}}`;
        }
      );

      // data-handlebars-if attribute'unu bul (else olmadan) ve içeriği {{#if condition}}...{{/if}} ile sarmala
      handlebarsHtml = handlebarsHtml.replace(
        /<div[^>]*data-handlebars-if="([^"]+)"[^>]*(?!data-handlebars-else)[^>]*>([\s\S]*?)<\/div>/g,
        (match, condition, content) => {
          // data-handlebars-if attribute'unu içeren div tag'ini kaldır
          const cleanContent = content.replace(/<div[^>]*data-handlebars-[^>]*>[\s\S]*?<\/div>/g, '').trim();
          return `{{#if ${condition}}}${cleanContent}{{/if}}`;
        }
      );

      // data-handlebars-unless attribute'unu bul ve içeriği {{#unless condition}}...{{/unless}} ile sarmala
      handlebarsHtml = handlebarsHtml.replace(
        /<div[^>]*data-handlebars-unless="([^"]+)"[^>]*>([\s\S]*?)<\/div>/g,
        (match, condition, content) => {
          // data-handlebars-unless attribute'unu içeren div tag'ini kaldır
          const cleanContent = content.replace(/<div[^>]*data-handlebars-[^>]*>[\s\S]*?<\/div>/g, '').trim();
          return `{{#unless ${condition}}}${cleanContent}{{/unless}}`;
        }
      );
      
      // Preview props'larındaki değerleri Handlebars syntax'ına çevir
      // Önce uzun string'leri değiştir (daha spesifik olanlar önce)
      const sortedKeys = Object.keys(previewProps).sort((a, b) => {
        const aVal = String(previewProps[a] ?? '');
        const bVal = String(previewProps[b] ?? '');
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

      // Conditional rendering'i tespit etmek için her optional prop için render yap
      // ve HTML'deki farklılıkları bul
      const conditionalSections: Map<string, { withProp: string; withoutProp: string }> = new Map();
      
      for (const key of Object.keys(previewProps)) {
        const value = previewProps[key];
        if (value != null && value !== '' && (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean')) {
          const stringValue = String(value);
          
          // Bu prop'u undefined yaparak render et
          const propsWithoutThis = { ...previewProps };
          propsWithoutThis[key] = undefined;
          const elementWithoutThis = React.createElement(EmailComponent, propsWithoutThis);
          const htmlWithoutThis = await render(elementWithoutThis);
          
          // HTML'deki farklılıkları bul
          // html'de var ama htmlWithoutThis'de yok olan bölümleri bul
          if (html !== htmlWithoutThis && html.includes(stringValue) && !htmlWithoutThis.includes(stringValue)) {
            conditionalSections.set(key, { withProp: html, withoutProp: htmlWithoutThis });
          }
        }
      }
      
      // Conditional props'lar için HTML'deki bölümleri {{#if}} ile sarmala
      // Her conditional prop için, HTML'deki farklılıkları bul ve {{#if}} ile sarmala
      for (const [key, sections] of conditionalSections.entries()) {
        const value = previewProps[key];
        const stringValue = String(value);
        
        // HTML'de bu değerin geçtiği bölümleri bul
        // Basit bir yaklaşım: Bu değerin geçtiği HTML bölümlerini {{#if}} ile sarmala
        // HTML'deki farklılıkları bul ve {{#if}} ile sarmala
        // Bu işlem için HTML'i parse etmek gerekiyor, ama bu çok karmaşık
        // Daha basit bir yaklaşım: HTML'deki farklılıkları bul ve {{#if}} ile sarmala
        
        // HTML'deki farklılıkları bul
        const withPropHtml = sections.withProp;
        const withoutPropHtml = sections.withoutProp;
        
        // HTML'deki farklılıkları bul ve {{#if}} ile sarmala
        // Bu işlem için HTML'i parse etmek gerekiyor, ama bu çok karmaşık
        // Daha basit bir yaklaşım: HTML'deki farklılıkları bul ve {{#if}} ile sarmala
        // Ancak bu çok karmaşık, daha basit bir yaklaşım kullanalım:
        // Preview props'larındaki değerleri Handlebars placeholder'larına çevirdikten sonra,
        // conditional rendering'i manuel olarak ekleyeceğiz
      }


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
