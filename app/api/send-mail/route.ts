import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY ?? "";
const MAIL_FROM = process.env.RESEND_FROM ?? "ADCB Website <onboarding@resend.dev>";
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

    const resend = new Resend(RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: MAIL_FROM,
      to: [MAIL_TO],
      subject,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email", detail: String(error) },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("send-mail error:", error);
    return NextResponse.json(
      { error: "Failed to send email", detail: String(error) },
      { status: 500 }
    );
  }
}
