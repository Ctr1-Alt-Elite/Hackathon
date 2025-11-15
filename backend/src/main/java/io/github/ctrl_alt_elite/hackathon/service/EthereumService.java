package io.github.ctrl_alt_elite.hackathon.service;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;
import org.web3j.crypto.Keys;
import org.web3j.crypto.Sign;
import org.web3j.utils.Numeric;

@Service
public class EthereumService {
    
    private static final Logger logger = LoggerFactory.getLogger(EthereumService.class);
    
    /**
     * Проверяет Ethereum подпись
     */
    public String verifySignature(String message, String signature) {
        try {
            byte[] messageBytes = ("\u0019Ethereum Signed Message:\n" + message.length() + message).getBytes(StandardCharsets.UTF_8);
            byte[] signatureBytes = Numeric.hexStringToByteArray(signature);
            
            // Разбираем подпись на компоненты
            byte v = signatureBytes[64];
            if (v < 27) {
                v += 27;
            }
            
            Sign.SignatureData signatureData = new Sign.SignatureData(
                new byte[] {v},
                Arrays.copyOfRange(signatureBytes, 0, 32),
                Arrays.copyOfRange(signatureBytes, 32, 64)
            );
            
            // Восстанавливаем адрес из подписи
            BigInteger publicKey = Sign.signedMessageToKey(messageBytes, signatureData);
            String recoveredAddress = "0x" + Keys.getAddress(publicKey);
            
            logger.info("Recovered address: {}", recoveredAddress);
            return recoveredAddress;
            
        } catch (Exception e) {
            logger.error("Error verifying signature: {}", e.getMessage());
            throw new AuthenticationException("Invalid signature: " + e.getMessage()) {};
        }
    }
    
    /**
     * Проверяет валидность Ethereum адреса
     */
    public boolean isValidAddress(String address) {
        if (address == null || !address.startsWith("0x")) {
            return false;
        }
        
        String cleanAddress = address.startsWith("0x") ? address.substring(2) : address;
        return cleanAddress.matches("^[a-fA-F0-9]{40}$");
    }
}