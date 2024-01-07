import { WelcomeEmailTemplate } from '../../../../components/emails/WelcomeEmail'
import { Resend } from 'resend'
import * as React from 'react'

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {

  try {
    const data = await resend.emails.send({
      from: 'Debby - Gidiopolis <debby@gidiopolis.com>',
      to: ['deniafe@gmail.com'],
      subject: 'Welcome To Gidiopolis',
      react: WelcomeEmailTemplate({ name: 'Toyin', actionLabel: "verify", buttonText: 'Verify Email', href: 'https://gidiopolis.com/' }) as React.ReactElement,
    });

    return Response.json(data);

  } catch (error) {
    console.log('There was an error sending the email', error)
    return Response.json({ error });
  }
}
