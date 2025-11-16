package io.github.ctrl_alt_elite.hackathon.controllers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import io.github.ctrl_alt_elite.hackathon.repository.ArticleRepository;

@AutoConfigureMockMvc(addFilters = false)
@SpringBootTest
@EnableAutoConfiguration(exclude = {
    MongoAutoConfiguration.class,
    MongoDataAutoConfiguration.class,
    DataSourceAutoConfiguration.class
})
public class PingControllerTests {

	@MockitoBean
	ArticleRepository repository;

    @Autowired
	MockMvc mvc;

	@Test
	void pingTest() throws Exception {
		mvc.perform(get("/v1/ping"))
			.andExpect(status().isOk())
			.andExpect(content().string("pong"));
	}
}
