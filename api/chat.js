export default async function handler(req, res) {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Missing prompt" });
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://technova-chatbot.vercel.app",
        "X-Title": "TechNova Chatbot"
      },
      body: JSON.stringify({
        model: "google/gemma-3n-e2b-it:free",
        messages: [{ role: "user", content: `As TechNova's virtual assistant, reply professionally:\n${prompt}` }]
      })
    });

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content?.trim();

    if (!reply) throw new Error("No valid response");

    res.status(200).json({ reply });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
