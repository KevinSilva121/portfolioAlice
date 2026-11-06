// Formulário de contato do site advalicecamargo.com.br.
//
// O site envia para /api/contato (o Firebase Hosting repassa para esta função). A função:
//   1. valida os campos e bloqueia robôs (campo invisível) e excesso de envios do mesmo IP;
//   2. GUARDA a mensagem no Firestore (coleção "contatos") — nenhum contato se perde;
//   3. envia o e-mail para a Dra. Alice (no e-mail da OAB), com "Responder" indo direto ao cliente;
//   4. envia uma resposta automática para quem escreveu.
// Se o e-mail para a Dra. Alice falhar, responde erro: o site mostra a alternativa por WhatsApp/e-mail.
import { onRequest } from 'firebase-functions/v2/https';
import { defineSecret, defineString } from 'firebase-functions/params';
import { logger } from 'firebase-functions';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { createHash } from 'node:crypto';
import { sendEmail } from './mailer.js';
import { ownerEmail, autoReplyEmail } from './templates.js';

initializeApp();
const db = getFirestore();

const RESEND_API_KEY = defineSecret('RESEND_API_KEY');
// Destino e remetente podem ser trocados sem mexer no código (arquivo functions/.env).
const CONTACT_TO = defineString('CONTACT_TO', { default: 'alicegabrielacamargo@adv.oabsp.org.br' });
const CONTACT_FROM = defineString('CONTACT_FROM', { default: 'Site Alice Camargo <contato@advalicecamargo.com.br>' });

const SITE_URL = 'https://advalicecamargo.com.br';
const MAX_PER_HOUR = 5;
const LIMITS = { name: [2, 120], email: [5, 200], phone: [8, 30], message: [5, 5000] };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const clean = (value) => String(value ?? '').replace(/\s+/g, ' ').trim();
const cleanMultiline = (value) => String(value ?? '').replace(/\r\n/g, '\n').replace(/[ \t]+/g, ' ').trim();

function validate(body) {
  const data = {
    name: clean(body.name),
    email: clean(body.email).toLowerCase(),
    phone: clean(body.phone),
    message: cleanMultiline(body.message),
    page: clean(body.page).slice(0, 200),
  };
  const errors = [];
  for (const [field, [min, max]] of Object.entries(LIMITS)) {
    const length = data[field].length;
    if (length < min || length > max) errors.push(field);
  }
  if (!errors.includes('email') && !EMAIL_RE.test(data.email)) errors.push('email');
  if (!errors.includes('phone') && data.phone.replace(/\D/g, '').length < 8) errors.push('phone');
  return { data, errors };
}

function clientIp(req) {
  const forwarded = req.get('x-forwarded-for');
  return (forwarded ? forwarded.split(',')[0] : req.ip || '').trim();
}

// Até MAX_PER_HOUR envios por hora por IP (o IP é guardado só como hash).
async function allowedByRateLimit(ipHash) {
  const ref = db.collection('limites').doc(ipHash);
  const now = Date.now();
  return db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const recent = (snap.exists ? snap.data().envios : []).filter((t) => now - t < 3600_000);
    if (recent.length >= MAX_PER_HOUR) return false;
    tx.set(ref, { envios: [...recent, now], atualizadoEm: FieldValue.serverTimestamp() });
    return true;
  });
}

export const contato = onRequest(
  {
    region: 'southamerica-east1',
    secrets: [RESEND_API_KEY],
    memory: '256MiB',
    timeoutSeconds: 30,
    maxInstances: 5,
    cors: false, // só o próprio site (mesmo domínio, via Hosting) chama esta função
  },
  async (req, res) => {
    const wantsJson = (req.get('accept') || '').includes('application/json');
    const reply = (status, payload) => {
      if (wantsJson) return res.status(status).json(payload);
      // Envio sem JavaScript: volta para o site.
      return res.redirect(303, status < 300 ? `${SITE_URL}/obrigado` : `${SITE_URL}/contato`);
    };

    if (req.method !== 'POST') return res.status(405).set('Allow', 'POST').send('Método não permitido');

    const body = req.body && typeof req.body === 'object' ? req.body : {};

    // Robô preencheu o campo invisível: finge sucesso e não faz nada.
    if (clean(body._honey)) return reply(200, { ok: true });

    const { data, errors } = validate(body);
    if (errors.length) return reply(400, { ok: false, error: 'invalid', fields: errors });

    const ipHash = createHash('sha256').update(clientIp(req)).digest('hex').slice(0, 32);
    if (!(await allowedByRateLimit(ipHash))) return reply(429, { ok: false, error: 'rate_limited' });

    // 1) Guarda a mensagem antes de qualquer envio.
    const doc = await db.collection('contatos').add({
      nome: data.name,
      email: data.email,
      telefone: data.phone,
      mensagem: data.message,
      pagina: data.page || null,
      criadoEm: FieldValue.serverTimestamp(),
      ipHash,
      userAgent: clean(req.get('user-agent')).slice(0, 300),
      emailEnviado: false,
    });

    // No emulador local nunca envia e-mail de verdade (só registra no log).
    const apiKey = process.env.FUNCTIONS_EMULATOR === 'true' ? null : RESEND_API_KEY.value();
    const from = CONTACT_FROM.value();
    const to = CONTACT_TO.value();

    // 2) E-mail para a Dra. Alice (Responder -> cliente).
    try {
      await sendEmail(apiKey, { from, to, replyTo: data.email, ...ownerEmail(data, doc.id) });
      await doc.update({ emailEnviado: true });
    } catch (error) {
      logger.error('Falha ao enviar e-mail para a Dra. Alice', { id: doc.id, error: error.message });
      await doc.update({ emailEnviado: false, erroEmail: error.message.slice(0, 500) });
      return reply(502, { ok: false, error: 'email_failed' });
    }

    // 3) Resposta automática para quem escreveu (se falhar, não atrapalha o contato).
    try {
      await sendEmail(apiKey, { from, to: data.email, replyTo: to, ...autoReplyEmail(data) });
      await doc.update({ respostaAutomatica: true });
    } catch (error) {
      logger.warn('Falha na resposta automática', { id: doc.id, error: error.message });
    }

    return reply(200, { ok: true });
  },
);
