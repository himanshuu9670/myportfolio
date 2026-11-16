import emailjs from "@emailjs/browser";

export const EMAILJS_CONFIG = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_njj265d",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_p3rth7d",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "udsrnDu0hWLIhkgcA",
  recipientEmail: "himanshuu9670@gmail.com",
};

export interface ContactData {
  name?: string;
  user_name?: string;
  from_name?: string;
  email?: string;
  user_email?: string;
  reply_to?: string;
  from_email?: string;
  message: string;
  subject?: string;
}

/**
 * Send contact email using EmailJS.
 * Supports both passing an HTMLFormElement or a structured object.
 */
export async function sendContactMessage(
  formOrData: HTMLFormElement | ContactData,
  toEmail: string = EMAILJS_CONFIG.recipientEmail
) {
  const serviceId = EMAILJS_CONFIG.serviceId;
  const templateId = EMAILJS_CONFIG.templateId;
  const publicKey = EMAILJS_CONFIG.publicKey;

  if (typeof window === "undefined") {
    throw new Error("EmailJS client must be invoked in a browser environment.");
  }

  // Initialize EmailJS with public key
  emailjs.init({ publicKey });

  let name = "";
  let email = "";
  let message = "";
  let subject = "";

  if (typeof HTMLFormElement !== "undefined" && formOrData instanceof HTMLFormElement) {
    const formData = new FormData(formOrData);
    name = (
      formData.get("user_name") ||
      formData.get("from_name") ||
      formData.get("name") ||
      ""
    ).toString();
    email = (
      formData.get("user_email") ||
      formData.get("reply_to") ||
      formData.get("from_email") ||
      formData.get("email") ||
      ""
    ).toString();
    message = (formData.get("message") || "").toString();
    subject = (
      formData.get("subject") ||
      `Portfolio Inquiry from ${name || "Visitor"}`
    ).toString();
  } else {
    const data = formOrData as ContactData;
    name = data.from_name || data.user_name || data.name || "Portfolio Visitor";
    email = data.reply_to || data.user_email || data.from_email || data.email || "";
    message = data.message || "";
    subject = data.subject || `Portfolio Inquiry from ${name}`;
  }

  const templateParams = {
    // Standard and common template variable aliases
    user_name: name,
    from_name: name,
    name: name,
    user_email: email,
    from_email: email,
    reply_to: email,
    email: email,
    message: message,
    subject: subject,
    to_email: toEmail,
    to_name: "Himanshu Vishwakarma",
  };

  const response = await emailjs.send(serviceId, templateId, templateParams, {
    publicKey,
  });

  return response;
}
