import React from 'react';
import './RelaredPosts.css'; // Mantenha com 'r' ou renomeie o arquivo na pasta para RelatedPosts.css


export default function RelatedPosts({ posts = [] }) {
  return (
    <section className="related-posts">
      <h2 className="related-title">Veja Também</h2>

      <div className="related-list">
        {posts.map((post) => (
          <article key={post.id} className="related-card">
            {post.imagem && (
              <a href={post.link} className="related-image-link">
                <img src={post.imagem} alt={post.titulo} />
              </a>
            )}

            <div className="related-content">
              <h3 className="related-card-title">
                <a href={post.link}>{post.titulo}</a>
              </h3>
              {post.resumo && <p className="related-card-excerpt">{post.resumo}</p>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}