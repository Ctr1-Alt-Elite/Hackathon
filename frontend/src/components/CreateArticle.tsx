import React, { useState } from 'react';
import { type Article, api } from '../types/api';

interface CreateArticleProps {
  jwt: string;
  onBack: () => void;
  onArticleCreated: () => void;
}

function CreateArticle({ jwt, onBack, onArticleCreated }: CreateArticleProps) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !text.trim()) {
      alert('Заполните заголовок и текст');
      return;
    }

    setLoading(true);

    try {
      const articleData: Article = {
        title: title.trim(),
        text: text.trim(),
        tags: tags
      };

      await api.createArticle(articleData, jwt);
      alert('Статья создана!');
      onArticleCreated();
      onBack();
    } catch (error) {
      console.error('Error creating article:', error);
      alert('Ошибка создания статьи');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-article-page">
      <button onClick={onBack} className="back-button">
        ← Назад
      </button>

      <div className="create-article-container">
        <h1>Создать статью</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Заголовок *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Введите заголовок"
              required
            />
          </div>

          <div className="form-group">
            <label>Теги</label>
            <div className="tags-input">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Введите тег и нажмите Enter"
              />
              <button type="button" onClick={addTag}>+</button>
            </div>
            <div className="tags-list">
              {tags.map(tag => (
                <span key={tag} className="tag">
                  #{tag}
                  <button type="button" onClick={() => removeTag(tag)}>×</button>
                </span>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Текст статьи *</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Введите текст статьи..."
              rows={10}
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onBack} className="btn-secondary">
              Отмена
            </button>
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Создание...' : 'Создать статью'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateArticle;