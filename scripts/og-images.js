// Gera as imagens de compartilhamento (1200x630) de cada página: aparecem como prévia
// quando alguém compartilha o link no WhatsApp, LinkedIn, Facebook etc.
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const font = (pkg, file) => readFileSync(join(root, 'node_modules/@fontsource', pkg, 'files', file));

const fonts = [
  { name: 'Playfair', data: font('playfair-display', 'playfair-display-latin-700-normal.woff'), weight: 700, style: 'normal' },
  { name: 'Inter', data: font('inter', 'inter-latin-400-normal.woff'), weight: 400, style: 'normal' },
  { name: 'Inter', data: font('inter', 'inter-latin-600-normal.woff'), weight: 600, style: 'normal' },
];

const GOLD = '#D4AF37';
const TEXT = '#f8fafc';
const MUTED = '#cbd5e1';

// Elemento no formato que o satori entende (equivalente a JSX).
const h = (type, style, ...children) => ({ type, props: { style, children: children.flat().filter(Boolean) } });

let photoCache;
async function photo() {
  photoCache ??= `data:image/jpeg;base64,${(
    await sharp(join(root, 'public/alice.png')).resize(420, 420).jpeg({ quality: 85 }).toBuffer()
  ).toString('base64')}`;
  return photoCache;
}

function titleSize(title, big) {
  const len = title.length;
  if (big) return len > 40 ? 60 : 72;
  if (len > 90) return 46;
  if (len > 65) return 52;
  return 60;
}

async function card({ kicker, title, subtitle, big = false }) {
  const photoSize = big ? 300 : 0;

  return h(
    'div',
    {
      width: 1200,
      height: 630,
      display: 'flex',
      backgroundColor: '#0f172a',
      backgroundImage: 'linear-gradient(135deg, #0f172a 0%, #1a2236 60%, #232c45 100%)',
      fontFamily: 'Inter',
      position: 'relative',
    },
    // brilho dourado no canto
    h('div', {
      position: 'absolute', top: -160, right: -160, width: 520, height: 520, borderRadius: 520,
      backgroundImage: 'radial-gradient(circle, rgba(212,175,55,0.22) 0%, rgba(212,175,55,0) 70%)',
    }),
    // moldura de conteúdo com margens fixas (o satori soma padding ao tamanho, então usa posição absoluta)
    h(
      'div',
      { position: 'absolute', top: 60, left: 72, right: 72, bottom: 52, display: 'flex' },
    h(
      'div',
      { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1, flexShrink: 1, paddingRight: big ? 56 : 0 },
      h(
        'div',
        { display: 'flex', flexDirection: 'column' },
        h('div', { display: 'flex', color: GOLD, fontSize: 24, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 28 }, kicker),
        h('div', { display: 'flex', fontFamily: 'Playfair', fontWeight: 700, color: TEXT, fontSize: titleSize(title, big), lineHeight: 1.15 }, title),
        subtitle ? h('div', { display: 'flex', color: MUTED, fontSize: 28, lineHeight: 1.4, marginTop: 24 }, subtitle) : null,
      ),
      h(
        'div',
        { display: 'flex', alignItems: 'center', borderTop: `2px solid ${GOLD}`, paddingTop: 24 },
        big ? null : h('img', { width: 64, height: 64, borderRadius: 64, border: `2px solid ${GOLD}`, marginRight: 20 }),
        h(
          'div',
          { display: 'flex', flexDirection: 'column' },
          h('div', { display: 'flex', color: TEXT, fontSize: 26, fontWeight: 600 }, 'Dra. Alice Gabriela Camargo'),
          h('div', { display: 'flex', color: MUTED, fontSize: 22 }, 'OAB/SP 529.641 · advalicecamargo.com.br'),
        ),
      ),
    ),
    big
      ? h(
          'div',
          { display: 'flex', alignItems: 'center', flexShrink: 0 },
          h('img', { width: photoSize, height: photoSize, borderRadius: photoSize, border: `4px solid ${GOLD}` }),
        )
      : null,
    ),
  );
}

// satori não aceita `src` dentro do style: injeta a foto nos <img> depois de montar a árvore.
function withPhoto(node, src) {
  if (!node || typeof node !== 'object') return node;
  if (node.type === 'img') {
    const { width, height, ...style } = node.props.style;
    return { type: 'img', props: { src, width, height, style } };
  }
  return { ...node, props: { ...node.props, children: node.props.children?.map((c) => withPhoto(c, src)) } };
}

export async function renderOgImage(spec, outFile) {
  const tree = withPhoto(await card(spec), await photo());
  const svg = await satori(tree, { width: 1200, height: 630, fonts });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, await sharp(png).jpeg({ quality: 86, mozjpeg: true }).toBuffer());
}
