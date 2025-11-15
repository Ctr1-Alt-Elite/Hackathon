package io.github.ctrl_alt_elite.hackathon.security;

import java.nio.charset.StandardCharsets;
import java.util.Map;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.Sign;
import org.web3j.utils.Numeric;

import com.fasterxml.jackson.core.JsonProcessingException;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class AuthControllerTests {
    
    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    
    private final String testPrivateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
    private final Credentials testCredentials = Credentials.create(testPrivateKey);
    private final String testAddress = testCredentials.getAddress();
    
    @Test
    public void testFullAuthFlow() throws Exception {
        // 1. Получаем nonce
        String nonce = getNonce();
        
        // 2. Создаем подпись
        String signature = signMessage(nonce, testCredentials);

        // 3. Аутентифицируемся
        String jwtToken = authenticate(nonce, signature);
        String address = jwtTokenProvider.getAddressFromToken(jwtToken);
        Assertions.assertEquals(testAddress, address);

        // 4. Auth ping
        HttpEntity<String> entity = new HttpEntity<>(MultiValueMap.fromSingleValue(Map.of("Authorization", "Bearer " + jwtToken)));
        ResponseEntity<String> response = restTemplate.exchange(
            "/v1/auth/ping",
            HttpMethod.GET,
            entity,
            String.class
        );

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertEquals("pong", response.getBody());
        
    }
    
    private String getNonce() {
        HttpEntity<String> entity = new HttpEntity<>(MultiValueMap.fromSingleValue(Map.of("Address", testAddress)));
        ResponseEntity<String> response = restTemplate.exchange(
            "/v1/auth/nonce", 
            HttpMethod.GET,
            entity,
            String.class
        );
        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());

        return response.getBody();
    }
    
    private String authenticate(String nonce, String signature) throws JsonProcessingException {
        HttpEntity<String> entity = new HttpEntity<>(signature, MultiValueMap.fromSingleValue(Map.of("Address", testAddress, "Content-type", "application/json")));
        
        ResponseEntity<String> response = restTemplate.exchange(
            "/v1/auth",
            HttpMethod.POST,
            entity,
            String.class
        );
        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        return response.getBody();
    }
    
    private String signMessage(String message, Credentials credentials) {
        byte[] messageBytes = ("\u0019Ethereum Signed Message:\n" + message.length() + message).getBytes(StandardCharsets.UTF_8);
        Sign.SignatureData signature = Sign.signMessage(messageBytes, credentials.getEcKeyPair(), true);
        
        byte[] retval = new byte[65];
        System.arraycopy(signature.getR(), 0, retval, 0, 32);
        System.arraycopy(signature.getS(), 0, retval, 32, 32);
        System.arraycopy(signature.getV(), 0, retval, 64, 1);
        
        return Numeric.toHexString(retval);
    }
}
