## Plan: Re-add glow without mobile scroll jank

### Information gathered

- Mobile uses native scroll (App.jsx returns early for width <= 768), so the jank is likely caused by animated/blurred glow layers rather than Lenis.
- `Reveal` component already adds an atmospheric glow behind each section (`Reveal.module.css`), and also adds spark particles unless `excludeSparks` is passed.
- `Hero` has multiple glow-like effects: spark particles, blur smoke layers, and also uses scroll-coupled inline styles via `var(--scroll-y, 0)` (Hero.jsx), plus mouse-coupled transform.
- Several components use `filter: drop-shadow(...)` and `box-shadow`.

### Hypothesis

The scroll jank on mobile comes from:

- heavy `filter: blur(...)` layers (Hero smoke) and/or animated particles.
- scroll-coupled transforms (`var(--scroll-y)`) on mobile if `--scroll-y` is updated continuously.

### Plan

1. Ensure spark/atmosphere glow doesn’t animate “breathing” or twinkle on mobile:
   - Update `src/components/Reveal.module.css` to reduce motion at `max-width: 768px` and with `prefers-reduced-motion`.
   - Keep glow static (opacity only) and keep layout stable.
2. Add a “low-cost glow” mode for mobile in `Reveal` (no layout/overflow changes):
   - Reduce blur and animation intensity on mobile.
3. Confirm Hero doesn’t introduce scroll-coupled glow on mobile:
   - If needed, add a mobile-only CSS override to reduce text glow animation frequency or disable twinkle.
   - But the first target is `Reveal` because it’s used across sections and includes spark particles.
4. Add `prefers-reduced-motion` handling:
   - Disable the `atmosphereBreathe` and `twinkle` keyframe animations.
5. Re-test mobile scroll smoothness.

### Dependent files to edit

- `src/components/Reveal.module.css`
- (Optional) `src/components/Hero.module.css`

### Follow-up steps

- Run `yarn dev` (or `npm run dev`) and test scroll on a mobile-sized viewport.
- Verify no horizontal scrolling/extra overflow caused by glows.
