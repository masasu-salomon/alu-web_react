# Task 0 - Basic Webpack setup

A basic Webpack installation that bundles jQuery and injects three paragraphs
into the page body.

## Setup

```bash
npm install
```

## Build

Webpack uses its default configuration (no custom config file). The entry point
is `src/index.js` and the bundle is emitted to `dist/main.js`.

```bash
npx webpack --mode production
```

Then open `dist/index.html` in a browser. It imports the generated `main.js`,
which uses jQuery to append:

- Holberton Dashboard
- Dashboard data for the students
- Copyright - Holberton School
