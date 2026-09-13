# Cadence

UI for an edge-inference optimization service.

A customer gives us a model and the hardware it has to run on. We measure the
model on that board untouched, search for a faster system configuration, and
return the configuration. We do not host inference — the output is a config
file the customer applies to their own runtime.

> **This is a UI mockup.** There is no backend. Every number on these pages is
> illustrative, not measured, and "CADENCE" is a placeholder name.

## Run it locally

No build step, no dependencies. Either works:

**Open the file directly**

```
git clone https://github.com/AlistairJA/Fireworks-for-Edge-AI.git
cd Fireworks-for-Edge-AI
open index.html          # macOS   (Linux: xdg-open, Windows: start)
```

**Or serve it** — closer to how it would really be hosted:

```
python3 -m http.server 8000
# then visit http://localhost:8000
```

Any static server works (`npx serve`, `php -S localhost:8000`, Caddy, nginx).
To publish it, turn on GitHub Pages for this branch with `/` as the source.

## Pages

| Page | What it shows |
|---|---|
| `index.html` | Runs — every model × board pairing, with speedup and guard outcome |
| `configurations.html` | The deliverable, rendered as `cadence.yaml` |
| `targets.html` | Boards available to benchmark on — the real bottleneck |
| `new-run.html` | Intake: pick a model and a board |
| `running.html` | A run in progress, four search loops |
| `result.html` | The speedup, with each optimization toggleable |
| `kernels.html` | Kernel autotuner: candidates, numerics gate, generated source |

`new-run.html` → `running.html` → `result.html` is the demo path.

## What actually works

The pages are static, but a few things respond:

- **`result.html`** — toggle any optimization off and the speedup, control
  rate, cycle time and accuracy guard all recompute. Turn enough off and the
  guard flips to breached.
- **`index.html`** — the All / Running / Done / Rejected tabs filter the table.
- **`new-run.html`**, **`configurations.html`**, **`kernels.html`** — hardware
  tiles, version chips and op rows select.

Everything else is presentational. Links navigate between pages; buttons that
would hit a backend do nothing.

## Layout

```
index.html, *.html     the pages, no framework
assets/app.css         all styling, design tokens at the top
assets/app.js          the handful of interactions above
assets/favicon.svg
design/                the design canvas these pages were drawn from
```

Fonts load from Google Fonts. Offline they fall back to system faces and the
layout still holds.

## Design source

`design/` holds the multi-artboard canvas the pages came from, plus a README
covering how to reseed and republish it. Edit the canvas for design work; edit
the HTML for the site.
