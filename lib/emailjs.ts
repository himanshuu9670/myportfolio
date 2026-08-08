import { send } from '@emailjs/browser';

const getEmailJsConfig = () => {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error('The contact form is not configured yet. Please try again later.');
  }

  return { serviceId, templateId, publicKey };
};

export async function sendContactMessage(form: HTMLFormElement, recipient: string) {
  const { serviceId, templateId, publicKey } = getEmailJsConfig();
  const formData = new FormData(form);
  const fromName = String(formData.get('from_name') ?? '');
  const replyTo = String(formData.get('reply_to') ?? '');

  return send(
    serviceId,
    templateId,
    {
      // Keep both common EmailJS naming conventions available to the configured template.
      from_name: fromName,
      reply_to: replyTo,
      name: fromName,
      email: replyTo,
      subject: String(formData.get('subject') ?? ''),
      message: String(formData.get('message') ?? ''),
      to_email: recipient,
    },
    { publicKey },
  );
}
