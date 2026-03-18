import fm from 'front-matter';

// Carrega automaticamente todos os arquivos .md da pasta blog durante o build
const markdownFiles = import.meta.glob('../content/blog/*.md', { query: '?raw', import: 'default', eager: true });

export function getAllPosts() {
  const posts = Object.keys(markdownFiles).map((filepath) => {
    const rawContent = markdownFiles[filepath];
    const { attributes, body } = fm(rawContent);
    const slug = filepath.replace('../content/blog/', '').replace('.md', '');

    return {
      slug,
      ...attributes,
      body
    };
  });

  // Ordena do mais recente para o mais antigo
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getRecentPosts(limit = 3) {
  return getAllPosts().slice(0, limit);
}

export function getPostBySlug(slug) {
  return getAllPosts().find((p) => p.slug === slug);
}
