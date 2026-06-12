import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

const INQUIRY_TYPES: Record<string, string> = {
  freelance: "Freelance project",
  "full-time": "Full-time role",
  other: "Other",
};

const BUDGET_RANGES: Record<string, string> = {
  "under-1k": "Under $1,000",
  "1k-5k": "$1,000 – $5,000",
  "5k-10k": "$5,000 – $10,000",
  "10k-plus": "$10,000+",
  "not-sure": "Not sure yet",
};

// Submissions faster than this are assumed to be bots.
const MIN_SUBMIT_TIME_MS = 3000;

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json(400, { error: "Invalid request body" });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || name.length > 200) {
    return json(400, { error: "Please provide your name" });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 320) {
    return json(400, { error: "Please provide a valid email address" });
  }
  if (!message || message.length > 5000) {
    return json(400, { error: "Please provide a message" });
  }

  // Spam checks: honeypot field filled, or submitted suspiciously fast.
  // Pretend success so bots don't learn they were caught.
  const honeypot = typeof body.website === "string" ? body.website : "";
  const elapsedMs = typeof body.elapsedMs === "number" ? body.elapsedMs : 0;
  if (honeypot || elapsedMs < MIN_SUBMIT_TIME_MS) {
    return json(200, { ok: true });
  }

  const inquiryType =
    INQUIRY_TYPES[
      typeof body.inquiryType === "string" ? body.inquiryType : ""
    ] ?? "Other";
  const budget =
    BUDGET_RANGES[typeof body.budget === "string" ? body.budget : ""] ??
    "Not specified";

  const safeName = name.replace(/[\r\n]+/g, " ");

  const resend = new Resend(import.meta.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: "rohid.dev <noreply@rohid.dev>",
    to: ["rohidul209@gmail.com"],
    replyTo: email,
    subject: `[rohid.dev] ${inquiryType} inquiry from ${safeName}`,
    text: [
      `Name: ${safeName}`,
      `Email: ${email}`,
      `Inquiry type: ${inquiryType}`,
      `Budget: ${budget}`,
      "",
      "Message:",
      message,
    ].join("\n"),
  });

  if (error) {
    console.error("Resend error:", error);
    return json(502, { error: "Failed to send your message" });
  }

  return json(200, { ok: true });
};
