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

interface ResetPasswordEmailProps {
  username?: string;
  serverName?: string;
  serverLogo?: string;
  resetLink?: string;
  resetCode?: string;
  expiresIn?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export const ResetPasswordEmail = ({
  username,
  serverName,
  serverLogo,
  resetLink,
  resetCode,
  expiresIn,
}: ResetPasswordEmailProps) => (
  <Html>
    <Head />
    <Preview>Reset your password on {serverName || 'our Minecraft server'}</Preview>
    <Tailwind>
      <Body className="mx-auto my-auto bg-gray-50 px-2 font-sans">
        <Container className="mx-auto my-[40px] max-w-[600px] rounded-lg border border-gray-200 border-solid bg-white p-[40px] shadow-sm">
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
            <Heading className="mx-0 my-0 mb-[8px] p-0 text-center text-[28px] font-bold text-gray-900">
              {serverName}
            </Heading>
          )}
          <Heading className="mx-0 my-[32px] p-0 text-center text-[24px] font-semibold text-gray-800">
            Reset Your Password
          </Heading>
          <Text className="text-[16px] leading-[24px] text-gray-700">
            Hello <strong>{username || 'there'}</strong>,
          </Text>
          <Text className="text-[16px] leading-[24px] text-gray-700">
            We received a request to reset your password. Click the button below
            to create a new password:
          </Text>
          <Section className="my-[32px] text-center">
            <Button
              className="rounded-lg bg-[#55C55A] px-8 py-4 text-center text-[16px] font-semibold text-white no-underline shadow-md"
              href={resetLink}
            >
              Reset Password
            </Button>
          </Section>
          {resetCode && (
            <>
              <Text className="mb-[12px] text-center text-[14px] text-gray-600">
                Or, copy and paste this reset code:
              </Text>
              <Section className="my-[24px] rounded-lg bg-gray-50 p-[20px] text-center">
                <code className="text-[18px] font-mono font-bold text-gray-900">
                  {resetCode}
                </code>
              </Section>
            </>
          )}
          <Section className="my-[24px] rounded-lg bg-yellow-50 p-[20px]">
            <Text className="m-0 mb-[8px] text-[14px] font-semibold text-yellow-900">
              ⏰ Expiration Notice
            </Text>
            <Text className="m-0 text-[14px] leading-[20px] text-yellow-800">
              This password reset link will expire in {expiresIn || '1 hour'}.
            </Text>
          </Section>
          <Text className="mt-[32px] text-[14px] leading-[20px] text-gray-500">
            If you didn&apos;t request a password reset, you can safely ignore this
            email. Your password will remain unchanged.
          </Text>
          <Text className="mt-[16px] text-[14px] leading-[20px] text-gray-500">
            For security reasons, if you didn&apos;t request this password reset,
            we recommend that you review your account security settings.
          </Text>
          <Section className="mt-[40px] border-t border-gray-200 pt-[24px]">
            <Text className="text-center text-[12px] leading-[18px] text-gray-500">
              {serverName && (
                <>
                  This email was sent by <strong className="text-gray-700">{serverName}</strong>.
                  <br />
                </>
              )}
              If you have any questions, please contact our support team.
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

ResetPasswordEmail.PreviewProps = {
  username: 'Steve',
  serverName: 'MyMinecraft Server',
  serverLogo: `${baseUrl}/static/server-logo.png`,
  resetLink: 'https://example.com/reset-password?token=abc123',
  resetCode: 'ABC123XYZ',
  expiresIn: '1 hour',
} as ResetPasswordEmailProps;

export default ResetPasswordEmail;
