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
  serverName?: string;
  serverLogo?: string;
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
  serverName,
  serverLogo,
  loginTime,
  loginLocation,
  loginIp,
  deviceInfo,
  suspiciousActivity,
}: LoginEmailProps) => (
  <Html>
    <Head />
    <Preview>New login detected on {serverName || 'our Minecraft server'}</Preview>
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
          <Heading className={`mx-0 my-[32px] p-0 text-center text-[24px] font-semibold ${suspiciousActivity ? 'text-red-600' : 'text-gray-800'}`}>
            {suspiciousActivity ? '⚠️ Suspicious Login Detected' : 'New Login Detected'}
          </Heading>
          <Text className="text-[16px] leading-[24px] text-gray-700">
            Hello <strong>{username || 'there'}</strong>,
          </Text>
          <Text className="text-[16px] leading-[24px] text-gray-700">
            {suspiciousActivity
              ? 'We detected a login to your account that appears suspicious.'
              : 'We detected a new login to your account.'}
          </Text>
          <Section className={`my-[24px] rounded-lg border-l-4 p-[20px] ${suspiciousActivity ? 'border-red-500 bg-red-50' : 'border-blue-500 bg-blue-50'}`}>
            <Text className="m-0 mb-[12px] text-[14px] font-semibold text-gray-700">
              Login Details:
            </Text>
            {loginTime && (
              <Text className="m-0 mb-[8px] text-[14px] leading-[20px] text-gray-700">
                <strong>Time:</strong> {loginTime}
              </Text>
            )}
            {loginLocation && (
              <Text className="m-0 mb-[8px] text-[14px] leading-[20px] text-gray-700">
                <strong>Location:</strong> {loginLocation}
              </Text>
            )}
            {loginIp && (
              <Text className="m-0 mb-[8px] text-[14px] leading-[20px] text-gray-700">
                <strong>IP Address:</strong> {loginIp}
              </Text>
            )}
            {deviceInfo && (
              <Text className="m-0 text-[14px] leading-[20px] text-gray-700">
                <strong>Device:</strong> {deviceInfo}
              </Text>
            )}
          </Section>
          {suspiciousActivity && (
            <Section className="my-[24px] rounded-lg bg-red-50 p-[20px]">
              <Text className="m-0 text-[16px] font-semibold text-red-900">
                ⚠️ Security Alert
              </Text>
              <Text className="m-0 mt-[8px] text-[14px] leading-[20px] text-red-800">
                If this wasn&apos;t you, please secure your account immediately by
                changing your password and enabling two-factor authentication.
              </Text>
            </Section>
          )}
          <Text className="mt-[32px] text-[14px] leading-[20px] text-gray-500">
            If this was you, you can safely ignore this email. If you don&apos;t
            recognize this activity, please contact our support team immediately.
          </Text>
          <Section className="mt-[40px] border-t border-gray-200 pt-[24px]">
            <Text className="text-center text-[12px] leading-[18px] text-gray-500">
              {serverName && (
                <>
                  This email was sent by <strong className="text-gray-700">{serverName}</strong>.
                  <br />
                </>
              )}
              For security concerns, please contact our support team immediately.
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

LoginEmail.PreviewProps = {
  username: 'Steve',
  serverName: 'MyMinecraft Server',
  serverLogo: `${baseUrl}/static/server-logo.png`,
  loginTime: '2024-01-15 14:30:00 UTC',
  loginLocation: 'Istanbul, Turkey',
  loginIp: '192.168.1.1',
  deviceInfo: 'Chrome on Windows',
  suspiciousActivity: false,
} as LoginEmailProps;

export default LoginEmail;
