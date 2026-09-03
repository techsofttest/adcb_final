export const ENQUIRY_EMAIL = process.env.NEXT_PUBLIC_ENQUIRY_EMAIL ?? "admin@adcbind.com";

function labelize(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (c) => c.toUpperCase())
    .trim();
}

export async function submitEnquiryEmail(
  subject: string,
  fields: Record<string, string>
): Promise<void> {
  const payload: Record<string, string> = {};
  for (const [key, value] of Object.entries(fields)) {
    if (value) payload[labelize(key)] = value;
  }

  const res = await fetch("/api/send-mail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ subject, fields: payload }),
  });

  if (!res.ok) {
    throw new Error(`Enquiry submission failed (${res.status})`);
  }
}
