# Build Doctor

A simulated Alexa+ style voice assistant for developers. Ask "Why did my build fail?" and it reads the failed CI log, finds the failing line, explains the cause in plain words and suggests a fix, on screen and spoken aloud.

Built for the Build, Ship, Shape: Amazon Developer Hackathon (Alexa+ track, simulated experience, AWS Builder mini challenge).

## Run it (no setup)
1. Download this folder.
2. Open `index.html` in Chrome.
3. Pick a sample log, tap **Ask by voice** (or **Why did it fail?**).

This mode uses built-in rules, so it works offline.

## Run it with AI (Amazon Bedrock + Claude)
1. Install Node.js 18+.
2. `npm install`
3. Set your AWS credentials and a Claude model enabled in Bedrock:
   `export AWS_REGION=us-east-1 BEDROCK_MODEL_ID=<your-claude-model-id>`
4. `npm start`, then open http://localhost:3000

If Bedrock is unavailable, the app falls back to the built-in rules.

## How it works
- `index.html`: voice input (Web Speech API), log view with the failing line highlighted, spoken reply.
- `server.js`: sends the log to Claude through the Bedrock Converse API and returns cause and fix.

## License
MIT
