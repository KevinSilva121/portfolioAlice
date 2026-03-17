import { ArrowLeft, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../utils/blog';
import './BlogList.css';

const BlogList = () => {
  const posts = getAllPosts();

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  return (
    <div className="blog-page-container">
      <div className="blog-page-header">
        <div className="container">
          <Link to="/" className="back-link">
            <ArrowLeft size={18} /> Voltar ao Início
          </Link>
          <h1 className="blog-page-title">Blog <span>Jurídico</span></h1>
          <p className="blog-page-subtitle">Informação clara, direta e preventiva para proteger o seu patrimônio financeiro e familiar.</p>
        </div>
      </div>

      <div className="blog-list-section container">
        {posts.length === 0 ? (
          <div className="no-posts">
            <h3>Em breve, novos conteúdos!</h3>
            <p>Nossa equipe está preparando artigos especializados.</p>
          </div>
        ) : (
          <div className="blog-list-grid">
            {posts.map((post) => (
              <Link to={`/blog/${post.slug}`} key={post.slug} className="blog-list-card">
                {post.thumbnail && (
                  <div className="blog-list-image">
                    <img src={post.thumbnail} alt={post.title} loading="lazy" />
                  </div>
                )}
                <div className="blog-list-content">
                  <div className="blog-meta-date">
                    <Clock size={16} /> {formatDate(post.date)}
                  </div>
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                  <span className="btn btn-outline" style={{marginTop: 'auto'}}>Ler Artigo Completo</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
