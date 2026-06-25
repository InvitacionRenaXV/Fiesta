## Changes to implement

### Goal

- Re-enable the section glow/sparks without scroll jank on mobile.
- Make Hero banner effects fluid on mobile.
- Lighten Playlist scroll on mobile by reducing heavy animations/shadows.

### Implementation details

1. `src/components/Reveal.module.css`
   - Keep glow, but reduce cost on mobile:
     - Smaller blur (or remove blur) for `.reveal::before`.
     - Disable `atmosphereBreathe` animation on `max-width: 768px`.
     - Disable spark twinkle animation on `max-width: 768px` and set static opacity.
     - Respect `prefers-reduced-motion` (disable animations entirely).

2. `src/components/Hero.module.css`
   - Make sparkle particles + glow not fight with scrolling on mobile:
     - On `max-width: 768px`, disable hero shimmer/textGlow and drift smoke animations (or reduce them) and reduce blur.
     - Remove scroll-coupled transforms by making CSS-only fallback; JS still sets transforms but we can cap effects with reduced opacity.

3. `src/components/Playlist.module.css`
   - Reduce weight on mobile:
     - On `max-width: 768px`, reduce note animation frequency (or disable `noteTwinkle`) and reduce `filter: drop-shadow(...)` intensity.
     - Also add `will-change: transform` only if animation remains.

### Dependent files

- `src/components/Reveal.module.css`
- `src/components/Hero.module.css`
- `src/components/Playlist.module.css`

### Testing

- Run dev server
- Test mobile scroll (<=768px) in Safari/Chrome, verify no jank.
