// pages/api/sommelier.js
// This route runs on the SERVER — your Anthropic API key never reaches the browser.

import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages, system } = req.body;

  if (!messages || !system) {
    return res.status(400).json({ error: "Missing messages or system prompt" });
  }

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1200,
      system,
      messages,
    });

    res.status(200).json({ content: response.content });
  } catch (error) {
    console.error("Anthropic API error:", error);
    res.status(500).json({ error: "Failed to get recommendation" });
  }
}
