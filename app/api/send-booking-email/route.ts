import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, date, time, cancelToken } = await req.json();

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Hijama Appointment Confirmed",
    html: `
      <h2>Your Hijama appointment is confirmed</h2>

      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>

      <p>If you need to cancel:</p>

      <a href="https://hijama.bio/green-hijama/cancel?token=${cancelToken}">
        Cancel Appointment
      </a>
    `,
  });

  return NextResponse.json({ success: true });
}
