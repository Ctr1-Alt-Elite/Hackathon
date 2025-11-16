package io.github.ctrl_alt_elite.hackathon.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import io.github.ctrl_alt_elite.hackathon.dto.ArticleDTO;
import io.github.ctrl_alt_elite.hackathon.model.Article;
import io.github.ctrl_alt_elite.hackathon.repository.ArticleRepository;
import jakarta.validation.Valid;

@Service
public class ArticleService {

    private final ArticleRepository repository;

    @Autowired
    public ArticleService(ArticleRepository repository) {
        this.repository = repository;
    }
    
    public void createArticle(ArticleDTO dto) {
        Article article = new Article(dto.getTitle(), dto.getAuthor(), dto.getTags(), dto.getText());
        repository.save(article);
    }

    public List<ArticleDTO> findByAuthor(String author) {
        return repository.findByAuthor(author).stream()
            .map(article -> new ArticleDTO()
                .id(article.getId())
                .title(article.getTitle())
                .author(article.getAuthor())
                .tags(article.getTags())
                .text(article.getText())
            )
            .toList();
    }

    public void deleteArticle(String id, String author) {
        Optional<Article> article = repository.findById(id);
        if (article.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Not found Article with id: " + id);
        }
        if (!article.get().getAuthor().equals(author)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not allowed to update other's articles!");
        }
        repository.deleteById(id);
    }

    public void updateArticle(String id, ArticleDTO dto) {
        Optional<Article> old = repository.findById(id);
        if (old.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Not found Article with id: " + id);
        }
        if (!old.get().getAuthor().equals(dto.getAuthor())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not allowed to update other's articles!");
        }
        Article new_article = new Article(dto.getTitle(), dto.getAuthor(), dto.getTags(), dto.getText());
        new_article.setId(old.get().getId());
        repository.save(new_article);
    }
}
