export interface Article {
  id?: string;
  title: string;
  author?: string;
  tags: string[];
  text: string;
}

const API_BASE = 'http://localhost:8080/v1';

export const api = {
  searchArticles: async (query: string, jwt: string): Promise<Article[]> => {
    const response = await fetch(`${API_BASE}/articles/search/${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  },

  getMyArticles: async (jwt: string): Promise<Article[]> => {
    const response = await fetch(`${API_BASE}/articles/my`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }
};