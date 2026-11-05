import { use } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, RefreshCw, Share2 } from 'lucide-react';
import { getPost, loadDoc, relatedPosts, areaPath, getArea, getAreaTitle, getBreadcrumbs, postPath } from '../content';
import { formatDate, readingTimeLabel } from '../utils/format';
import Breadcrumb from '../components/Breadcrumb';
import Prose from '../components/Prose';
import AuthorBox from '../components/AuthorBox';
import CtaBox from '../components/CtaBox';
import PostCard from '../components/PostCard';
import NotFound from './NotFound';
import './BlogPost.css';
import '../components/Page.css';

const BlogPost = () => {
  const { slug } = useParams();
  const meta = getPost(slug);
  if (!meta) return <NotFound />;
  return <Article meta={meta} />;
};

function Article({ meta }) {
  const post = use(loadDoc('blog', meta.slug));
  const related = relatedPosts(meta, 3);
  const showToc = post.headings.filter((h) => h.level === 2).length >= 4;
  const wasUpdated = post.updated && formatDate(post.updated) !== formatDate(post.date);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  return (
    <main className="blog-post-view">
      {post.thumbnail && (
         <div className="post-hero" style={{backgroundImage: `url(${post.thumbnail})`}}>
            <div className="post-hero-overlay"></div>
         </div>
      )}
      <article className="container post-container">
        {!post.thumbnail && <div className="post-spacer"></div>}

        <Breadcrumb items={getBreadcrumbs(postPath(post.slug))} />

        <header className="post-header">
           <div className="post-meta">
              <Calendar size={18} aria-hidden="true" />
              <span>Publicado em <time dateTime={post.date}>{formatDate(post.date)}</time></span>
           </div>
           <h1 className="post-title">{post.title}</h1>
           <div className="post-details">
             {post.category && (
               getArea(post.category)
                 ? <Link to={areaPath(post.category)} className="post-category">{getAreaTitle(post.category)}</Link>
                 : <span className="post-category">{getAreaTitle(post.category)}</span>
             )}
             <span><Clock size={16} aria-hidden="true" /> {readingTimeLabel(post.readingTime)}</span>
             {wasUpdated && (
               <span><RefreshCw size={16} aria-hidden="true" /> Atualizado em <time dateTime={post.updated}>{formatDate(post.updated)}</time></span>
             )}
           </div>
           <div className="post-actions">
             <button type="button" onClick={handleShare} className="share-btn">
               <Share2 size={18} aria-hidden="true" /> Compartilhar
             </button>
           </div>
        </header>

        {showToc && (
          <nav className="post-toc" aria-label="Neste artigo">
            <p className="post-toc-title">Neste artigo</p>
            <ol>
              {post.headings.filter((h) => h.level === 2).map((h) => (
                <li key={h.id}><a href={`#${h.id}`}>{h.text}</a></li>
              ))}
            </ol>
          </nav>
        )}

        <Prose html={post.html} />

        <AuthorBox />

        <CtaBox
          title="Ficou com alguma dúvida sobre o seu caso?"
          message={`Olá Dra. Alice! Li o artigo "${post.title}" no seu site e gostaria de orientação.`}
        />

        {related.length > 0 && (
          <section className="related-posts" aria-labelledby="leia-tambem">
            <h2 id="leia-tambem" className="page-section-title">Leia também</h2>
            <div className="related-grid">
              {related.map((item) => <PostCard key={item.slug} post={item} />)}
            </div>
          </section>
        )}

        <div className="post-footer">
          <Link to="/blog" className="btn btn-outline" style={{width: '100%', textAlign: 'center'}}>Ver mais artigos</Link>
        </div>
      </article>
    </main>
  );
}

export default BlogPost;
