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
    <Preview>{'{{TRANSLATION:welcome-preview:Welcome to}}'} {serverName || '{{TRANSLATION:our-server:our Minecraft server}}'}!</Preview>
    <Tailwind>
      <Body className="mx-auto my-auto px-2 font-sans">
        <Container className="mx-auto my-[40px] max-w-[600px] p-[40px]">
          {serverLogo && (
            <Section className="mb-[32px] text-center">
              <Img
                src={'{{serverLogo}}'}
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
          <Section className="my-[32px] text-center">
            <div className="mx-auto mb-[16px] flex h-[64px] w-[64px] items-center justify-center rounded-full bg-[#55C55A]">
              <span className="text-[32px]">✓</span>
            </div>
            <Heading className="mx-0 my-0 p-0 text-center text-[24px] font-semibold text-gray-800">
              {'{{TRANSLATION:welcome:Welcome!}}'}
            </Heading>
          </Section>
          <Text className="text-[16px] leading-[24px] text-gray-700">
            {'{{TRANSLATION:hello:Hello}}'} <strong>{'{{username}}'}</strong>,
          </Text>
          <Text className="text-[16px] leading-[24px] text-gray-700">
            {'{{TRANSLATION:register-success:Your account has been successfully created. We\'re excited to have you on board!}}'}
          </Text>
          <Text className="text-[16px] leading-[24px] text-gray-700">
            {'{{TRANSLATION:register-success-instruction:You can now log in to your account and start exploring all the features we have to offer.}}'}
          </Text>
          {loginLink && (
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-lg bg-[#55C55A] px-8 py-4 text-center text-[16px] font-semibold text-white no-underline shadow-md"
                href={'{{loginLink}}'}
              >
                {'{{TRANSLATION:go-to-login:Go to Login}}'}
              </Button>
            </Section>
          )}
          <Section className="my-[32px] rounded-lg bg-green-50 p-[20px]">
            <Text className="m-0 text-center text-[14px] font-semibold text-green-900">
              {'{{TRANSLATION:ready-to-play:🎮 Ready to play?}}'}
            </Text>
            <Text className="m-0 mt-[8px] text-center text-[14px] leading-[20px] text-green-800">
              {'{{TRANSLATION:join-community:Join our community and start your adventure today!}}'}
            </Text>
          </Section>
          <Text className="mt-[32px] text-[14px] leading-[20px] text-gray-500">
            {'{{TRANSLATION:register-support:If you have any questions or need help getting started, don\'t hesitate to contact our support team.}}'}
          </Text>
          <Section className="mt-[40px] border-t border-gray-200 pt-[24px]">
            <Text className="text-left text-[12px] leading-[18px] text-gray-500">
              {serverName && (
                <>
                  {'{{TRANSLATION:welcome-to:Welcome to}}'} <strong className="text-gray-700">{'{{serverName}}'}</strong>!
                  <br />
                </>
              )}
              {'{{TRANSLATION:see-you-ingame:We\'re excited to have you on board. See you in-game!}}'}
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
