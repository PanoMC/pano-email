# Pano Email Layout

The shared layout of every Pano mail, built with React Email and compiled to Handlebars
(`dist/handlebars/layout.hbs`). It contains no language text; the per-mail texts live in the
platform's and plugins' `mail-templates/` folders and are editable from the panel.

## Getting Started

First, install the dependencies:

```sh
bun install
```

Then, run the development server:

```sh
bun run dev
```

Open [localhost:5000](http://localhost:5000) with your browser to see the result.

## Building

Build Handlebars templates:

```sh
bun run build:handlebars
```

The templates will be generated in `dist/handlebars/` directory.

## Layout slots

`{{subject}}`, `{{preheader}}`, `{{{content}}}`, `{{buttonLabel}}` + `{{buttonUrl}}`,
`{{{footer}}}`, `{{websiteLogo}}`, `{{websiteName}}`, `{{websiteUrl}}`, `{{year}}`, `{{locale}}`.

## Releases

Releases are automatically created when you push a tag or use the workflow dispatch:

### Using Tags

```sh
git tag v1.0.0
git push origin v1.0.0
```

### Using Workflow Dispatch

1. Go to Actions tab in GitHub
2. Select "Build and Release" workflow
3. Click "Run workflow"
4. Enter version tag (e.g., `v1.0.0`)
5. Click "Run workflow"

The workflow will:
1. Build Handlebars templates
2. Create a zip archive
3. Create a GitHub release with the templates

## License

MIT License
