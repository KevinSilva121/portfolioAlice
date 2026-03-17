import fm from 'front-matter';

// Busca automaticamente todos os arquivos markdown na pasta blog durante o build do Vite
const markdownFiles = import.meta.glob('../content/blog/*.md', { query: '?raw', import: 'default', eager: true });

export function getAllPosts() {
  const posts = Object.keys(markdownFiles).map((filepath) => {
    const rawContent = typeof markdownFiles[filepath] === 'string' 
      ? markdownFiles[filepath] 
      : markdownFiles[filepath].default;
      
    const { attributes, body } = fm(rawContent);
    const fileName = filepath.replace('../content/blog/', '').replace('.md', '');
    
    return {
      slug: fileName,
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
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug);
}
