export default async function handler(req, res) {
  try {
    const apiRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://rehmanansarifaisal.github.io",
        "X-Title": "TechNova Chatbot"
      },
      body: JSON.stringify(req.body)
    });

    const data = await apiRes.json();
    console.log("OpenRouter Response:", data); // ✅ Log the response

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message || "Internal Server Error" });
  }
}
