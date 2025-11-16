package io.github.ctrl_alt_elite.hackathon.controllers;

import io.github.ctrl_alt_elite.hackathon.dto.ArticleDTO;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.context.request.NativeWebRequest;

import jakarta.validation.constraints.*;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import jakarta.annotation.Generated;

@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2025-11-16T14:23:32.110594+03:00[Europe/Moscow]", comments = "Generator version: 7.8.0")
@Controller
@RequestMapping("${openapi.hackathon.base-path:}")
public class ArticlesApiController implements ArticlesApi {

    private final NativeWebRequest request;

    @Autowired
    public ArticlesApiController(NativeWebRequest request) {
        this.request = request;
    }

    @Override
    public Optional<NativeWebRequest> getRequest() {
        return Optional.ofNullable(request);
    }

    @Override
    public ResponseEntity<Void> createArticle(@Valid ArticleDTO articleDTO) {
        // TODO Auto-generated method stub
        return ArticlesApi.super.createArticle(articleDTO);
    }

    @Override
    public ResponseEntity<List<ArticleDTO>> getArticles() {
        // TODO Auto-generated method stub
        return ArticlesApi.super.getArticles();
    }

    @Override
    public ResponseEntity<List<ArticleDTO>> searchArticles(String phrase) {
        // TODO Auto-generated method stub
        return ArticlesApi.super.searchArticles(phrase);
    }

}
