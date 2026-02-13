# AIEduLab

A curated resource hub for teacher educators, researchers, and academics who train K-12 teachers on AI literacy. Built for the university and PhD level, with content that filters down to classroom practitioners.

## Stack

- [SvelteKit 2](https://svelte.dev/docs/kit) + [Svelte 5](https://svelte.dev/docs/svelte) (runes)
- [Tailwind CSS 4](https://tailwindcss.com/) (CSS-first configuration)
- [mdsvex](https://mdsvex.pngwn.io/) for Markdown content
- TypeScript + Zod for type safety
- Static site via [`adapter-static`](https://svelte.dev/docs/kit/adapter-static)
- Deployed to Cloudflare Pages

## Getting Started

```sh
bun install
bun run dev
```

## Scripts

| Command           | Description                  |
| ----------------- | ---------------------------- |
| `bun run dev`     | Start dev server             |
| `bun run build`   | Build static site            |
| `bun run preview` | Preview production build     |
| `bun run check`   | Type-check with svelte-check |
| `bun run lint`    | Lint with Prettier + ESLint  |
| `bun run format`  | Auto-format all files        |

## Content

Articles and videos live as Markdown files in `src/content/`. Frontmatter is validated with Zod at build time. Tag pages are generated statically.

```
src/content/
  articles/    # Long-form written content (.md)
  videos/      # Video resource pages (.md)
```

## CI/CD

- **GitHub Actions** runs lint + type-check + build on every push and PR
- **Cloudflare Pages** handles deployment automatically on push to `main`

## Pre-commit Hooks

[Husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/lint-staged/lint-staged) run automatically on commit:

- `*.{js,ts,svelte}` &rarr; ESLint fix + Prettier
- `*.{css,md,html,json,yaml,yml}` &rarr; Prettier
