import React, { useState, useEffect } from 'react';
import { type Article, api } from '../types/api';

interface DocumentsPageProps {
  jwt: string;
  onArticleClick: (article: Article) => void;
}

function DocumentsPage({ jwt, onArticleClick }: DocumentsPageProps) {
  const [documents, setDocuments] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDocuments();
  }, [jwt]);

  const loadDocuments = async () => {
    if (!jwt) {
      // Моки для демонстрации
      setDocuments([
        {
          id: '1',
          title: 'Мой проект ремонта',
          author: '0x123...abc',
          tags: ['ремонт', 'квартира'],
          text: 'План ремонта моей квартиры...'
        },
        {
          id: '2', 
          title: 'Смета строительства',
          author: '0x123...abc',
          tags: ['смета', 'бюджет'],
          text: 'Детальная смета расходов...'
        }
      ]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const myArticles = await api.getMyArticles(jwt);
      setDocuments(myArticles);
    } catch (error) {
      console.error('Error loading documents:', error);
      // Fallback на моки при ошибке
      setDocuments([
        {
          id: '1',
          title: 'Проект ремонта офиса',
          author: '0x123...abc',
          tags: ['ремонт', 'офис'],
          text: 'Полный план ремонтных работ...'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!jwt) {
    return (
      <div className="documents-page">
        <h1>Мои документы</h1>
        <div className="auth-warning">
          Войдите в систему чтобы увидеть ваши документы
        </div>
      </div>
    );
  }

  return (
    <div className="documents-page">
      <h1>Мои документы</h1>
      
      {loading ? (
        <div className="loading">Загрузка...</div>
      ) : (
        <div className="documents-grid">
          {documents.map(document => (
            <div 
              key={document.id} 
              className="document-card"
              onClick={() => onArticleClick(document)}
            >
              <h3>{document.title}</h3>
              <p>{document.text.substring(0, 100)}...</p>
              <div className="document-tags">
                {document.tags.map(tag => (
                  <span key={tag} className="tag">#{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DocumentsPage;