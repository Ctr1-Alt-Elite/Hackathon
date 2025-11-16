package io.github.ctrl_alt_elite.hackathon.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import io.github.ctrl_alt_elite.hackathon.model.Article;

@Repository
public interface ArticleRepository extends MongoRepository<Article, String> {
    List<Article> findByAuthor(String author);
}
