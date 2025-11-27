import {
  Body,
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

interface BannedEmailProps {
  username?: string;
  websiteName?: string;
  websiteLogo?: string;
  reason?: string;
  bannedUntil?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export const BannedEmail = ({
  username,
  websiteName,
  websiteLogo,
  reason,
  bannedUntil,
}: BannedEmailProps) => (
  <Html>
    <Head />
    <Preview>{'{{TRANSLATION:preview:Account suspension notice}}'}</Preview>
    <Tailwind>
      <Body className="mx-auto my-auto px-2 font-sans">
        <Container className="mx-auto my-[40px] max-w-[600px] p-[40px]">
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
          <Heading className="mx-0 my-[32px] p-0 text-left text-[24px] font-semibold text-red-600">
            {'{{TRANSLATION:account-suspended:Account Suspended}}'}
          </Heading>
          <Text className="text-[16px] leading-[24px] text-gray-700">
            {'{{TRANSLATION:hello:Hello}}'} <strong>{'{{username}}'}</strong>,
          </Text>
          <Text className="text-[16px] leading-[24px] text-gray-700">
            {'{{TRANSLATION:banned-notice:We are writing to inform you that your account has been suspended.}}'}
          </Text>
          <If condition="reason">
            <Section className="my-[24px] rounded-lg border-l-4 border-red-500 bg-red-50 p-[20px]">
              <Text className="mb-[8px] text-[14px] font-semibold uppercase text-red-800">
                {'{{TRANSLATION:reason:Reason}}'}
              </Text>
              <Text className="m-0 text-[16px] leading-[24px] text-red-900">
                {'{{reason}}'}
              </Text>
            </Section>
          </If>
          <If condition="bannedUntil" else={
            <Section className="my-[24px] rounded-lg bg-gray-50 p-[20px]">
              <Text className="m-0 text-[16px] font-semibold text-gray-900">
                {'{{TRANSLATION:permanent-suspension:This suspension is permanent.}}'}
              </Text>
            </Section>
          }>
            <Section className="my-[24px] rounded-lg bg-gray-50 p-[20px]">
              <Text className="m-0 text-[14px] font-semibold text-gray-700">
                {'{{TRANSLATION:suspension-until:Suspension until:}}'}
              </Text>
              <Text className="m-0 mt-[4px] text-[16px] font-bold text-gray-900">
                {'{{bannedUntil}}'}
              </Text>
            </Section>
          </If>
          <Text className="mt-[32px] text-[14px] leading-[20px] text-gray-500">
            {'{{TRANSLATION:banned-support:If you have any questions or concerns, please contact our support team.}}'}
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

BannedEmail.PreviewProps = {
  username: 'Steve',
  websiteName: 'MyMinecraft Server',
  websiteLogo: `${baseUrl}/static/server-logo.png`,
  reason: 'Violation of terms of service',
  bannedUntil: '2024-12-31',
} as BannedEmailProps;

export default BannedEmail;
