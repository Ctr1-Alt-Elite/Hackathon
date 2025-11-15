package io.github.ctrl_alt_elite.hackathon.controllers;



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

import io.github.ctrl_alt_elite.hackathon.service.AuthService;

import org.springframework.web.context.request.NativeWebRequest;

import jakarta.validation.constraints.*;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import jakarta.annotation.Generated;

@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2025-11-14T17:14:34.420633+03:00[Europe/Moscow]", comments = "Generator version: 7.8.0")
@Controller
@RequestMapping("${openapi.hackathon.base-path:}")
public class AuthApiController implements AuthApi {

    private final NativeWebRequest request;
    private final AuthService service;

    @Autowired
    public AuthApiController(NativeWebRequest request, AuthService service) {
        this.request = request;
        this.service = service;
    }

    @Override
    public Optional<NativeWebRequest> getRequest() {
        return Optional.ofNullable(request);
    }

    @Override
    public ResponseEntity<String> authNonce(@NotNull String address) {
        return ResponseEntity.ok().body(service.getNonce(address));
    }

    @Override
    public ResponseEntity<String> auth(@NotNull String address, @Valid String signature) {
        String nonce = service.getNonce(address);
        
        return ResponseEntity.ok().body(service.authenticate(address, signature, nonce));
    }

}
