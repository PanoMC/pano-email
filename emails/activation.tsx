import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

interface ActivationEmailProps {
  username?: string;
  serverName?: string;
  serverLogo?: string;
  activationLink?: string;
  activationCode?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export const ActivationEmail = ({
  username,
  serverName,
  serverLogo,
  activationLink,
  activationCode,
}: ActivationEmailProps) => (
  <Html>
    <Head />
    <Preview>{'{{TRANSLATION:activation-preview:Activate your account on}}'} {serverName || '{{TRANSLATION:our-server:our Minecraft server}}'}</Preview>
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
          <Heading className="mx-0 my-[32px] p-0 text-left text-[24px] font-semibold text-gray-800">
            {'{{TRANSLATION:activate-account:Activate Your Account}}'}
          </Heading>
          <Text className="text-[16px] leading-[24px] text-gray-700">
            {'{{TRANSLATION:hello:Hello}}'} <strong>{'{{username}}'}</strong>,
          </Text>
          <Text className="text-[16px] leading-[24px] text-gray-700">
            {'{{TRANSLATION:activation-thank-you:Thank you for registering! Please activate your account by clicking the button below to get started:}}'}
          </Text>
          <Section className="my-[32px] text-center">
            <Button
              className="rounded-lg bg-[#55C55A] px-8 py-4 text-center text-[16px] font-semibold text-white no-underline shadow-md"
              href={'{{activationLink}}'}
            >
              {'{{TRANSLATION:activate-account-button:Activate Account}}'}
            </Button>
          </Section>
          {activationCode && (
            <>
              <Text className="mb-[12px] text-center text-[14px] text-gray-600">
                {'{{TRANSLATION:activation-code-instruction:Or, copy and paste this activation code:}}'}
              </Text>
              <Section className="my-[24px] rounded-lg bg-gray-50 p-[20px] text-center">
                <code className="text-[18px] font-mono font-bold text-gray-900">
                  {'{{activationCode}}'}
                </code>
              </Section>
            </>
          )}
          <Text className="mt-[32px] text-[14px] leading-[20px] text-gray-500">
            {'{{TRANSLATION:activation-expires:This activation link will expire in 24 hours. If you didn\'t create an account, you can safely ignore this email.}}'}
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

ActivationEmail.PreviewProps = {
  username: 'Steve',
  serverName: 'MyMinecraft Server',
  serverLogo: `${baseUrl}/static/server-logo.png`,
  activationLink: 'https://example.com/activate?token=abc123',
  activationCode: 'ABC123XYZ',
} as ActivationEmailProps;

export default ActivationEmail;
