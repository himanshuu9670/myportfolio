import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, message, subject } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please provide your name, email, and message." },
        { status: 400 }
      );
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_njj265d";
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_p3rth7d";
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "udsrnDu0hWLIhkgcA";
    const recipientEmail = "himanshuu9670@gmail.com";

    const payload = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        user_name: name,
        from_name: name,
        name: name,
        user_email: email,
        from_email: email,
        reply_to: email,
        email: email,
        message: message,
        subject: subject || `Portfolio Inquiry from ${name}`,
        to_email: recipientEmail,
        to_name: "Himanshu Vishwakarma",
      },
    };

    const host = req.headers.get("host") || "localhost:3005";
    const protocol = host.includes("localhost") ? "http" : "https";
    const origin = `${protocol}://${host}`;

    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        Origin: origin,
        Referer: `${origin}/`,
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return NextResponse.json({
        success: true,
        message: "Message sent successfully! Delivered directly to Himanshu's Gmail inbox.",
      });
    }

    const resText = await response.text();
    return NextResponse.json(
      { error: resText || "Email service error. Please try direct email or contact form." },
      { status: response.status }
    );
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal transmission error.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
