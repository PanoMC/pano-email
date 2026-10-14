# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`pano-email` holds the **shared mail layout** (`emails/layout.tsx`) of the `pano-web-platform`
backend: logo header, white card, primary button, muted footer. It is authored with **React 19 +
`@react-email/components` + Tailwind**, but the backend does **not** consume React — the
`build:handlebars` step compiles it to `dist/handlebars/layout.hbs`, which is committed into the
platform as `Pano/src/main/resources/mail/layout.hbs`.

The layout holds **no language text**, only Handlebars slots: `{{subject}}`, `{{preheader}}`,
`{{{content}}}`, `{{buttonLabel}}` / `{{buttonUrl}}`, `{{{footer}}}`, `{{websiteLogo}}`,
`{{websiteName}}`, `{{websiteUrl}}`, `{{year}}`, `{{locale}}`. The per-mail, per-language texts are
no longer here: they live in the platform's and each plugin's `mail-templates/<key>/<variant>/<locale>.hbs`
and are editable from the panel. Emit raw Handlebars with `components/Raw.tsx` (`<Raw hbs="{{{content}}}" />`). The backend fetches these (as a release zip) via its `downloadMailTemplates` Gradle task.
See `../CLAUDE.md`. (`website-mail` is the equivalent template set for `website-back-end`.)

## Commands

```bash
bun install
bun run dev                # react-email preview server on port 5000
bun run build              # react-email build
bun run build:handlebars   # compile templates → Handlebars (scripts/build-handlebars.ts) — what the backend uses
bun run export             # export static HTML
```

## Conventions

- Author/preview in React; **always run `build:handlebars`** and check the Handlebars output, since
  that — not the React source — is what ships to the backend.
- Releases via **semantic-release** on `alpha`/`beta`/`main` → use **conventional commits**.
