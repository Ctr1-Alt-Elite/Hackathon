package io.github.ctrl_alt_elite.hackathon.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

import io.github.ctrl_alt_elite.hackathon.repository.NonceRepository;
import io.github.ctrl_alt_elite.hackathon.security.JwtTokenProvider;

@Service
public class AuthService {

    private final NonceRepository repository;
    private final EthereumService ethereumService;
    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public AuthService(NonceRepository repository, EthereumService service, JwtTokenProvider jwtTokenProvider) {
        this.repository = repository;
        this.ethereumService = service;
        this.jwtTokenProvider = jwtTokenProvider;
    }
    
    public String getNonce(String address) {
        if (ethereumService.isValidAddress(address)) {
            return repository.getNonceByAddress(address);
        }
        throw new AuthenticationException("Invalid Ethereum address") {};
    }

    public String authenticate(String address, String signature, String nonce) {
        // Проверяем валидность адреса
        if (!ethereumService.isValidAddress(address)) {
            throw new AuthenticationException("Invalid Ethereum address") {};
        }
        
        // Проверяем nonce
        String storedNonce = repository.getNonceByAddress(address);
        if (storedNonce == null || !storedNonce.equals(nonce)) {
            throw new AuthenticationException("Invalid or expired nonce") {};
        }
        
        String recoveredAddress = ethereumService.verifySignature(nonce, signature);
        
        // Сравниваем адреса
        if (!recoveredAddress.equalsIgnoreCase(address)) {
            throw new AuthenticationException("Address mismatch") {};
        }
        
        updateNonce(address);
        
        // Генерируем JWT токен
        return jwtTokenProvider.generateToken(address);
    }



    private void updateNonce(String address) {
        String nonce = NonceRepository.generateNonce(address);
        repository.save(address, nonce);
    }
}
