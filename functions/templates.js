// Textos dos e-mails. A resposta automática segue as regras da OAB: informativa, sem promessa.
const escapeHtml = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const brDate = () =>
  new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', dateStyle: 'short', timeStyle: 'short' });

const wrap = (inner) => `<!doctype html><html lang="pt-BR"><body style="margin:0;padding:24px;background:#f4f5f7;font-family:Arial,Helvetica,sans-serif;color:#1f2937">
<div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e5e7eb">
<div style="background:#0f172a;padding:18px 24px;font-family:Georgia,serif;font-size:20px;color:#f8fafc">Alice <span style="color:#D4AF37">Camargo</span></div>
<div style="padding:24px;font-size:15px;line-height:1.6">${inner}</div>
</div></body></html>`;

export function ownerEmail(data, id) {
  const whatsappDigits = data.phone.replace(/\D/g, '');
  const whatsapp = `https://wa.me/${whatsappDigits.length <= 11 ? `55${whatsappDigits}` : whatsappDigits}`;
  const rows = [
    ['Nome', escapeHtml(data.name)],
    ['E-mail', `<a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a>`],
    ['Telefone', `${escapeHtml(data.phone)} · <a href="${whatsapp}">abrir no WhatsApp</a>`],
    ['Página', escapeHtml(data.page || '-')],
    ['Recebido em', brDate()],
  ];
  const html = wrap(`
<p style="margin:0 0 16px">Nova mensagem pelo formulário do site.</p>
<table style="border-collapse:collapse;width:100%;margin-bottom:16px">${rows
    .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#6b7280;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:6px 0">${v}</td></tr>`)
    .join('')}</table>
<div style="background:#f9fafb;border-left:3px solid #D4AF37;padding:12px 16px;white-space:pre-wrap">${escapeHtml(data.message)}</div>
<p style="margin:16px 0 0;color:#6b7280;font-size:13px">Clique em <strong>Responder</strong> para escrever direto para ${escapeHtml(data.name)}. Registro: ${id}</p>`);

  const text = `Nova mensagem pelo formulário do site.

Nome: ${data.name}
E-mail: ${data.email}
Telefone: ${data.phone} (WhatsApp: ${whatsapp})
Página: ${data.page || '-'}
Recebido em: ${brDate()}

Mensagem:
${data.message}

Responda este e-mail para escrever direto para ${data.name}. Registro: ${id}`;

  return { subject: `Novo contato pelo site: ${data.name}`, html, text };
}

export function autoReplyEmail(data) {
  const firstName = data.name.split(' ')[0];
  const html = wrap(`
<p style="margin:0 0 12px">Olá, ${escapeHtml(firstName)}!</p>
<p style="margin:0 0 12px">Recebemos a sua mensagem enviada pelo site. A Dra. Alice Gabriela Camargo vai responder pelo e-mail ou telefone informados.</p>
<p style="margin:0 0 12px">Se preferir, você também pode falar pelo WhatsApp: <a href="https://wa.me/5512997748723">(12) 99774-8723</a>.</p>
<p style="margin:0 0 20px">Atenciosamente,<br>Dra. Alice Gabriela Camargo<br><span style="color:#6b7280">Advogada · OAB/SP 529.641</span></p>
<p style="margin:0;color:#9ca3af;font-size:12px">Esta é uma confirmação automática de recebimento. As informações enviadas são tratadas com sigilo, conforme a Política de Privacidade: https://advalicecamargo.com.br/privacidade</p>`);

  const text = `Olá, ${firstName}!

Recebemos a sua mensagem enviada pelo site. A Dra. Alice Gabriela Camargo vai responder pelo e-mail ou telefone informados.

Se preferir, você também pode falar pelo WhatsApp: (12) 99774-8723 - https://wa.me/5512997748723

Atenciosamente,
Dra. Alice Gabriela Camargo
Advogada · OAB/SP 529.641

Esta é uma confirmação automática de recebimento. As informações enviadas são tratadas com sigilo, conforme a Política de Privacidade: https://advalicecamargo.com.br/privacidade`;

  return { subject: 'Recebemos sua mensagem | Dra. Alice Camargo', html, text };
}
