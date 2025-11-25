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

interface RegisterSuccessEmailProps {
  username?: string;
  serverName?: string;
  serverLogo?: string;
  loginLink?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export const RegisterSuccessEmail = ({
  username,
  serverName,
  serverLogo,
  loginLink,
}: RegisterSuccessEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to {serverName || 'our Minecraft server'}!</Preview>
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
          <Section className="my-[32px] text-center">
            <div className="mx-auto mb-[16px] flex h-[64px] w-[64px] items-center justify-center rounded-full bg-[#55C55A]">
              <span className="text-[32px]">✓</span>
            </div>
            <Heading className="mx-0 my-0 p-0 text-center text-[24px] font-semibold text-gray-800">
              Welcome!
            </Heading>
          </Section>
          <Text className="text-[16px] leading-[24px] text-gray-700">
            Hello <strong>{username || 'there'}</strong>,
          </Text>
          <Text className="text-[16px] leading-[24px] text-gray-700">
            Your account has been successfully created. We&apos;re excited to have
            you on board!
          </Text>
          <Text className="text-[16px] leading-[24px] text-gray-700">
            You can now log in to your account and start exploring all the
            features we have to offer.
          </Text>
          {loginLink && (
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-lg bg-[#55C55A] px-8 py-4 text-center text-[16px] font-semibold text-white no-underline shadow-md"
                href={loginLink}
              >
                Go to Login
              </Button>
            </Section>
          )}
          <Section className="my-[32px] rounded-lg bg-green-50 p-[20px]">
            <Text className="m-0 text-center text-[14px] font-semibold text-green-900">
              🎮 Ready to play?
            </Text>
            <Text className="m-0 mt-[8px] text-center text-[14px] leading-[20px] text-green-800">
              Join our community and start your adventure today!
            </Text>
          </Section>
          <Text className="mt-[32px] text-[14px] leading-[20px] text-gray-500">
            If you have any questions or need help getting started, don&apos;t
            hesitate to contact our support team.
          </Text>
          <Section className="mt-[40px] border-t border-gray-200 pt-[24px]">
            <Text className="text-center text-[12px] leading-[18px] text-gray-500">
              {serverName && (
                <>
                  Welcome to <strong className="text-gray-700">{serverName}</strong>!
                  <br />
                </>
              )}
              We&apos;re excited to have you on board. See you in-game!
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

RegisterSuccessEmail.PreviewProps = {
  username: 'Steve',
  serverName: 'MyMinecraft Server',
  serverLogo: `${baseUrl}/static/server-logo.png`,
  loginLink: 'https://example.com/login',
} as RegisterSuccessEmailProps;

export default RegisterSuccessEmail;
