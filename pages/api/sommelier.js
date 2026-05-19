const GLASS_DOC_ID  = "1PMvZ6JRQJoAedXmqpTCpam8gfACQG4gDBdc1M_B09LY";
const BOTTLE_DOC_ID = "17-iJ_TwabTE_YgEttHxELJpfHR0BLzczv077H7HU5i8";
const FOOD_DOC_ID   = "1kt9L6nsaMU0v2NDwb0fIk6BqWCoOBNCIXGEjEyTMTjk";

async function fetchDoc(id) {
  try {
    const res = await fetch(`https://docs.google.com/document/d/${id}/export?format=txt`);
    if (!res.ok) return "";
    return await res.text();
  } catch { return ""; }
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { messages, format } = req.body;
  if (!messages) return res.status(400).json({ error: "Missing messages" });

  const [glassList, bottleList, foodList] = await Promise.all([
    fetchDoc(GLASS_DOC_ID),
    fetchDoc(BOTTLE_DOC_ID),
    fetchDoc(FOOD_DOC_ID),
  ]);

  const formatNote = format === "glass"
    ? "Recommend EXACTLY 2 by-the-glass options. Carafes available too."
    : format === "bottle"
    ? "Recommend 2-3 bottle options."
    : "Recommend 2-3 options, glass or bottle.";

  const system = `You are the sommelier at Oda Wine Bar — a natural wine bar with Balkan food. Be warm and concise.

${formatNote}

WINE BY THE GLASS/CARAFE:
${glassList}

WINES BY THE BOTTLE:
${bottleList}

FOOD MENU:
${foodList}

Respond ONLY with valid JSON:
{"intro":"1 sentence","suggestions":[{"name":"","producer":"","region":"","format":"","badge":"","reason":"2 sentences max","pairing":"","highlight":""}],"closing":""}
Return ONLY valid JSON. Nothing else.`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 800,
        system,
        messages,
      }),
    });
    const data = await response.json();
    if (!response.ok) return res.status(500).json({ error: "Anthropic error", detail: data });
    res.status(200).json({ content: data.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
