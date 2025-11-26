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

interface BannedEmailProps {
  username?: string;
  serverName?: string;
  serverLogo?: string;
  reason?: string;
  bannedUntil?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export const BannedEmail = ({
  username,
  serverName,
  serverLogo,
  reason,
  bannedUntil,
}: BannedEmailProps) => (
  <Html>
    <Head />
    <Preview>Account suspension notice from {serverName || 'our Minecraft server'}</Preview>
    <Tailwind>
      <Body className="mx-auto my-auto px-2 font-sans">
        <Container className="mx-auto my-[40px] max-w-[600px] p-[40px]">
          {serverLogo && (
            <Section className="mb-[32px] text-center">
              <Img
                src={serverLogo}
                width="80"
                height="80"
                alt={serverName || 'Server Logo'}
                className="mx-auto my-0 rounded-lg"
              />
            </Section>
          )}
          {serverName && (
            <Heading className="mx-0 my-0 mb-[8px] p-0 text-left text-[28px] font-bold text-gray-900">
              {serverName}
            </Heading>
          )}
          <Heading className="mx-0 my-[32px] p-0 text-left text-[24px] font-semibold text-red-600">
            {'{{TRANSLATION:account-suspended:Account Suspended}}'}
          </Heading>
          <Text className="text-[16px] leading-[24px] text-gray-700">
            {'{{TRANSLATION:hello:Hello}}'} <strong>{username || 'there'}</strong>,
          </Text>
          <Text className="text-[16px] leading-[24px] text-gray-700">
            {'{{TRANSLATION:banned-notice:We are writing to inform you that your account has been suspended.}}'}
          </Text>
          {reason && (
            <Section className="my-[24px] rounded-lg border-l-4 border-red-500 bg-red-50 p-[20px]">
              <Text className="mb-[8px] text-[14px] font-semibold uppercase text-red-800">
                {'{{TRANSLATION:reason:Reason}}'}
              </Text>
              <Text className="m-0 text-[16px] leading-[24px] text-red-900">
                {reason}
              </Text>
            </Section>
          )}
          {bannedUntil && (
            <Section className="my-[24px] rounded-lg bg-gray-50 p-[20px]">
              <Text className="m-0 text-[14px] font-semibold text-gray-700">
                {'{{TRANSLATION:suspension-until:Suspension until:}}'}
              </Text>
              <Text className="m-0 mt-[4px] text-[16px] font-bold text-gray-900">
                {bannedUntil}
              </Text>
            </Section>
          )}
          {!bannedUntil && (
            <Section className="my-[24px] rounded-lg bg-gray-50 p-[20px]">
              <Text className="m-0 text-[16px] font-semibold text-gray-900">
                {'{{TRANSLATION:permanent-suspension:This suspension is permanent.}}'}
              </Text>
            </Section>
          )}
          <Text className="mt-[32px] text-[14px] leading-[20px] text-gray-500">
            {'{{TRANSLATION:banned-support:If you have any questions or concerns, please contact our support team.}}'}
          </Text>
          <Section className="mt-[40px] border-t border-gray-200 pt-[24px]">
            <Text className="text-left text-[12px] leading-[18px] text-gray-500">
              {serverName && (
                <>
                  {'{{TRANSLATION:email-sent-by:This email was sent by}}'} <strong className="text-gray-700">{serverName}</strong>.
                  <br />
                </>
              )}
              {'{{TRANSLATION:support-inquiries:For support inquiries, please contact our team.}}'}
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

BannedEmail.PreviewProps = {
  username: 'Steve',
  serverName: 'MyMinecraft Server',
  serverLogo: `${baseUrl}/static/server-logo.png`,
  reason: 'Violation of terms of service',
  bannedUntil: '2024-12-31',
} as BannedEmailProps;

export default BannedEmail;
