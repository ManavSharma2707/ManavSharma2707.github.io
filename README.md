# Dashboard

The interactive companion to the [profile README](https://github.com/ManavSharma2707/ManavSharma2707). Built with Vite, React, TypeScript, Tailwind CSS, Framer Motion, Recharts and d3-force.

Live at [manavsharma2707.github.io](https://manavsharma2707.github.io).

## Development

```bash
npm install
npm run sync   # pulls metrics.json and design tokens from the profile repo
npm run dev
```

`npm run sync` requires network access to fetch the profile repo's public `assets/generated/metrics.json` and `design/tokens.json`. A seed `public/metrics.json` is committed so `npm run dev` works without running sync first.

## Deployment

`.github/workflows/deploy.yml` runs `npm run sync` then builds and deploys to GitHub Pages, on push to `main`, daily, and on manual dispatch.
