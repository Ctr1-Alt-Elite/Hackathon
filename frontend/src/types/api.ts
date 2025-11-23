export interface Article {
  id?: string;
  title: string;
  author?: string;
  tags: string[];
  text: string;
  createdAt?: string;
  updatedAt?: string;
  status?: 'draft' | 'published';
}

export interface SearchResponse {
  results: Article[];
  total: number;
}