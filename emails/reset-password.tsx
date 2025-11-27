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
  websiteName?: string;
  websiteLogo?: string;
  resetLink?: string;
  resetCode?: string;
  expiresIn?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export const ResetPasswordEmail = ({
  username,
  websiteName,
  websiteLogo,
  resetLink,
  resetCode,
  expiresIn,
}: ResetPasswordEmailProps) => (
  <Html>
    <Head />
    <Preview>{'{{TRANSLATION:preview:Reset your password on}}'}</Preview>
    <Tailwind>
      <Body className="mx-auto my-auto px-2 font-sans">
        <Container className="mx-auto my-[40px] max-w-[600px] p-[40px]">
          {websiteLogo && (
            <Section className="mb-[32px] text-center">
              <Img
                src={'{{websiteLogo}}'}
                width="80"
                height="80"
                alt={'{{websiteName}}'}
                className="mx-auto my-0 rounded-lg"
              />
            </Section>
          )}
          {websiteName && (
            <Section className="mb-[8px] text-center">
              <Heading className="mx-0 my-0 p-0 text-center text-[28px] font-bold text-gray-900">
                {'{{websiteName}}'}
              </Heading>
            </Section>
          )}
          <Heading className="mx-0 my-[32px] p-0 text-left text-[24px] font-semibold text-gray-800">
            {'{{TRANSLATION:reset-password:Reset Your Password}}'}
          </Heading>
          <Text className="text-[16px] leading-[24px] text-gray-700">
            {'{{TRANSLATION:hello:Hello}}'} <strong>{'{{username}}'}</strong>,
          </Text>
          <Text className="text-[16px] leading-[24px] text-gray-700">
            {'{{TRANSLATION:reset-password-request:We received a request to reset your password. Click the button below to create a new password:}}'}
          </Text>
          <Section className="my-[32px] text-center">
            <Button
              className="rounded-lg bg-[#55C55A] px-8 py-4 text-center text-[16px] font-semibold text-white no-underline shadow-md"
              href={'{{resetLink}}'}
            >
              {'{{TRANSLATION:reset-password-button:Reset Password}}'}
            </Button>
          </Section>
          {resetCode && (
            <>
              <Text className="mb-[12px] text-center text-[14px] text-gray-600">
                {'{{TRANSLATION:reset-password-code-instruction:Or, copy and paste this reset code:}}'}
              </Text>
              <Section className="my-[24px] rounded-lg bg-gray-50 p-[20px] text-center">
                <code className="text-[18px] font-mono font-bold text-gray-900">
                  {'{{resetCode}}'}
                </code>
              </Section>
            </>
          )}
          <Section className="my-[24px] rounded-lg bg-yellow-50 p-[20px]">
            <Text className="m-0 mb-[8px] text-[14px] font-semibold text-yellow-900">
              {'{{TRANSLATION:expiration-notice:⏰ Expiration Notice}}'}
            </Text>
            <Text className="m-0 text-[14px] leading-[20px] text-yellow-800">
              {'{{TRANSLATION:reset-password-expires:This password reset link will expire in}}'}
            </Text>
          </Section>
          <Text className="mt-[32px] text-[14px] leading-[20px] text-gray-500">
            {'{{TRANSLATION:reset-password-ignore:If you didn\'t request a password reset, you can safely ignore this email. Your password will remain unchanged.}}'}
          </Text>
          <Text className="mt-[16px] text-[14px] leading-[20px] text-gray-500">
            {'{{TRANSLATION:reset-password-security:For security reasons, if you didn\'t request this password reset, we recommend that you review your account security settings.}}'}
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

ResetPasswordEmail.PreviewProps = {
  username: 'Steve',
  websiteName: 'MyMinecraft Server',
  websiteLogo: `${baseUrl}/static/server-logo.png`,
  resetLink: 'https://example.com/reset-password?token=abc123',
  resetCode: 'ABC123XYZ',
  expiresIn: '1 hour',
} as ResetPasswordEmailProps;

export default ResetPasswordEmail;
