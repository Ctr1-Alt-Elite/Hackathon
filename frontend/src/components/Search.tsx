import React, { useState } from "react";
import "../styles/Search.css";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Заглушка для будущей логики поиска
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    
    // TODO: Заменить на реальный вызов к Python AI бекенду, когда он появится
    // Возможно, надо будет пересмотреть логику обработки результатов, если придётся сликшом часто обновлять, а поиск будет дорогим по времени
    try {
      // Имитация задержки API для полного погружения в страну приколов
      await new Promise(resolve => setTimeout(resolve, 300));
      const mockResults = [
        `Результат 1`,
        `Результат 2`,
        `Результат 3`
      ]
      setResults(mockResults);
    } catch (error) {
      console.error('Search error:', error);
      setResults(['Ошибка при поиске']);
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
            {results.map((item, index) => (
              <div key={index} className="result-card">
                <p className="result-card-content">{item}</p>
                <div className="result-card-meta">
                  <span>Документ {index + 1}</span>
                  <span className="result-card-type">PDF</span>
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