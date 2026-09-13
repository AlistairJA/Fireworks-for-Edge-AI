# Cadence Console — product UI design

Four interactive artboards for a hardware-aware profiler and optimizer for
embodied-model inference. The loop they describe:

1. **Intake** (`Main.dc.html`) — point at a checkpoint, name the board it has
   to run on, declare what we're beating and the task-success floor.
2. **Baseline** (`Baseline.dc.html`) — the model measured untouched on that
   board. This is the benchmark; everything downstream is relative to it.
3. **Optimize** (`Optimize.dc.html`) — four search loops (auto-quantization,
   auto speculative decoding, auto scaling, fused kernel bench) and the
   speedup against the baseline. Passes toggle; the waterfall recomputes.
4. **Kernel bench** (`Kernels.dc.html`) — per-op candidate leaderboard, the
   numerics gate, generated kernel source, and search convergence.

`canvas.json` lays the artboards out and sets the launch view.

## Status

Design mockup. "CADENCE" is a placeholder product name. The figures are
plausible for a ~3.3B VLA on a Jetson Orin NX but are illustrative, not
measured.

## Rebuilding the canvas

The artboards are the source. The published bundle is generated and
gitignored. Reseed it with the `design` skill's helper:

```
node <skill>/seed-canvas.mjs \
  --template <skill>/payload.template.html \
  --out cadence-console.html \
  --title "Cadence Console" \
  --artboard Main.dc.html --artboard Baseline.dc.html \
  --artboard Optimize.dc.html --artboard Kernels.dc.html \
  --canvas canvas.json
```

Then check it with `--check cadence-console.html` before publishing.

## Palette

Dark instrument panel. The five categorical series colours
(`#0099c4 #c26f00 #956ed2 #2e9e52 #c35c9b`) pass lightness-band, chroma,
CVD-separation, normal-vision and contrast checks as a set against the dark
surface. Status colours (`#5ddb8a #e8b84b #f2685c`) are reserved and always
ship with an icon or label, never colour alone. `#ccff4d` is chrome-only
(primary action, focus, active nav) and is never used as a data series.
