// Lightweight proxy endpoint for AI provider.
// Configure the upstream provider URL and API key via environment variables:
// - AI_API_URL: full URL of the AI provider endpoint (e.g. OpenAI or Vercel AI)
// - AI_API_KEY: bearer token for the provider

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
    return;
  }

  const apiUrl = process.env.AI_API_URL;
  const apiKey = process.env.AI_API_KEY;

  if (!apiUrl || !apiKey) {
    res.status(500).json({ error: 'Missing AI_API_URL or AI_API_KEY environment variables.' });
    return;
  }

  const forwardBody = req.body || {};

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(forwardBody),
    });

    const contentType = response.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const json = await response.json();

      // Try common shapes (OpenAI, Vercel AI, etc.) to extract a user-facing text.
      let text = null;
      if (json?.choices && Array.isArray(json.choices) && json.choices[0]?.message?.content) {
        text = json.choices[0].message.content;
      } else if (json?.choices && Array.isArray(json.choices) && json.choices[0]?.text) {
        text = json.choices[0].text;
      } else if (json?.output) {
        // Vercel AI may return an `output` array
        if (Array.isArray(json.output)) {
          text = json.output.map(o => (o?.content ?? o)).join('');
        } else {
          text = json.output;
        }
      } else if (json?.result) {
        text = json.result;
      } else {
        text = JSON.stringify(json);
      }

      res.status(200).json({ text, raw: json });
      return;
    }

    const text = await response.text();
    res.status(200).json({ text });
  } catch (err) {
    console.error('AI proxy error:', err);
    res.status(502).json({ error: 'Upstream AI provider request failed.' });
  }
}
