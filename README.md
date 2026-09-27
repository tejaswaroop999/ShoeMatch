# ShoeMatch

ShoeMatch helps people choose shoes from their own closet using simple, explainable rule-based matching.

## Features

- Local shoe closet with add, edit, delete, image compression, and filters
- Outfit preview, color and occasion selection
- Best match and alternative recommendations
- Explainable rule-based reasons
- Local feedback and bounded personalization
- Local match history
- Analytics abstraction ready for a future provider
- Shopping placeholder with no fake products or prices

## Current MVP limitations

- Outfit photos are not automatically analyzed
- No cloud accounts or database
- Photos and data stay in browser storage
- No live shopping products or affiliate links
- Matching is metadata-driven and rule-based

## Tech stack

Next.js App Router, TypeScript, Tailwind CSS, React hooks, localStorage, and Lucide icons.

## Local Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run build
npm start
```

## Deployment

1. Push this repository to GitHub.
2. Import the repository into Vercel.
3. Let Vercel detect Next.js automatically.
4. Use `npm run build` as the build command.
5. Vercel handles the production start command.

No environment variables are required for the current MVP. The `.env.example` file only documents future integrations; do not add secrets to the repository.

## Privacy

Photos, shoes, feedback, and history remain on the current device in the MVP. No images are sent to a server or external AI service.

## Future Roadmap

- AI outfit detection with explicit privacy and cost review
- Cloud sync and accounts
- Deeper personalization
- Verified real shopping recommendations
- Affiliate links
- Subscriptions and Pro limits
