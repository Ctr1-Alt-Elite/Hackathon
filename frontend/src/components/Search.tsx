import React, { useState } from "react";
import "../styles/Search.css";
import type { Article } from "../types/api";
import { api } from "../types/api";

interface SearchProps {
  jwt: string;
  onArticleClick: (article: Article) => void;
}

function Search({ jwt, onArticleClick }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    
    try {
      const searchResults = await api.searchArticles(searchTerm, jwt);
      setResults(searchResults);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Введите поисковый запрос..."
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="search-input"
        />
        <button 
          onClick={handleSearch} 
          disabled={loading || !searchTerm.trim()}
          className="search-button"
        >
          {loading ? 'Поиск...' : 'Найти'}
        </button>
      </div>

      {results.length > 0 && (
        <div className="search-results">
          <h3>Результаты поиска ({results.length})</h3>
          <div className="results-grid">
            {results.map((article, index) => (
              <div 
                key={article.id || index} 
                className="result-card"
                onClick={() => onArticleClick(article)}
              >
                <h4>{article.title}</h4>
                <p className="result-card-content">
                  {article.text.substring(0, 150)}...
                </p>
                <div className="result-card-meta">
                  {article.author && <span>Автор: {article.author}</span>}
                  {article.tags && article.tags.length > 0 && (
                    <div className="result-tags">
                      {article.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="tag-small">#{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {searchTerm && results.length === 0 && !loading && (
        <div className="search-hint">
          Нажмите Enter или кнопку "Найти" для поиска
        </div>
      )}
    </div>
  );
}

export default Search;