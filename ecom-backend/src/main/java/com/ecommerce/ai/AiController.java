package com.ecommerce.ai;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AiController {
    private final AiService aiService;

    public AiController(AiService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/summarize")
    public ResponseEntity<?> summarize(@RequestBody Map<String, String> payload) {
        String name = payload.getOrDefault("name", "");
        String description = payload.getOrDefault("description", "");
        String summary = aiService.summarize(name, description);
        return ResponseEntity.ok(Map.of("summary", summary));
    }
}
