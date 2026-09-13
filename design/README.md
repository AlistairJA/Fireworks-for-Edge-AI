# Cadence Console — MVP demo UI

Product UI for a hardware-aware profiler and optimizer for embodied-model
inference. Built to be shown, not to be exhaustive: you hand over a
checkpoint and name the board it has to run on, we time it there, and we
beat that number.

## Demo flow (canvas page 1)

1. **`Main.dc.html`** — one model input, three hardware tiles, one button.
2. **`Optimizing.dc.html`** — four search loops running, speedup climbing,
   configs rejected on accuracy shown alongside configs tried.
3. **`Result.dc.html`** — the speedup against the baseline, before/after
   control rate, and four plain-English rows for what changed. Each row
   toggles; the number recomputes.

## Under the hood (canvas page 2)

**`Kernels.dc.html`** — per-op candidate leaderboard, numerics gate,
generated kernel source, search convergence. Deliberately off the main
flow: it answers "how do you get the last few milliseconds", which is a
follow-up question, not the pitch.

`canvas.json` lays out both pages and opens on the demo flow.

## Status

Design mockup. "CADENCE" is a placeholder product name. The figures are
plausible for a ~3.3B VLA on a Jetson Orin NX but are illustrative, not
measured — replace them with a real run before showing this to anyone.

## Rebuilding the canvas

The artboards are the source; the published bundle is generated and
gitignored. Reseed with the `design` skill's helper:

```
node <skill>/seed-canvas.mjs \
  --template <skill>/payload.template.html \
  --out cadence-console.html \
  --title "Cadence Console" \
  --artboard Main.dc.html --artboard Optimizing.dc.html \
  --artboard Result.dc.html --artboard Kernels.dc.html \
  --canvas canvas.json
```

Then `--check cadence-console.html` before publishing.

## Palette

Dark, near-neutral ground with a single lime accent (`#ccff4d`) reserved
for chrome — primary action, focus, active state — and never used as a
data series. Status colours (`#5ddb8a` good, `#e8b84b` warning, `#f2685c`
critical) always ship with an icon or label, never colour alone.

The kernel-bench screen additionally uses a five-slot categorical series
palette (`#0099c4 #c26f00 #956ed2 #2e9e52 #c35c9b`), validated as a set
against the dark surface for lightness band, chroma floor, colour-vision
separation, normal-vision separation and contrast.
