import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import { Raw } from './components/Raw';

/**
 * The one shared layout every Pano mail is rendered into (platform and plugins).
 *
 * It holds no language text: everything a reader sees comes from the per-mail, per-language
 * template the platform renders first and hands over through these slots:
 *
 *   {{subject}}      document title
 *   {{preheader}}    hidden inbox preview text (omitted when empty)
 *   {{{content}}}    the rendered body (HTML)
 *   {{buttonLabel}}  / {{buttonUrl}}  the primary button (omitted when buttonUrl is empty)
 *   {{{footer}}}     the mail's own footer note (HTML, omitted when empty)
 *   {{websiteLogo}} {{websiteName}} {{websiteUrl}} {{year}} {{locale}}
 */

// Body HTML comes from the panel's rich-text editor without inline styles, so its elements
// are styled here. Clients that drop <style> still get the inherited font/colour of the cell.
const contentStyles = `
.pano-content p { margin: 0 0 16px 0; font-size: 16px; line-height: 24px; color: #374151; }
.pano-content h1, .pano-content h2, .pano-content h3 { margin: 0 0 16px 0; color: #1f2937; font-weight: 600; }
.pano-content h1 { font-size: 26px; line-height: 32px; }
.pano-content h2 { font-size: 22px; line-height: 28px; }
.pano-content h3 { font-size: 18px; line-height: 24px; }
.pano-content a { color: #3b9a40; }
.pano-content ul, .pano-content ol { margin: 0 0 16px 0; padding-left: 24px; color: #374151; }
.pano-content li { font-size: 16px; line-height: 24px; }
.pano-content code { font-family: ui-monospace, Menlo, Consolas, monospace; background-color: #f3f4f6; border-radius: 4px; padding: 2px 6px; }
.pano-content blockquote { margin: 0 0 16px 0; padding: 12px 16px; border-left: 4px solid #e5e7eb; background-color: #f9fafb; color: #4b5563; }
.pano-footer p { margin: 0 0 8px 0; }
`;

export const Layout = () => (
  <Html lang="{{locale}}">
    <Head>
      <title>{'{{subject}}'}</title>
      <style>{contentStyles}</style>
    </Head>
    <Tailwind>
      <Body className="mx-auto my-auto bg-gray-100 px-2 font-sans">
        <Raw hbs="{{#if preheader}}" />
        <Preview>{'{{preheader}}'}</Preview>
        <Raw hbs="{{/if}}" />
        <Container className="mx-auto my-[40px] max-w-[600px]">
          <Section className="mb-[24px] text-center">
            <Link href="{{websiteUrl}}">
              <Img
                src="{{websiteLogo}}"
                width="80"
                height="80"
                alt="{{websiteName}}"
                className="mx-auto my-0 rounded-lg"
              />
            </Link>
            <Text className="mx-0 mb-0 mt-[12px] p-0 text-center text-[24px] font-bold leading-[32px] text-gray-900">
              {'{{websiteName}}'}
            </Text>
          </Section>
          <Section className="rounded-lg bg-white px-[40px] py-[32px]">
            <div className="pano-content text-[16px] leading-[24px] text-gray-700">
              <Raw hbs="{{{content}}}" />
            </div>
            <Raw hbs="{{#if buttonUrl}}" />
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-lg bg-[#55C55A] px-8 py-4 text-center text-[16px] font-semibold text-white no-underline"
                href="{{buttonUrl}}"
              >
                {'{{buttonLabel}}'}
              </Button>
            </Section>
            <Raw hbs="{{/if}}" />
            <Raw hbs="{{#if footer}}" />
            <Section
              className="pano-footer mt-[32px] pt-[24px] text-[13px] leading-[20px] text-gray-500"
              style={{ borderTop: '1px solid #e5e7eb' }}
            >
              <Raw hbs="{{{footer}}}" />
            </Section>
            <Raw hbs="{{/if}}" />
          </Section>
          <Section className="mt-[24px] text-center">
            <Text className="m-0 text-center text-[12px] leading-[18px] text-gray-400">
              © {'{{year}}'}{' '}
              <Link href="{{websiteUrl}}" className="text-gray-400 underline">
                {'{{websiteName}}'}
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default Layout;
