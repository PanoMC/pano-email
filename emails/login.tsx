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

interface LoginEmailProps {
  username?: string;
  websiteName?: string;
  websiteLogo?: string;
  loginTime?: string;
  loginLocation?: string;
  loginIp?: string;
  deviceInfo?: string;
  suspiciousActivity?: boolean;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export const LoginEmail = ({
  username,
  websiteName,
  websiteLogo,
  loginTime,
  loginLocation,
  loginIp,
  deviceInfo,
  suspiciousActivity,
}: LoginEmailProps) => (
  <Html>
    <Head />
    <Preview>{'{{TRANSLATION:preview:New login detected on}}'}</Preview>
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
          <Heading className={`mx-0 my-[32px] p-0 text-left text-[24px] font-semibold ${suspiciousActivity ? 'text-red-600' : 'text-gray-800'}`}>
            {suspiciousActivity ? '{{TRANSLATION:suspicious-login:⚠️ Suspicious Login Detected}}' : '{{TRANSLATION:new-login:New Login Detected}}'}
          </Heading>
          <Text className="text-[16px] leading-[24px] text-gray-700">
            {'{{TRANSLATION:hello:Hello}}'} <strong>{'{{username}}'}</strong>,
          </Text>
          <Text className="text-[16px] leading-[24px] text-gray-700">
            {suspiciousActivity
              ? '{{TRANSLATION:suspicious-login-notice:We detected a login to your account that appears suspicious.}}'
              : '{{TRANSLATION:new-login-notice:We detected a new login to your account.}}'}
          </Text>
          <Section className={`my-[24px] rounded-lg border-l-4 p-[20px] ${suspiciousActivity ? 'border-red-500 bg-red-50' : 'border-blue-500 bg-blue-50'}`}>
            <Text className="m-0 mb-[12px] text-[14px] font-semibold text-gray-700">
              {'{{TRANSLATION:login-details:Login Details:}}'}
            </Text>
            {loginTime && (
              <Text className="m-0 mb-[8px] text-[14px] leading-[20px] text-gray-700">
                <strong>{'{{TRANSLATION:time:Time:}}'}</strong> {'{{loginTime}}'}
              </Text>
            )}
            {loginLocation && (
              <Text className="m-0 mb-[8px] text-[14px] leading-[20px] text-gray-700">
                <strong>{'{{TRANSLATION:location:Location:}}'}</strong> {'{{loginLocation}}'}
              </Text>
            )}
            {loginIp && (
              <Text className="m-0 mb-[8px] text-[14px] leading-[20px] text-gray-700">
                <strong>{'{{TRANSLATION:ip-address:IP Address:}}'}</strong> {'{{loginIp}}'}
              </Text>
            )}
            {deviceInfo && (
              <Text className="m-0 text-[14px] leading-[20px] text-gray-700">
                <strong>{'{{TRANSLATION:device:Device:}}'}</strong> {'{{deviceInfo}}'}
              </Text>
            )}
          </Section>
          {suspiciousActivity && (
            <Section className="my-[24px] rounded-lg bg-red-50 p-[20px]">
              <Text className="m-0 text-[16px] font-semibold text-red-900">
                {'{{TRANSLATION:security-alert:⚠️ Security Alert}}'}
              </Text>
              <Text className="m-0 mt-[8px] text-[14px] leading-[20px] text-red-800">
                {'{{TRANSLATION:security-alert-instruction:If this wasn\'t you, please secure your account immediately by changing your password and enabling two-factor authentication.}}'}
              </Text>
            </Section>
          )}
          <Text className="mt-[32px] text-[14px] leading-[20px] text-gray-500">
            {'{{TRANSLATION:login-ignore:If this was you, you can safely ignore this email. If you don\'t recognize this activity, please contact our support team immediately.}}'}
          </Text>
          <Section className="mt-[40px] border-t border-gray-200 pt-[24px]">
            <Text className="text-left text-[12px] leading-[18px] text-gray-500">
              {'{{TRANSLATION:security-support:For security concerns, please contact our support team immediately.}}'}
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

LoginEmail.PreviewProps = {
  username: 'Steve',
  websiteName: 'MyMinecraft Server',
  websiteLogo: `${baseUrl}/static/server-logo.png`,
  loginTime: '2024-01-15 14:30:00 UTC',
  loginLocation: 'Istanbul, Turkey',
  loginIp: '192.168.1.1',
  deviceInfo: 'Chrome on Windows',
  suspiciousActivity: false,
} as LoginEmailProps;

export default LoginEmail;
