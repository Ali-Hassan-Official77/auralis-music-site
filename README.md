# Auralis

Next.js 16 + Tailwind music web app (Audius catalogue).

## Setup
1. Create `.env.local`:
   ```
   AUDIUS_APP_NAME=Veyra
   AUDIUS_API_KEY=
   AUDIUS_BEARER_TOKEN=
   ```
   Optional: `NEXT_PUBLIC_SITE_URL` (your domain, for metadata) and `NEXT_PUBLIC_CONTACT_EMAIL` (enables the contact form).
2. `npm install`
3. `npm run dev` (or `npm run build && npm start`)

Site name, tagline and description live in `lib/site.ts`.
