import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "Email service not configured." }, { status: 503 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const safeName = String(name).replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const safeEmail = String(email).replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const safeMsg = String(message).replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const { data, error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: ["pg962359@gmail.com"],
    replyTo: email,
    subject: `Portfolio inquiry from ${name}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:24px;background:#111;color:#e5e2e1;border-radius:12px;border:1px solid #2a2a2a">
        <h2 style="color:#d2bbff;margin-top:0">New Portfolio Inquiry</h2>
        <p><strong style="color:#adc6ff">Name:</strong> ${safeName}</p>
        <p><strong style="color:#adc6ff">Email:</strong> <a href="mailto:${safeEmail}" style="color:#d2bbff">${safeEmail}</a></p>
        <hr style="border:none;border-top:1px solid #2a2a2a;margin:16px 0"/>
        <p style="color:#adc6ff;font-weight:600;margin-bottom:8px">Message</p>
        <p style="line-height:1.7;white-space:pre-wrap;margin:0">${safeMsg}</p>
        <hr style="border:none;border-top:1px solid #2a2a2a;margin:16px 0"/>
        <p style="color:#555;font-size:12px;margin:0">Hit Reply to respond directly to ${safeEmail}</p>
      </div>
    `,
  });

  if (error) {
    console.error("[api/contact] Resend error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log("[api/contact] sent:", data?.id);
  return NextResponse.json({ success: true });
}
