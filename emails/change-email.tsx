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

interface ChangeEmailEmailProps {
  username?: string;
  serverName?: string;
  websiteLogo?: string;
  newEmail?: string;
  confirmationLink?: string;
  confirmationCode?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export const ChangeEmailEmail = ({
  username,
  serverName,
  websiteLogo,
  newEmail,
  confirmationLink,
  confirmationCode,
}: ChangeEmailEmailProps) => (
  <Html>
    <Head />
    <Preview>{'{{TRANSLATION:change-email-preview:Confirm your new email address on}}'} {serverName || '{{TRANSLATION:our-server:our Minecraft server}}'}</Preview>
    <Tailwind>
      <Body className="mx-auto my-auto px-2 font-sans">
        <Container className="mx-auto my-[40px] max-w-[600px] p-[40px]">
          {websiteLogo && (
            <Section className="mb-[32px] text-center">
              <Img
                src={'{{websiteLogo}}'}
                width="80"
                height="80"
                alt={'{{serverName}}'}
                className="mx-auto my-0 rounded-lg"
              />
            </Section>
          )}
          {serverName && (
            <Heading className="mx-0 my-0 mb-[8px] p-0 text-left text-[28px] font-bold text-gray-900">
              {'{{serverName}}'}
            </Heading>
          )}
          <Heading className="mx-0 my-[32px] p-0 text-left text-[24px] font-semibold text-gray-800">
            {'{{TRANSLATION:confirm-new-email:Confirm New Email Address}}'}
          </Heading>
          <Text className="text-[16px] leading-[24px] text-gray-700">
            {'{{TRANSLATION:hello:Hello}}'} <strong>{'{{username}}'}</strong>,
          </Text>
          <Text className="text-[16px] leading-[24px] text-gray-700">
            {'{{TRANSLATION:change-email-request:You have requested to change your email address to:}}'}
          </Text>
          <Section className="my-[24px] rounded-lg bg-blue-50 p-[20px] text-center">
            <Text className="m-0 text-[18px] font-semibold text-blue-900">
              {'{{newEmail}}'}
            </Text>
          </Section>
          <Text className="text-[16px] leading-[24px] text-gray-700">
            {'{{TRANSLATION:confirm-change-instruction:Please confirm this change by clicking the button below:}}'}
          </Text>
          <Section className="my-[32px] text-center">
            <Button
              className="rounded-lg bg-[#55C55A] px-8 py-4 text-center text-[16px] font-semibold text-white no-underline shadow-md"
              href={'{{confirmationLink}}'}
            >
              {'{{TRANSLATION:confirm-email-change-button:Confirm Email Change}}'}
            </Button>
          </Section>
          {confirmationCode && (
            <>
              <Text className="mb-[12px] text-center text-[14px] text-gray-600">
                {'{{TRANSLATION:confirmation-code-instruction:Or, copy and paste this confirmation code:}}'}
              </Text>
              <Section className="my-[24px] rounded-lg bg-gray-50 p-[20px] text-center">
                <code className="text-[18px] font-mono font-bold text-gray-900">
                  {'{{confirmationCode}}'}
                </code>
              </Section>
            </>
          )}
          <Text className="mt-[32px] text-[14px] leading-[20px] text-gray-500">
            {'{{TRANSLATION:change-email-expires:This confirmation link will expire in 1 hour. If you didn\'t request this change, please ignore this email and consider securing your account.}}'}
          </Text>
          <Section className="mt-[40px] border-t border-gray-200 pt-[24px]">
            <Text className="text-left text-[12px] leading-[18px] text-gray-500">
              {serverName && (
                <>
                  {'{{TRANSLATION:email-sent-by:This email was sent by}}'} <strong className="text-gray-700">{'{{serverName}}'}</strong>.
                  <br />
                </>
              )}
              {'{{TRANSLATION:support-contact:If you have any questions, please contact our support team.}}'}
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

ChangeEmailEmail.PreviewProps = {
  username: 'Steve',
  serverName: 'MyMinecraft Server',
  websiteLogo: `${baseUrl}/static/server-logo.png`,
  newEmail: 'newemail@example.com',
  confirmationLink: 'https://example.com/confirm-email?token=abc123',
  confirmationCode: 'ABC123XYZ',
} as ChangeEmailEmailProps;

export default ChangeEmailEmail;
