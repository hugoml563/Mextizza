# UI kit — App propia

The own ordering app for repeat local customers, the third Phase 1 channel in the business plan.

**Files**
- `index.html` — five phone screens side by side, all interactive and wired to shared state.
- `AppScreens.jsx` — `Phone` frame, `StatusBar`, `TabBar`, and the five screens.
- `../menu-data.js` — shared menu and facts.

**Screens:** welcome/login · menu browse · product detail with quantity · cart + delivery form · order tracking.

Design viewport is **390×844**. Tap targets on the phone screens use `size={44}` steppers and `size="lg"` buttons, per the 44px minimum.

## Honest caveat

Same as the web kit: **no app exists**, so this is the documented brand applied to the flows the plan requires, not a recreation. The tab bar, tracking timeline and status bar are the only structures with no direct antecedent in the sources — they are unavoidable for an ordering app, and are built from brand primitives only (negro carbón ground, rosa active state, tape stripe as the top edge, Bungee micro-labels). No new colours, radii or shadows were introduced.

Product photography is a labelled placeholder throughout.
