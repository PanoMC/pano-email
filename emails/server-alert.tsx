import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import { If } from './components/If';

interface ServerAlertEmailProps {
  /**
   * SERVER_CRASHED | NODE_OFFLINE | BACKUP_FAILED | DISK_LOW | TPS_LOW | SCHEDULE_FAILED
   */
  kind?: string;
  title?: string;
  /** Alert text. The platform sends it as `body`; `message` is accepted as an alias. */
  body?: string;
  message?: string;
  serverName?: string;
  nodeName?: string;
  /** Panel link. The platform sends it as `link`; `detailsUrl` is accepted as an alias. */
  link?: string;
  detailsUrl?: string;
  occurredAt?: string;
  websiteName?: string;
  websiteLogo?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

/**
 * Severity is picked from `kind` at render time, and Handlebars has no equality
 * helper on the platform side, so the critical (red) palette is inlined as the
 * default and the two warning kinds are repainted amber through the `pano-kind-{{kind}}`
 * class on the container.
 */
const severityStyles = `
.pano-kind-DISK_LOW .pano-strip,
.pano-kind-TPS_LOW .pano-strip {
  background-color: #d97706 !important;
}
.pano-kind-DISK_LOW .pano-badge,
.pano-kind-TPS_LOW .pano-badge {
  background-color: #fffbeb !important;
  color: #b45309 !important;
}
.pano-kind-DISK_LOW .pano-title,
.pano-kind-TPS_LOW .pano-title {
  color: #b45309 !important;
}
.pano-kind-DISK_LOW .pano-message,
.pano-kind-TPS_LOW .pano-message {
  background-color: #fffbeb !important;
  border-left-color: #d97706 !important;
}
.pano-kind-DISK_LOW .pano-message-text,
.pano-kind-TPS_LOW .pano-message-text {
  color: #78350f !important;
}
`;

export const ServerAlertEmail = ({
  kind,
  title,
  body,
  message,
  serverName,
  nodeName,
  link,
  detailsUrl,
  occurredAt,
  websiteName,
  websiteLogo,
}: ServerAlertEmailProps) => (
  <Html>
    <Head>
      <style dangerouslySetInnerHTML={{ __html: severityStyles }} />
    </Head>
    <Preview>{'{{TRANSLATION:preview:Server alert}}'}</Preview>
    <Tailwind>
      <Body className="mx-auto my-auto px-2 font-sans">
        <Container className="pano-kind-{{kind}} mx-auto my-[40px] max-w-[600px] p-[40px]">
          <Section className="pano-strip mb-[32px] rounded-[4px] bg-[#b91c1c]">
            <Text className="m-0 p-0 text-[0px] leading-[6px]">&nbsp;</Text>
          </Section>
          <If condition="websiteLogo">
            <Section className="mb-[32px] text-center">
              <Img
                src={'{{websiteLogo}}'}
                width="80"
                height="80"
                alt={'{{websiteName}}'}
                className="mx-auto my-0 rounded-lg"
              />
            </Section>
          </If>
          <If condition="websiteName">
            <Section className="mb-[8px] text-center">
              <Heading className="mx-0 my-0 p-0 text-center text-[28px] font-bold text-gray-900">
                {'{{websiteName}}'}
              </Heading>
            </Section>
          </If>
          <Section className="mt-[32px] mb-[8px]">
            <Text className="pano-badge m-0 inline-block rounded-[4px] bg-[#fef2f2] px-[10px] py-[4px] text-[12px] font-bold uppercase tracking-wide text-[#b91c1c]">
              {'{{TRANSLATION:alert-label:Server alert}}'} · {'{{kind}}'}
            </Text>
          </Section>
          <Heading className="pano-title mx-0 mt-[8px] mb-[24px] p-0 text-left text-[24px] font-semibold text-[#b91c1c]">
            {'{{title}}'}
          </Heading>
          <Section className="pano-message my-[24px] rounded-lg border-l-4 border-[#b91c1c] bg-[#fef2f2] p-[20px]">
            <Text className="pano-message-text m-0 text-[16px] leading-[24px] text-[#7f1d1d]">
              {'{{#if body}}{{body}}{{else}}{{message}}{{/if}}'}
            </Text>
          </Section>
          <Section className="my-[24px] rounded-lg bg-gray-50 p-[20px]">
            <Text className="m-0 mb-[12px] text-[14px] font-semibold text-gray-700">
              {'{{TRANSLATION:alert-details:Alert Details:}}'}
            </Text>
            <If condition="serverName">
              <Text className="m-0 mb-[8px] text-[14px] leading-[20px] text-gray-700">
                <strong>{'{{TRANSLATION:server:Server:}}'}</strong> {'{{serverName}}'}
              </Text>
            </If>
            <If condition="nodeName">
              <Text className="m-0 mb-[8px] text-[14px] leading-[20px] text-gray-700">
                <strong>{'{{TRANSLATION:node:Node:}}'}</strong> {'{{nodeName}}'}
              </Text>
            </If>
            <If condition="occurredAt">
              <Text className="m-0 mb-[8px] text-[14px] leading-[20px] text-gray-700">
                <strong>{'{{TRANSLATION:occurred-at:Occurred at:}}'}</strong> {'{{occurredAt}}'}
              </Text>
            </If>
            <Text className="m-0 text-[14px] leading-[20px] text-gray-700">
              <strong>{'{{TRANSLATION:alert-kind:Type:}}'}</strong> {'{{kind}}'}
            </Text>
          </Section>
          <Section className="my-[32px] text-center">
            <Button
              className="rounded-lg bg-[#55C55A] px-8 py-4 text-center text-[16px] font-semibold text-white no-underline shadow-md"
              href={'{{#if link}}{{link}}{{else}}{{detailsUrl}}{{/if}}'}
            >
              {'{{TRANSLATION:open-in-panel:Open in panel}}'}
            </Button>
          </Section>
          <Text className="mt-[32px] text-[14px] leading-[20px] text-gray-500">
            {'{{TRANSLATION:server-alert-notice:You are receiving this e-mail because alert notifications are enabled for your account. You can turn them off from the panel notification settings.}}'}
          </Text>
          <Section className="mt-[40px] border-t border-gray-200 pt-[24px]">
            <Text className="text-left text-[12px] leading-[18px] text-gray-500">
              {'{{TRANSLATION:support-contact:If you have any questions, please contact our support team.}}'}
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

ServerAlertEmail.PreviewProps = {
  kind: 'SERVER_CRASHED',
  title: 'Survival server stopped unexpectedly',
  body: 'The Survival server exited with code 137 and could not be restarted automatically.',
  serverName: 'Survival',
  nodeName: 'node-eu-1',
  link: 'https://example.com/panel/servers/1',
  occurredAt: '2024-01-15 14:30:00 UTC',
  websiteName: 'MyMinecraft Server',
  websiteLogo: `${baseUrl}/static/server-logo.png`,
} as ServerAlertEmailProps;

export default ServerAlertEmail;
