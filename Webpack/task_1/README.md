# Task 1 - Webpack with a config file

Uses a `webpack.config.js` to bundle jQuery and Lodash into `public/bundle.js`.

## Setup

```bash
npm install
```

## Build

```bash
npm run build
```

This runs webpack (mode `production`) with `js/dashboard_main.js` as the entry
point and emits `public/bundle.js`.

## Behaviour

Open `public/index.html`. The bundle uses jQuery to append:

- Holberton Dashboard
- Dashboard data for the students
- A `Click here to get started` button
- `<p id='count'></p>`
- Copyright - Holberton School

Clicking the button calls `updateCounter()` (debounced with Lodash), which
increments a counter and updates `#count` to `{count} clicks on the button`.
