import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import { postPath } from '../content';
import { formatDate } from '../utils/format';
import './BlogSection.css';

// Card de artigo (mesmo visual da seção de blog da home).
export default function PostCard({ post, headingLevel = 3 }) {
  const Heading = `h${headingLevel}`;
  return (
    <Link to={postPath(post.slug)} className="blog-preview-card">
      <div className="blog-card-content">
        <div className="blog-meta">
          <Calendar size={14} aria-hidden="true" />
          <time dateTime={post.date}>{formatDate(post.date, 'short')}</time>
        </div>
        <Heading className="blog-card-title">{post.title}</Heading>
        <p className="blog-card-excerpt">{post.excerpt}</p>
        <span className="read-more">Ler artigo completo <ArrowRight size={16} aria-hidden="true" /></span>
      </div>
    </Link>
  );
}
