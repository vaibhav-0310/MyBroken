# MyBroken

🌸 Building Technology That Heals: My Latest Project 💔→💚

Sometimes the most meaningful code isn’t about raw performance — it’s about being there for someone in their hardest hour. I built an AI-powered emotional support companion that listens, understands, and responds like a caring friend. It speaks in Hinglish, validates feelings, comforts without judgment, and is designed to create a safe space for vulnerability and healing.

What it does

Empathetic conversation: validates emotions, offers gentle guidance, and mirrors a friend’s tone.
Hinglish-first voice: communicates naturally in Hinglish so people feel heard and understood.
Always-on fallback: integrates multiple LLMs (DeepSeek, Perplexity, Gemma) via OpenRouter so the app stays available even if one model is slow or unavailable.
Voice support: uses the Web Speech API for speech-to-text and text-to-speech to make late-night check-ins feel more human.
Safety-first: focuses on empathetic responses and signposts to professional resources when necessary.

Why this matters
People aren’t just users — they’re humans with real feelings. This project reminded me that great software holds space for emotion. When someone’s heart is breaking at 2 AM and there’s no one to talk to, technology can be that warm presence that listens, comforts, and helps them begin to heal.
## Overview

- client: Vite + React front-end (sources in `client/src`).
- server: Node server (likely Express) serving API routes in `server/routes/` and entry in `server/src/server.js`.

## Prerequisites

- Node.js (recommended >= 16). Install from https://nodejs.org/
- A code editor (e.g., VS Code)

Note: The `server/` folder uses an `.env` file (an `.env` is included in the repository). Verify or update values in `server/.env` before starting the server.

## Repository structure

- client/
  - package.json — front-end dependencies and scripts
  - src/ — React source files
  - public/ — static assets
- server/
  - package.json — back-end dependencies and scripts
  - src/server.js — server entry
  - routes/openrouter.routes.js — example routes
  - .env — environment variables for server

## Running locally (PowerShell)

Open two separate PowerShell terminals — one for the client, one for the server.

1) Start the client

```powershell
cd client
npm install
npm run dev
```

- Assumption: The client uses Vite and exposes a `dev` script (common names: `dev` or `start`). If `npm run dev` fails, open `client/package.json` and use the script name listed under `scripts` (for example `start`).

2) Start the server

```powershell
cd server
npm install
# If the project has a dev script (e.g. using nodemon):
npm run dev
# Otherwise, use:
npm start
```

- The server reads configuration from `server/.env`. Typical values to check: `PORT` and any API keys. Adjust them as needed.

3) Run both concurrently

Open two terminals and run the commands above in their respective directories. Alternatively, use a process manager (concurrently, npm-run-all) if you prefer a single command — those are not added by default.

## Build / Production

To build the client for production (if using Vite):

```powershell
cd client
npm run build
# Then serve the built `dist/` with a static server or integrate with the backend.
```

To start the server in production, use the script defined in `server/package.json` (for example `npm start`).

## Environment variables

- There is a `server/.env` file in the repository root under the `server` folder. Do not commit secrets. If you need to provide an API key or other secret, add it to `server/.env` or a suitable secret manager.

## Troubleshooting

- If `npm install` fails: verify your Node.js version and permissions. Try clearing `node_modules` and re-running `npm install`.
- If `npm run dev` is not defined: inspect `package.json` and run the script name present under `scripts`.
- Port conflict: if the front-end or server port is already in use, change the port in the corresponding config or `.env`.

## Next steps / Suggestions

- Add a root-level `README.md` (this file) — done.
- Add a `server/.env.example` listing required variables without secrets.
- Add `concurrently` or `npm-run-all` if you want a single command to start both services.
- Add basic health-check endpoints and tests for the server.

## Contributing

Contributions welcome. Open issues or pull requests with a clear description of the change.

---

Created by the project maintainer.
