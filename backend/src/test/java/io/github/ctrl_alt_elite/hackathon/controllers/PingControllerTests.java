package io.github.ctrl_alt_elite.hackathon.controllers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;

@AutoConfigureMockMvc(addFilters = false)
@WebMvcTest(excludeAutoConfiguration = {DataSourceAutoConfiguration.class})
public class PingControllerTests {
    @Autowired
	MockMvc mvc;

	@Test
	void pingTest() throws Exception {
		mvc.perform(get("/ping"))
			.andExpect(status().isOk())
			.andExpect(content().string("pong"));
	}
}
