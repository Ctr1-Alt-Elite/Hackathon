package io.github.ctrl_alt_elite.hackathon;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
class HackathonApplicationTests {

	@Test
	void contextLoads() {
	}

	@Autowired
	MockMvc mvc;

	@Test
	void pingTest() throws Exception {
		mvc.perform(get("/ping"))
			.andExpect(status().isOk())
			.andExpect(content().string("pong"));
	}

}
