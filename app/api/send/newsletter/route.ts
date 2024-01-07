import { NewsLetterEmailTemplate } from '../../../../components/emails/NewsLetterEmail'
import { Resend } from 'resend'
import * as React from 'react'
import { baseUrl } from '@/utils/constants';
import axios from 'axios';
import { replacePlaceholders } from '@/utils/func';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const req = await request.json();

  const { title, preview, message, ctaLink, ctaLabel } = req;

  if (!title || !preview || !message) {
    return Response.json({ message: 'Missing fields' }, { status: 400 });
  }

  try {
    const apiUrl = `${baseUrl}/users`;
    const response = await axios(apiUrl);
    let subscribers = response.data.userList;

    //! Remove the user with the specified email from the subscribers array
    const emailToRemove = 'wowe.media@gmail.com';
    subscribers = subscribers.filter((subscriber: any) => subscriber.email !== emailToRemove);


    for (const subscriber of subscribers) {
      try {
        const modifiedMessage = replacePlaceholders(message, subscriber);
        const modifiedTitle = replacePlaceholders(title, subscriber);
        const modifiedCtaLabel = replacePlaceholders(ctaLabel, subscriber);
        const modifiedPreview = replacePlaceholders(preview, subscriber);
        const data = await resend.emails.send({
          from: 'Tolu - Gidiopolis <tolu@gidiopolis.com>',
          to: [subscriber.email], // Send email to the subscriber's email address
          subject: modifiedTitle,
          react: NewsLetterEmailTemplate({
            preview: modifiedPreview,
            message: modifiedMessage,
            buttonText: modifiedCtaLabel,
            href: ctaLink
          }) as React.ReactElement,
        });

        console.log(`Email sent to ${subscriber.email}`)

      } catch (error) {

        console.log(`Error sending email to ${subscriber.email}`, error);
      }
    }

    return Response.json({ message: 'Emails sent successfully' });

  } catch (error) {
    console.log('There was an error fetching subscribers', error);
    return Response.json({ error });
  }
}
