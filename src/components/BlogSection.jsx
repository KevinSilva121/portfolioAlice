import { ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getRecentPosts, postPath } from '../content';
import { formatDate } from '../utils/format';
import './BlogSection.css';

const BlogSection = () => {
  const recentPosts = getRecentPosts(3);

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
              to={postPath(post.slug)}
              key={post.slug}
              className="blog-preview-card"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {post.thumbnail && (
                <div className="blog-card-image">
                  <img src={post.thumbnail} alt="" loading="lazy" />
                </div>
              )}
              <div className="blog-card-content">
                <div className="blog-meta">
                  <Calendar size={14} aria-hidden="true" />
                  <time dateTime={post.date}>{formatDate(post.date, 'short')}</time>
                </div>
                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-excerpt">{post.excerpt}</p>
                <span className="read-more">Ler artigo completo <ArrowRight size={16} aria-hidden="true" /></span>
              </div>
            </Link>
          ))}
        </div>

        <div className="blog-footer animate-on-scroll">
          <Link to="/blog" className="btn btn-outline view-all-btn">
            Ver Todos Artigos <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
