AI Integration (Adwoa)
========================

This project ships a small serverless proxy and a front-end integration so Adwoa (the dietary assistant) can use an external AI provider (Vercel AI, OpenAI, etc.) without exposing API keys to the browser.

Quick setup
-----------

1. Add environment variables in your Vercel project (or use `vercel dev` locally):

   - `AI_API_URL` — upstream API URL (e.g. `https://api.vercel.ai/v1/generate` or OpenAI chat endpoint)
   - `AI_API_KEY` — bearer token for the provider

   See `.env.example` for a template.

2. Deploy to Vercel (recommended): the file `api/adwoa.js` is a serverless function that forwards requests to the configured provider.

Local development notes
-----------------------

- The Vite dev server does not run Vercel serverless functions by default. To run the serverless function locally, use `vercel dev` from the repository root (requires the Vercel CLI and login).
- Alternatively, temporarily replace the client call to `/api/adwoa` with direct calls to your provider (not recommended because it exposes keys).

How it works
------------

- Frontend: `src/components/AiAssistant.tsx` calls `/api/adwoa` with a chat-style payload (system message + user message).
- Serverless proxy: `api/adwoa.js` forwards the request body to the configured `AI_API_URL` with `Authorization: Bearer <AI_API_KEY>` and extracts a sensible `text` field from common response shapes.
- Fallbacks: If the upstream provider fails, `AiAssistant` falls back to local rule-based responses from the knowledge base.

Provider tips
-------------

- For Vercel AI: set `AI_API_URL` to the Vercel AI endpoint documented by Vercel and add the corresponding API key in `AI_API_KEY`.
- For OpenAI: set `AI_API_URL` to `https://api.openai.com/v1/chat/completions` and `AI_API_KEY` to your OpenAI API key. The proxy will forward the `messages` array and `model` if provided.

Security
--------

- Keep `AI_API_KEY` secret; never embed it in client-side code. Use the Vercel project environment variables UI or secrets management.

Next steps
----------

- (Optional) Add streaming responses to the assistant for a better UX.
- (Optional) Add server-side rate-limiting or caching for heavy use.
