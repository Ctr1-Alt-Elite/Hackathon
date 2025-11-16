package io.github.ctrl_alt_elite.hackathon.controllers;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.testcontainers.containers.MongoDBContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import com.fasterxml.jackson.databind.ObjectMapper;

import io.github.ctrl_alt_elite.hackathon.dto.ArticleDTO;
import io.github.ctrl_alt_elite.hackathon.security.JwtTokenProvider;

@AutoConfigureMockMvc
@SpringBootTest
@Testcontainers
public class ArticlesControllerTests {

    @Container
    static MongoDBContainer mongoDBContainer = new MongoDBContainer("mongo:latest")
        .withExposedPorts(27017)
        .withReuse(true);
    
    @DynamicPropertySource
    static void setProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.data.mongodb.host", mongoDBContainer::getHost);
        registry.add("spring.data.mongodb.port", mongoDBContainer::getFirstMappedPort);
        registry.add("spring.data.mongodb.database", () -> "testdb");
    }

    @BeforeAll
    static void beforeAll() {
        // Ждем пока контейнер будет готов
        mongoDBContainer.start();
    }
    
    @Autowired
    MockMvc mvc;

    @Autowired
    JwtTokenProvider provider;

    ObjectMapper objectMapper = new ObjectMapper();

    @Test
    public void createArticleTest() throws Exception {
        ArticleDTO testArticle = new ArticleDTO()
            .title("Merge Sort")
            .tags(List.of("It", "Algorithms"))
            .text("This is test article about merge sort");
        String jwt = provider.generateToken("0xff134");
        mvc.perform(post("/v1/articles/new")
                .header("Authorization", "Bearer " + jwt)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(testArticle)))
            .andExpect(status().isOk()); 
    }

    @Test
    public void getArticleTest() throws Exception {
        ArticleDTO testArticle = new ArticleDTO()
            .title("Stalin Sort")
            .tags(List.of("It", "Algorithms"))
            .text("This is test article about Stalin sort");
        String author = "0xff134";
        String jwt = provider.generateToken(author);

        mvc.perform(post("/v1/articles/new")
                .header("Authorization", "Bearer " + jwt)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(testArticle)))
            .andExpect(status().isOk()); 
        List<ArticleDTO> received = objectMapper.readValue(
            mvc.perform(get("/v1/articles/my").header("Authorization", "Bearer " + jwt))
                .andExpect(status().isOk())
                .andDo(print())
                .andReturn().getResponse().getContentAsString(), 
            objectMapper.getTypeFactory().constructCollectionType(List.class, ArticleDTO.class));

        Assertions.assertEquals(1, received.size());        
        checkArticle(testArticle, author, received.get(0));     

        mvc.perform(post("/v1/articles/new")
                .header("Authorization", "Bearer " + jwt)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(testArticle)))
            .andExpect(status().isOk());
        received = objectMapper.readValue(
            mvc.perform(get("/v1/articles/my").header("Authorization", "Bearer " + jwt))
                .andExpect(status().isOk())
                .andDo(print())
                .andReturn().getResponse().getContentAsString(), 
            objectMapper.getTypeFactory().constructCollectionType(List.class, ArticleDTO.class));

        Assertions.assertEquals(2, received.size());
        checkArticle(testArticle, author, received.get(0));
        checkArticle(testArticle, author, received.get(1));
        Assertions.assertNotEquals(received.get(0).getId(), received.get(1).getId());
    }

    private void checkArticle(ArticleDTO expected, String expectedAuthor, ArticleDTO actual) {
        Assertions.assertNotEquals(null, actual.getId());
        Assertions.assertEquals(expected.getTitle(), actual.getTitle());
        Assertions.assertEquals(expectedAuthor, actual.getAuthor());
        Assertions.assertEquals(expected.getTags(), actual.getTags());
        Assertions.assertEquals(expected.getText(), actual.getText());
    }

    @Test
    public void notAuthTest() throws Exception {
        mvc.perform(post("/v1/articles/new")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(new ArticleDTO())))
            .andExpect(status().isUnauthorized());
    }

    @Test
    public void badBodyTest() throws Exception {
        String jwt = provider.generateToken("0xff134");
        mvc.perform(post("/v1/articles/new")
                .header("Authorization", "Bearer " + jwt)
                .contentType(MediaType.APPLICATION_JSON)
                .content("Illformed!!!!"))
            .andExpect(status().isBadRequest());
    }

    @Test
    public void deleteTest() throws Exception {
        ArticleDTO testArticle = new ArticleDTO()
            .title("Stalin Sort")
            .tags(List.of("It", "Algorithms"))
            .text("This is test article about Stalin sort");
        String jwt = provider.generateToken("0x9568970568");

        mvc.perform(post("/v1/articles/new")
                .header("Authorization", "Bearer " + jwt)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(testArticle)))
            .andExpect(status().isOk());

        List<ArticleDTO> received = objectMapper.readValue(
            mvc.perform(get("/v1/articles/my").header("Authorization", "Bearer " + jwt))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString(), 
            objectMapper.getTypeFactory().constructCollectionType(List.class, ArticleDTO.class));

        mvc.perform(delete("/v1/articles/" + received.get(0).getId()).header("Authorization", "Bearer " + jwt))
            .andExpect(status().isOk())
            .andDo(print());

        received = objectMapper.readValue(
            mvc.perform(get("/v1/articles/my").header("Authorization", "Bearer " + jwt))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString(), 
            objectMapper.getTypeFactory().constructCollectionType(List.class, ArticleDTO.class));
        
        Assertions.assertEquals(List.of(), received);
    }
}
