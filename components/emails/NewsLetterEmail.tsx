import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  render,
} from '@react-email/components'

import * as React from "react"

interface EmailTemplateProps {
  buttonText: string
  href: string
  message: string
  preview: string
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export const NewsLetterEmailTemplate = ({
  buttonText,
  href,
  message,
  preview
}: EmailTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>
        {preview}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`https://admin.gidiopolis.com/logo.png`}
            width='200'
            height='20'
            alt='Gidiopolis'
            style={logo}
          />
          <Text style={paragraph}>
           {message}
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href={href}>
              {buttonText}
            </Button>
          </Section>
          <Text style={paragraph}>
            Best,
            <br />
            The Gidiopolis team
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            If you did not request this email, you can
            safely ignore it.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export const PrimaryActionEmailHtml = (
  props: EmailTemplateProps
) => render(<NewsLetterEmailTemplate {...props} />, { pretty: true })

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
}

const logo = {
  margin: '0 auto',
}

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
}

const btnContainer = {
  textAlign: 'center' as const,
}

const button = {
  margin: '6px 0',
  padding: '10px 20px',
  backgroundColor: '#31859C',
  borderRadius: '120px',
  color: '#fff',
  fontSize: '14px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
}

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
}