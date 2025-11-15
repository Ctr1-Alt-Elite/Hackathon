package io.github.ctrl_alt_elite.hackathon.repository;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.stereotype.Repository;

// TODO: store somewhere else
@Repository
public class NonceRepository {
    private final Map<String, String> store = new HashMap<>();

    public String getNonceByAddress(String address) {
        return store.computeIfAbsent(address.toLowerCase(), NonceRepository::generateNonce);
    }

    public void save(String address, String nonce) {
        store.put(address.toLowerCase(), nonce);
    }

    public static String generateNonce(String address) {
        return "AuthNonce:" + UUID.randomUUID().toString() + ":" + System.currentTimeMillis();
    }
}
