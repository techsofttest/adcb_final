import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST ?? "";
const SMTP_PORT = Number(process.env.SMTP_PORT ?? "587");
const SMTP_USER = process.env.SMTP_USER ?? "";
const SMTP_PASS = process.env.SMTP_PASS ?? "";
const SMTP_FROM = process.env.SMTP_FROM ?? SMTP_USER;
const MAIL_TO = process.env.ENQUIRY_EMAIL ?? "admin@adcbind.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { subject, fields } = body as {
      subject?: string;
      fields?: Record<string, string>;
    };

    if (!subject || !fields) {
      return NextResponse.json(
        { error: "subject and fields are required" },
        { status: 400 }
      );
    }

    const fieldRows = Object.entries(fields)
      .map(([key, value]) => `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;width:40%">${key}</td><td style="padding:8px 12px;border:1px solid #ddd">${value}</td></tr>`)
      .join("");

    const html = `
      <table style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif;font-size:14px">
        <tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Subject</td><td style="padding:8px 12px;border:1px solid #ddd">${subject}</td></tr>
        ${fieldRows}
      </table>
    `;

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: SMTP_FROM,
      to: MAIL_TO,
      subject,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("send-mail error:", error);
    return NextResponse.json(
      { error: "Failed to send email", detail: String(error) },
      { status: 500 }
    );
  }
}
