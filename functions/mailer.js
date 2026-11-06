// Envio de e-mail pelo Resend (https://resend.com/docs/api-reference/emails/send-email).
// Sem chave (emulador local), só registra no log o que seria enviado.
import { logger } from 'firebase-functions';

export async function sendEmail(apiKey, { from, to, replyTo, subject, html, text }) {
  if (!apiKey) {
    logger.info('[emulador] e-mail NÃO enviado (sem chave do Resend)', { to, replyTo, subject, text });
    return { id: 'emulador' };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10_000);
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: [to], reply_to: replyTo, subject, html, text }),
      signal: controller.signal,
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(`Resend ${response.status}: ${result.message || JSON.stringify(result)}`);
    return result;
  } finally {
    clearTimeout(timer);
  }
}
