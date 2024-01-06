// import { EmailTemplate } from '../../../components/global/EmailTemplate';
import { EmailTemplate } from '../../../components/emails/WelcomeEmail';
import { Resend } from 'resend';
import * as React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const data = await resend.emails.send({
      from: 'Tolu <admin@gidiopolis.com>',
      to: ['deniafe@gmail.com'],
      subject: 'Hello Deniafe',
      // html: '<p>Congrats on sending your <strong>second email</strong>!</p>'
      react: EmailTemplate({ name: 'Toyin', actionLabel: "verify", buttonText: 'Verify Email', href: 'gidiopolis.com' }) as React.ReactElement,
      // react: EmailTemplate({ firstName: 'Deniafe' }),
    });

    return Response.json(data);

  } catch (error) {
    console.log('There was an error sending the email', error)
    return Response.json({ error });
  }
}
