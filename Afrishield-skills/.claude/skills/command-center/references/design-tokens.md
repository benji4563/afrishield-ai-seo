# Command Center design tokens — black theme

Owner preference: **black**. The dashboard is pure-black, high-contrast,
with green reserved for "live/activity" signals only.

```css
:root{
  --bg:#000000;        /* page background — true black, non-negotiable */
  --panel:#0a0a0a;     /* cards */
  --panel2:#111111;    /* hover rows */
  --border:#1f1f1f;    /* card borders */
  --border2:#2a2a2a;   /* stronger borders, badges */
  --text:#f5f5f5;      /* primary text */
  --sec:#9a9a9a;       /* secondary text */
  --mut:#5c5c5c;       /* muted labels */
  --live:#22c55e;      /* live indicator green — pulses, glows */
  /* pie slice palette, in order: */
  --c1:#22c55e; --c2:#3b82f6; --c3:#eab308; --c4:#ef4444;
  --c5:#a855f7; --c6:#14b8a6; --c7:#f97316; --c8:#64748b;
}
```

Rules:

- Font: `'Segoe UI', -apple-system, Roboto, sans-serif`. Headings 700–800
  weight; section titles are 12px uppercase letterspaced (`.12em`) in `--sec`.
- `● LIVE` badge: black text on `--live` background, `pulse` keyframe
  (opacity .55 at 50%, 1.6s loop). Idle badge: muted outline only.
- Live viewer event colors: user = blue (`--c2`), assistant = green
  (`--live`), tool run = yellow (`--c3`); 2px left border + uppercase label.
- Bars: dark gray gradient with a light bottom edge; today's bar switches to
  a green gradient (`#166534 → #052e16`) with `--live` bottom edge.
- Pie: SVG donut, 2px black stroke between slices, black 40px-radius center
  hole with the total count centered in white, 800 weight.
- No external assets, fonts, or chart libraries — everything must render
  offline from the single HTML file.
