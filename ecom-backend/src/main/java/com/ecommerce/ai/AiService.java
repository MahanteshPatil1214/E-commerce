package com.ecommerce.ai;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;
import org.springframework.web.reactive.function.client.WebClientResponseException;

@Service
public class AiService {
    private final WebClient webClient;
    private final String endpoint;
    private final String model;
    private final String apiKey;

    public AiService(@Value("${ai.generation.endpoint}") String endpoint,
                     @Value("${ai.generation.model}") String model,
                     @Value("${ai.api.key:}") String apiKey,
                     WebClient.Builder webClientBuilder) {
        this.endpoint = endpoint;
        this.model = model;
        // allow property to be empty and fallback to environment variable
        if (apiKey == null || apiKey.isBlank()) {
            String envKey = System.getenv("GOOGLE_API_KEY");
            this.apiKey = (envKey != null && !envKey.isBlank()) ? envKey : null;
        } else {
            this.apiKey = apiKey;
        }
        this.webClient = webClientBuilder.baseUrl(endpoint).build();
    }

    public String summarize(String productName, String description) {
        if (apiKey == null || apiKey.isBlank()) {
            return "API key not configured";
        }

        String prompt = "Summarize this product for a listing in 2 short sentences:\nName: "
                + productName + "\nDescription: " + (description == null ? "" : description);

        // FIX: Changed endpoint to :generateContent
        String uri = String.format("/models/%s:generateContent?key=%s", model, apiKey);

        // FIX: Updated request body to match Gemini's 'contents' structure
        Map<String, Object> body = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(
                                Map.of("text", prompt)
                        ))
                ),
                "generationConfig", Map.of(
                        "temperature", 0.2
                )
        );

        try {
            Map<?, ?> resp = webClient.post()
                    .uri(uri)
                    .bodyValue(body)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            if (resp == null) return "No response from AI";

            // FIX: Parsing logic for the 'candidates' -> 'content' -> 'parts' path
            List<?> candidates = (List<?>) resp.get("candidates");
            if (candidates != null && !candidates.isEmpty()) {
                Map<?, ?> candidate = (Map<?, ?>) candidates.get(0);
                Map<?, ?> content = (Map<?, ?>) candidate.get("content");
                List<?> parts = (List<?>) content.get("parts");
                if (parts != null && !parts.isEmpty()) {
                    Map<?, ?> part = (Map<?, ?>) parts.get(0);
                    return String.valueOf(part.get("text"));
                }
            }

            return "Unexpected response format";
        } catch (WebClientResponseException.NotFound nf) {
            return "Model not found: " + model + ". Verify the model name and that your API key has access.";
        } catch (WebClientResponseException we) {
            return "AI provider error: " + we.getStatusCode() + " - " + we.getResponseBodyAsString();
        } catch (Exception e) {
            return "Unexpected error calling AI provider: " + e.getMessage();
        }
    }
}