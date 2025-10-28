import express from "express";
import axios from "axios";
import "dotenv/config";

const router = express.Router();
const openrouterApiKey = "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";
const openrouterUrl = "https://openrouter.ai/api/v1/chat/completions";

router.post("/ask", async (req, res) => {
  const { query } = req.body;

  if (!query || query.trim().length === 0) {
    return res.status(400).json({ error: "Query cannot be empty" });
  }

  try {
    console.log(
      `Processing query: "${query.substring(0, 100)}${
        query.length > 100 ? "..." : ""
      }"`
    );

 const models = [
  "tngtech/deepseek-r1t2-chimera:free",
  "perplexity/llama-3.1-sonar-small-chat",
  "google/gemma-2-9b-it"
];


    let response;
    let lastError;

    for (const model of models) {
      try {
        console.log(`Trying model: ${model}`);

        response = await axios.post(
          openrouterUrl,
          {
            model: model,
            messages: [
              {
                role: "system",
                content: `You are a warm, empathetic, and understanding AI friend and therapist. 
Your goal is to comfort and emotionally support someone who is heartbroken or going through emotional pain.

Guidelines for your responses:
1. Speak like a real, caring friend — gentle, non-judgmental, and emotionally intelligent.
2. Validate their emotions. Show understanding and empathy before offering perspective.
3. Never minimize their feelings — acknowledge their pain genuinely.
4. Offer comforting advice, reassurance, and gentle encouragement for healing.
5. Avoid robotic or clinical language; instead, use natural, human-like warmth.
6. Encourage self-care, healthy coping, and emotional growth.
7. If they seem in crisis, gently suggest reaching out to someone they trust or a mental health professional.
8. Don't add emojis and try to add some shayris in hinglish.

Format:
- Speak softly and conversationally, like chatting with a trusted friend and generate answers in hinglish and don't add emojis.
- Use short paragraphs for emotional flow.`,
              },
              {
                role: "user",
                content: query, 
              },
            ],
            max_tokens: 1024,
            temperature: 0.7, // more warmth and creativity
          },
          {
            headers: {
              Authorization: `Bearer ${openrouterApiKey}`,
              "Content-Type": "application/json",
            },
            timeout: 30000,
          }
        );

        console.log(`✅ Successfully got response from ${model}`);
        break; // stop trying further models
      } catch (modelError) {
        console.log(
          `❌ Model ${model} failed:`,
          modelError.response?.data?.error || modelError.message
        );
        lastError = modelError;
        continue;
      }
    }

    if (!response) {
      throw lastError || new Error("All models failed to respond");
    }

    const answer = response.data?.choices?.[0]?.message?.content;
    if (!answer || answer.trim().length === 0) {
      return res.status(500).json({
        error: "AI service returned an empty response. Please try again.",
      });
    }

    console.log(`✅ Generated answer (${answer.length} chars)`);
    res.json({
      answer: answer.trim(),
      queryLength: query.length,
    });
  } catch (error) {
    console.error(
      "Error querying AI service:",
      error.response?.data || error.message
    );

    let errorMessage = "Failed to get response from AI service";

    if (error.code === "ECONNABORTED") {
      errorMessage = "Request timed out. Please try again.";
    } else if (error.response?.status === 401) {
      errorMessage =
        "AI service authentication failed. Please check your API configuration.";
    } else if (error.response?.status === 429) {
      errorMessage = "Too many requests. Please wait a moment before retrying.";
    } else if (error.response?.status === 413) {
      errorMessage =
        "Request payload too large. Try with a shorter question or message.";
    } else if (error.response?.status === 402) {
      errorMessage =
        "Payment required: your OpenRouter account might not have enough credits to use this model.";
    } else if (error.response?.data?.error) {
      errorMessage = `AI service error: ${error.response.data.error}`;
    }

    res.status(500).json({
      error: errorMessage,
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

export default router;
