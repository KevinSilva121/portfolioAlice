// Gera versões otimizadas (WebP) das imagens do site em src/assets/img.
// Rodar só quando uma imagem original mudar: `node scripts/optimize-images.js`
// Os originais ficam em public/ (alice.png, bg-law.png) e scripts/originais/icons.
import sharp from 'sharp';
import { mkdirSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, parse } from 'node:path';

const root = fileURLToPath(new URL('..', import.meta.url));
const out = join(root, 'src/assets/img');
mkdirSync(join(out, 'icons'), { recursive: true });

const jobs = [
  // Foto da Alice: exibida em até ~560px de largura (grid do "Sobre"); 2 tamanhos para srcset.
  { src: 'public/alice.png', dest: 'alice-480.webp', width: 480, quality: 78 },
  { src: 'public/alice.png', dest: 'alice-800.webp', width: 800, quality: 78 },
  // Fundo do topo: original tem 640px; fica atrás de um overlay escuro, então qualidade menor não aparece.
  { src: 'public/bg-law.png', dest: 'bg-law.webp', width: 640, quality: 60 },
];

// Ícones dos "Links Úteis": exibidos em 82px; 164px cobre telas retina.
const iconsDir = join(root, 'scripts/originais/icons');
for (const file of readdirSync(iconsDir)) {
  const { name } = parse(file);
  if (name === 'tst' && file.endsWith('.png')) continue; // duplicado de 48px; o JPG é o usado no site
  jobs.push({ src: join('scripts/originais/icons', file), dest: `icons/${name}.webp`, width: 164, quality: 85 });
}

for (const job of jobs) {
  const info = await sharp(join(root, job.src))
    .resize({ width: job.width, withoutEnlargement: true })
    .webp({ quality: job.quality, effort: 6 })
    .toFile(join(out, job.dest));
  console.log(`${job.dest.padEnd(24)} ${String(info.width).padStart(4)}px  ${(info.size / 1024).toFixed(1)} KB`);
}
