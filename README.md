# foundersdojo.fund

A Vercel-ready Next.js site for Founder's Dojo Fund, rebuilt around the June 2026 residency and backed by a local import of the latest Squarespace XML export.

## Run locally

```bash
npm install
npm run dev
```

## Refresh the XML import

```bash
npm run import:xml
```

That command:

- parses `content library/Squarespace-Wordpress-Export-04-22-2026.xml`
- regenerates `lib/generated/squarespace-import.json`
- downloads the linked Squarespace media into `public/media/squarespace/`

## Quality checks

```bash
npm run lint
npm run build
```

## Public routes

- `/`
- `/residency`
- `/community`
- `/locations`
- `/initiatives`

## Content sources used

- `content library/Squarespace-Wordpress-Export-04-22-2026.xml`
- `content library/Old FoundersDojo Home Page.pdf`
- `content library/The Real Life Erlich Bachman of Silicon Valley _ by Sam Parr _ Medium.pdf`
- `https://thehustle.co/the-real-erlich-bachman-of-silicon-valley/`
- `https://rishisachdev.net/`
- `https://www.talkdoc.com/about`

## Notes

- The new site keeps the residency as the main program while using the XML archive for proof, locations, initiatives, and photography.
- The XML filler posts and the legacy terms page are imported into the manifest but excluded from the public experience.
- `content library/Profile-1.pdf` remains excluded from site copy.
