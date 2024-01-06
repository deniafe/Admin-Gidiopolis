import { NextResponse } from "next/server";
const nodemailer = require('nodemailer')

// import { admin } from "@/lib/firebase";

const transporter = nodemailer.createTransport({
  host: "smtp.elasticemail.com",
  port: 2525,
  secure: true,
  auth: {
    user: "deniafe@gmail.com",
    pass: "4CB07D5CCE83C6F74329C3754A6A5822D2AA",
  },
});

export async function GET() {

  async function send() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Debby 👻" <deniafe@gmail.com>', // sender address
      to: "drianbake@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
  
    console.log("Message sent: %s", info.messageId);
  }

  try {

    send().catch(err => {
      console.log('There was an error here', err)
      return NextResponse.json({ data: err }, { status: 500 });
    });

    return NextResponse.json({ data: 'success' }, { status: 200 });

  } catch (error) {
    console.error('Error getting documents', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
  
}