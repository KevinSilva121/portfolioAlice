import { ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getRecentPosts } from '../utils/blog';
import './BlogSection.css';

const BlogSection = () => {
  const recentPosts = getRecentPosts(3);

  // Formata a data ISO para um formato amigável brasileiro
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  if (!recentPosts || recentPosts.length === 0) {
    return null;
  }

  return (
    <section id="blog" className="section blog-preview-section">
      <div className="container">
        <div className="blog-header animate-on-scroll">
          <h2 className="section-title">Nosso Blog Jurídico</h2>
          <p className="section-subtitle mb-0">Artigos e orientações recentes para você ficar atualizado sobre seus direitos.</p>
        </div>

        <div className="blog-preview-grid animate-on-scroll">
          {recentPosts.map((post, index) => (
            <Link 
              to={`/blog/${post.slug}`} 
              key={post.slug} 
              className="blog-preview-card"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {post.thumbnail && (
                <div className="blog-card-image">
                  <img src={post.thumbnail} alt={post.title} loading="lazy" />
                </div>
              )}
              <div className="blog-card-content">
                <div className="blog-meta">
                  <Calendar size={14} />
                  <span>{formatDate(post.date)}</span>
                </div>
                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-excerpt">{post.excerpt}</p>
                <span className="read-more">Ler artigo completo <ArrowRight size={16} /></span>
              </div>
            </Link>
          ))}
        </div>

        <div className="blog-footer animate-on-scroll">
          <Link to="/blog" className="btn btn-outline view-all-btn">
            Ver Todos Artigos <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
