package io.github.ctrl_alt_elite.hackathon;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class HackathonApplication {

	public static void main(String[] args) {
		ApplicationContext ctx = SpringApplication.run(HackathonApplication.class, args);

		String[] beanNames = ctx.getBeanDefinitionNames();
        for (String beanName : beanNames) {
            if (beanName.contains("AuthService") || 
                beanName.contains("EthereumService") || 
                beanName.contains("JwtTokenProvider") ||
                beanName.contains("NonceRepository")) {
                System.out.println("✅ Bean loaded: " + beanName);
            }
        }
	}

}
