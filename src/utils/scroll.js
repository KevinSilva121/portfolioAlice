// Rolagem até uma seção da home (botões do menu e do topo: /#about, /#expertise, /#contact-form).
//
// Mira no CONTEÚDO da seção (o .container de dentro), não na caixa da seção, que tem 8rem de
// espaçamento em cima. Se o conteúdo cabe na tela, ele fica centralizado no espaço visível abaixo
// do menu; se é mais alto que a tela, o começo dele fica logo abaixo do menu, com uma folga.

const GAP = 24; // folga entre o menu e o conteúdo quando ele não cabe inteiro na tela

// Altura do menu já "encolhido" (classe .scrolled: padding 1.2rem em cima e embaixo),
// que é como ele fica depois de rolar, mesmo que o clique tenha sido feito no topo da página.
export function compactNavbarHeight() {
  const inner = document.querySelector('.navbar .nav-container');
  if (!inner) return 0;
  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
  return inner.offsetHeight + 2 * 1.2 * rem;
}

function sectionContent(section) {
  return section.querySelector(':scope > .container') || section;
}

export function sectionScrollTop(id) {
  if (id === 'home') return 0;
  const section = document.getElementById(id);
  if (!section) return null;

  const content = sectionContent(section);
  const navbar = compactNavbarHeight();
  const visible = window.innerHeight - navbar;
  const rect = content.getBoundingClientRect();
  const contentTop = rect.top + window.scrollY;

  const top = rect.height <= visible - 2 * GAP
    ? contentTop - navbar - (visible - rect.height) / 2
    : contentTop - navbar - GAP;

  const maxTop = document.documentElement.scrollHeight - window.innerHeight;
  return Math.max(0, Math.min(Math.round(top), maxTop));
}

// Âncora comum (ex.: subtítulos do sumário de um artigo): coloca o elemento logo abaixo do menu.
export function scrollToAnchor(id, behavior = 'smooth') {
  const el = document.getElementById(id);
  if (!el) return false;
  const top = el.getBoundingClientRect().top + window.scrollY - compactNavbarHeight() - GAP;
  window.scrollTo({ top: Math.max(0, Math.round(top)), behavior });
  return true;
}

export function scrollToSection(id, behavior = 'smooth') {
  const top = sectionScrollTop(id);
  if (top === null) return false;
  window.scrollTo({ top, behavior });
  return true;
}
