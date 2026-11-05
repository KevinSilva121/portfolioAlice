import { Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { posts, postPath, getAreaTitle } from '../content';
import { formatDate, readingTimeLabel } from '../utils/format';
import PageHeader from '../components/PageHeader';
import './BlogList.css';

const BlogList = () => {
  return (
    <main className="blog-page-container">
      <PageHeader
        title={<>Blog <span>Jurídico</span></>}
        subtitle="Informação clara, direta e preventiva para proteger o seu patrimônio financeiro e familiar."
      />

      <div className="blog-list-section container">
        {posts.length === 0 ? (
          <div className="no-posts">
            <h2>Em breve, novos conteúdos!</h2>
            <p>Nossa equipe está preparando artigos especializados.</p>
          </div>
        ) : (
          <div className="blog-list-grid">
            {posts.map((post) => (
              <Link to={postPath(post.slug)} key={post.slug} className="blog-list-card">
                {post.thumbnail && (
                  <div className="blog-list-image">
                    <img src={post.thumbnail} alt="" loading="lazy" />
                  </div>
                )}
                <div className="blog-list-content">
                  <div className="blog-meta-date">
                    <Clock size={16} aria-hidden="true" /> <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </div>
                  {post.category && (
                    <p className="blog-card-category">
                      {getAreaTitle(post.category)} · {readingTimeLabel(post.readingTime)}
                    </p>
                  )}
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                  <span className="btn btn-outline" style={{marginTop: 'auto'}}>Ler Artigo Completo</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default BlogList;
