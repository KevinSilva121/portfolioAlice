import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { getPostBySlug } from '../utils/blog';
import './BlogPost.css';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const foundPost = getPostBySlug(slug);
    if(foundPost) {
       setPost(foundPost);
    }
    window.scrollTo(0,0);
  }, [slug]);

  if (!post) {
    return (
      <div className="post-not-found">
        <h2>Artigo não encontrado.</h2>
        <Link to="/blog" className="btn btn-primary">Voltar ao Blog</Link>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  return (
    <article className="blog-post-view">
      {post.thumbnail && (
         <div className="post-hero" style={{backgroundImage: `url(${post.thumbnail})`}}>
            <div className="post-hero-overlay"></div>
         </div>
      )}
      <div className="container post-container">
        {!post.thumbnail && <div className="post-spacer"></div>}
        
        <Link to="/blog" className="back-link">
           <ArrowLeft size={18}/> Voltar ao Blog
        </Link>
        
        <header className="post-header">
           <div className="post-meta">
              <Calendar size={18} /> <span>{formatDate(post.date)}</span>
           </div>
           <h1 className="post-title">{post.title}</h1>
           <div className="post-actions">
             <button onClick={handleShare} className="share-btn">
               <Share2 size={18}/> Compartilhar
             </button>
           </div>
        </header>

        <div className="post-body">
           <ReactMarkdown>{post.body}</ReactMarkdown>
        </div>
        
        <div className="post-footer">
          <Link to="/blog" className="btn btn-outline" style={{width: '100%', textAlign: 'center'}}>Ver mais artigos</Link>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
