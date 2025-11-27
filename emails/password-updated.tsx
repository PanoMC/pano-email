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

interface PasswordUpdatedEmailProps {
  username?: string;
  websiteName?: string;
  websiteLogo?: string;
  loginLink?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export const PasswordUpdatedEmail = ({
  username,
  websiteName,
  websiteLogo,
  loginLink,
}: PasswordUpdatedEmailProps) => (
  <Html>
    <Head />
    <Preview>{'{{TRANSLATION:preview:Your password has been updated}}'}</Preview>
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
          <Section className="my-[32px] text-center">
            <div className="mx-auto mb-[16px] flex h-[64px] w-[64px] items-center justify-center rounded-full bg-[#55C55A]">
              <span className="text-[32px]">✓</span>
            </div>
            <Heading className="mx-0 my-0 p-0 text-center text-[24px] font-semibold text-gray-800">
              {'{{TRANSLATION:password-updated:Password Updated Successfully}}'}
            </Heading>
          </Section>
          <Text className="text-[16px] leading-[24px] text-gray-700">
            {'{{TRANSLATION:hello:Hello}}'} <strong>{'{{username}}'}</strong>,
          </Text>
          <Text className="text-[16px] leading-[24px] text-gray-700">
            {'{{TRANSLATION:password-updated-confirmation:Your password has been successfully updated. Your account is now secure with your new password.}}'}
          </Text>
          <Section className="my-[24px] rounded-lg bg-green-50 p-[20px]">
            <Text className="m-0 text-center text-[14px] font-semibold text-green-900">
              {'{{TRANSLATION:security-tip:🔒 Security Tip}}'}
            </Text>
            <Text className="m-0 mt-[8px] text-center text-[14px] leading-[20px] text-green-800">
              {'{{TRANSLATION:password-security-tip:If you didn\'t make this change, please contact our support team immediately and secure your account.}}'}
            </Text>
          </Section>
          <If condition="loginLink">
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-lg bg-[#55C55A] px-8 py-4 text-center text-[16px] font-semibold text-white no-underline shadow-md"
                href={'{{loginLink}}'}
              >
                {'{{TRANSLATION:go-to-login:Go to Login}}'}
              </Button>
            </Section>
          </If>
          <Text className="mt-[32px] text-[14px] leading-[20px] text-gray-500">
            {'{{TRANSLATION:password-updated-support:If you have any questions or concerns about this password change, please contact our support team.}}'}
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

PasswordUpdatedEmail.PreviewProps = {
  username: 'Steve',
  websiteName: 'MyMinecraft Server',
  websiteLogo: `${baseUrl}/static/server-logo.png`,
  loginLink: 'https://example.com/login',
} as PasswordUpdatedEmailProps;

export default PasswordUpdatedEmail;

