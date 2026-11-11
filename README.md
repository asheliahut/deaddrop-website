# deaddrop.rip

Website and documentation for [deaddrop](https://github.com/asheliahut/deaddrop), live at **<https://deaddrop.rip>**.

Built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build).

## Develop

```sh
npm install
npm run dev        # http://localhost:4321
npm run check      # type-check
npm run build      # static site in ./dist
npm run preview    # serve ./dist
```

## Layout

| Path | What |
| --- | --- |
| `src/pages/index.astro` | Custom landing page (`/`) |
| `src/components/` | Terminal animation and flow diagram (the diagram is reused in the docs) |
| `src/content/docs/docs/` | Documentation pages (`/docs/...`), Markdown/MDX |
| `astro.config.mjs` | Site config and the docs sidebar |
| `src/styles/theme.css` | Starlight theme (colors, fonts) |
| `src/site.ts` | Shared links and the version shown in install snippets |
| `public/CNAME` | Custom domain for GitHub Pages |
| `scripts/og.svg` | Source for `public/og.png`: `node -e "require('sharp')('scripts/og.svg').png().toFile('public/og.png')"` |

When deaddrop ships a new release, bump `VERSION` in `src/site.ts` and the
`VERSION=` lines in `src/content/docs/docs/installation.mdx`. (The Homebrew
tap updates itself on every stable release, so its snippets need no bump.)

## Deploy

Every push to `main` builds and deploys to GitHub Pages via
`.github/workflows/deploy.yml`. Pull requests only build and type-check.

One-time repository setup:

1. **Settings → Pages → Build and deployment → Source:** GitHub Actions.
2. **Custom domain:** `deaddrop.rip`, then tick **Enforce HTTPS** once the certificate is issued.
3. DNS for the apex `deaddrop.rip`: `A` records to `185.199.108.153`, `185.199.109.153`,
   `185.199.110.153`, `185.199.111.153` (optionally `AAAA` to
   `2606:50c0:8000::153` through `2606:50c0:8003::153`). Add `www` as a `CNAME`
   to `asheliahut.github.io` if you want it to redirect.

Workflow actions are pinned in `.github/workflows/actions.lock`; run
`gh actions-lock` after changing a workflow.

## License

Public domain, see [LICENSE](LICENSE).
