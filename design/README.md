# Cadence Console

Product UI for an inference optimization service. The customer supplies a
model and the hardware it has to run on; we measure it there, search for a
faster system configuration, and return that configuration.

We do not host inference. The output is a config file the customer applies
to their own runtime, which is why `Config.dc.html` is the centre of the
product rather than any serving dashboard.

## Console (canvas page 1)

The product surface. The deliverable is a **configuration**, not hosted
inference — we never run the customer's model in production.

1. **`Main.dc.html`** — Runs. Every model x board pairing, with speedup and
   guard outcome. Includes a rejected run (2.41x discarded for dropping task
   success to 91.2%) because refusing a fast-but-broken config is the point.
2. **`Config.dc.html`** — the configuration itself, as `cadence.yaml`:
   precision map, draft head, placement, graph capture, guard result.
   Versioned, with a `cadence verify` command so the customer can reproduce
   the claim on their own board.
3. **`Targets.dc.html`** — boards available to benchmark on. The scarce
   resource is physical silicon, not datacentre GPUs: a search over 1,284
   configurations is 1,284 compiles and timed runs on real boards.

## Run flow (canvas page 2)

The pitch narrative: `Intake.dc.html` -> `Optimizing.dc.html` ->
`Result.dc.html`. Three beats — what you give us, us working, the number.
Rows on the result screen toggle and the number recomputes.

## Under the hood (canvas page 3)

**`Kernels.dc.html`** — per-op candidate leaderboard, numerics gate,
generated kernel source, search convergence. Deliberately off the main
flow; fused kernels are marked `preview` in the config file.

`canvas.json` lays out all three pages and opens on the console.

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
  --artboard Main.dc.html --artboard Config.dc.html \
  --artboard Targets.dc.html --artboard Intake.dc.html \
  --artboard Optimizing.dc.html --artboard Result.dc.html \
  --artboard Kernels.dc.html \
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
