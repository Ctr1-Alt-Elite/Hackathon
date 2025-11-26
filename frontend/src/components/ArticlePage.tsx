import React from 'react';
import type { Article } from '../types/api';

interface ArticlePageProps {
  article: Article;
  onBack: () => void;
}

function ArticlePage({ article, onBack }: ArticlePageProps) {
  return (
    <div className="article-page">
      <button onClick={onBack} className="back-button">
        ← Назад к поиску
      </button>

      <div className="article-container">
        <h1 className="article-title">{article.title}</h1>

        <div className="article-meta">
          {article.author && (
            <span className="article-author">Автор: {article.author}</span>
          )}
        </div>

        {article.tags && article.tags.length > 0 && (
          <div className="article-tags">
            {article.tags.map(tag => (
              <span key={tag} className="tag">#{tag}</span>
            ))}
          </div>
        )}

        <div className="article-content">
          {article.text}
        </div>
      </div>
    </div>
  );
}

export default ArticlePage;