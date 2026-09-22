# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`pano-email` holds the **transactional email templates** for the `pano-web-platform` backend
(account confirmation, password reset, notifications, …). Templates are authored with **React 19 +
`@react-email/components` + Tailwind**, but the backend does **not** consume React — the
`build:handlebars` step compiles them to the **Handlebars** templates the platform renders at
runtime. The backend fetches these (as a release zip) via its `downloadMailTemplates` Gradle task.
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
