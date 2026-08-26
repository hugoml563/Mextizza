# UI kit — Sitio web propio

The own website the business plan commits to in Phase 1: a shopfront plus online ordering, no third-party app.

**Files**
- `index.html` — the interactive home. Add items from the menu, open the cart drawer, run through checkout to a confirmed order.
- `WebSurfaces.jsx` — header, hero, menu grid, process section, catering section, social row, footer.
- `CartDrawer.jsx` — the cart → checkout → confirmation drawer.
- `../menu-data.js` — the closed menu and the operational facts, shared with the app kit.

**Screens / states covered:** home, menu with add-to-cart, process explainer, catering request form, cart with quantity editing, checkout form, order confirmation.

## Honest caveat

**This is not a recreation — there was nothing to recreate.** Mextizza has no website, no codebase and no Figma file yet; the only visual source is the identity mockup. So this kit is a *faithful application* of the documented foundations to the surfaces the business plan names, not a copy of an existing design. Everything visual here traces to a token or a device that exists in `sources/mockup_completo_v11.html`:

- Negro carbón header and footer with the tape stripe as the edge.
- Colo Pro for the wordmark and headlines, Bungee for eyebrows and badges, Oswald for everything else.
- The three card species only — no new card style was invented.
- The dashed rule appears only on menu rows, as in the source.
- Product photography is left as a labelled placeholder, because none was supplied.

Where the plan does not specify something (payment methods copy, delivery-fee amount, order numbers), it is filled with an obvious placeholder rather than an invention presented as fact.
