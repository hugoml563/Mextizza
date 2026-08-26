# Mextizza — Design System

**Mextizza** is a **dark-kitchen pizzería** in Col. Lomas Lindas, Atizapán de Zaragoza, Estado de México (CP 52947). Founders: Hugo Martínez (logistics & commercial strategy) and Ricardo Rodríguez (executive chef & product). Official launch: **1 September 2026**.

The product is **stone-oven pizza with 48-hour cold fermentation** — the business plan calls the dough "estilo Nueva York", but the delivered menu sheet says only *horno de piedra*, so customer-facing copy uses **horno de piedra** (`MEXTIZZA_FACTS.estilo`) — Italian technique, Mexican identity and ingredients. The positioning line the business plan repeats is *"Técnica italiana · Alma mexicana"*, and the brand tagline is **"Horneada como allá, gozada como acá."**

Name is always written in title case — **Mextizza**, only the M capitalised. Never MEXTIZZA in body copy, never mextizza.

## Business context that shapes the design

- **Delivery-first, no dining room.** Every surface is a delivery surface. There is no "reserve a table", no venue photography, no host stand. The competitive gap the plan identifies is precisely that no local artisanal pizzería is built delivery-first.
- **Direct channels only in Phase 1:** WhatsApp Business with an automated digital menu, an own website, and an own app for repeat local customers. Third-party apps (UberEats, Rappi, DiDi Food) are an explicitly *conditional* Phase 2 — do not design for them.
- **Catering is a separate, weekend product.** Live Gozney XL oven on site, $235 MXN per person, minimum 20 / maximum 30 people, 30% deposit, 4 days' minimum notice. It is a premium in-person format, not delivery.
- **48h lead time on dough** and a 3 km core delivery radius (5 km hard cap) are real constraints that belong in the copy of any ordering flow.
- **Menu is closed** (see "Menu data" below). Twelve products: five pizzas, four in the monthly special block, three postres/bebidas.

## Sources given to me

All of the following were provided as a mounted local folder named `drive-download-20260824T224740Z-1-001` (a Google Drive export). Nothing here came from a Figma file or a code repository — **there is no existing product codebase**.

| Source file | What I took from it |
|---|---|
| `mockup_completo_v11.html` | **The visual ground truth.** A single-page identity exploration: palette swatches with Spanish names and rationale, brand lockup + variants, packaging & menu mockups, social tiles. All colours, type roles, radii, borders and the tape-stripe texture in this system are lifted verbatim from it. It also carried **Colo Pro** embedded as a base64 OTF, which I extracted to `assets/fonts/ColoPro-Regular.otf`. |
| `Mextizza_Plan_de_Negocios_Final.docx` | Business model, channels, menu, catering rules, delivery radius, launch timeline, risks, brand identity section (canonical hexes and wordmark colour split). Extracted to `sources/Mextizza_Plan_de_Negocios_Final.txt`. |
| `Mextizza_Resumen_Ejecutivo.docx` | Costing, pricing methodology, break-even, cash flow. Extracted to `sources/Mextizza_Resumen_Ejecutivo.txt`. |
| `Mextizza plan financiero.xlsx` | **Not read.** The two Word documents already summarise its outputs; the raw model was not needed for design decisions. |
| Logo SVG/PNG set (14 files) | Copied verbatim into `assets/`. See "Iconography & assets". |
| `Menú Mextizza.svg` / `.png` | The printed menu artwork. Copied into `assets/`. |

Copies of the source HTML and the extracted document text live in `sources/` so a reader without Drive access can still check my work.

---

## CONTENT FUNDAMENTALS

**Language is Spanish (Mexico).** Not neutral LatAm Spanish — regional and specific. English words appear only where the industry already uses them and the founders do: *dark kitchen*, *delivery*, *catering*, *starters*, *mains*, *food cost*, *POS/KDS*. Do not translate those into Spanish for the sake of purity; the plan itself writes "Starters / Mains / Postre" as menu categories.

**Voice: a craftsperson stating facts, not a restaurant selling romance.** The strongest copy in the source material is technical and unembellished:

- "Masa delgada, crujiente en la orilla, flexible al centro."
- "Fermentación fría de 48 horas con temperatura controlada."
- "Hecho a mano en 48h" (packaging stamp — the number is the fermentation, so it must match the 48-hour cold ferment everywhere)
- "48 HORAS DE FERMENTO" (social tile)
- "HECHA POR MEXICANOS — Con técnica italiana" (social tile)

Notice the pattern: **the process is the marketing.** A number and a technique beat an adjective. Write "fermentación fría 48h", not "masa artesanal de calidad premium".

**Person.** Marketing copy is impersonal or first-person-plural — the brand talks about the work, not about the reader's feelings ("Horneada como allá, gozada como acá" is about the pizza). Transactional and app copy switches to **tú**, never *usted*: "Elige tu masa", "Tu pedido llega en 30 min". The brand is a neighbourhood workshop, not a hotel.

**Casing.** Three registers, and they are load-bearing:
1. **Title case** for names and headings — "Pizza especial del mes", "Pizza Serranita".
2. **ALL CAPS with wide tracking** for shout lines and labels — "48 HORAS DE FERMENTO", "MAINS", "NUEVA EN EL MENÚ". Always in Bungee or Oswald, never in Colo Pro at small sizes.
3. **Sentence case** for descriptions and body — "Doble queso, doble provolone. Simple y por eso funciona."

**Menu item descriptions are full sentences with a wink.** The delivered menu sheet sets the register: an ingredient list, then a line of attitude — "Doble queso, doble provolone. Simple y por eso funciona." One or two sentences, never more. The source.

**Prices** are written `$185` — peso sign, no decimals, no "MXN" in customer-facing UI (MXN appears only in internal/financial documents).

**Accents and punctuation** are always correct: *Menú*, *Pizzería*, *Atizapán*, *jamón*, *arúgula*. `¿` and `¡` open their sentences. Never skip them.

**Emoji: no.** The only emoji anywhere in the sources are the traffic lights 🟢🟡🔴 used as status markers in an internal decision table in the business plan. That is an internal-document convention, not a brand voice element. **Do not use emoji in any customer-facing Mextizza surface.**

**Words the brand uses:** taller, oficio, barrio, hecho a mano, masa, horno, tatemado, fermento, la casa, de la casa, rotativa.
**Words to avoid:** gourmet, premium, experiencia culinaria, delicioso, exquisito, auténtico (overused), "the best".

---

## VISUAL FOUNDATIONS

The aesthetic the plan names is **"taller / street art urbano"** — workshop and street sign. Honest materials: brick, steel, wood, kraft cardboard. Everything reads as *printed or stamped*, never as glass or software chrome.

**The system is light-dominant.** The primary mark is the black wordmark from *Logo Mextizza letras negras* — solid negro carbón letters on paper. That single decision drives everything else: blanco hueso is the default surface, negro carbón is ink and structure, and the four-colour palette does its work as accents on paper rather than as fields on black. Negro carbón panels still exist (footer, one social tile, an inverted lockup) but they are deliberate accents, not the ground.

### Colour

Six named colours, each with a stated job (the Spanish names and rationale are from the mockup and should be preserved in any documentation):

| Token | Hex | Name | Job |
|---|---|---|---|
| `--rosa-mexicano` | `#E4007C` | Rosa Mexicano | "Energía, orgullo, identidad — el acento que salta a la vista." The single loud colour. |
| `--dorado-masa` | `#D9A65C` | Dorado Masa | Baked dough. Warm accent; kickers on dark heads, and the lightest swatch. |
| `--terracota-horno` | `#C1502E` | Terracota Horno | "Fuego, tatemado." Warm accent; carries prices and taglines. |
| `--negro-carbon` | `#1A1A1A` | Negro Carbón | "Estructura, tipografía, oficio." The structural colour — rules, frames, type, inverse surfaces. |
| `--gris-asfalto` | `#4A4A4A` | Gris Asfalto | "Textura urbana, estructura, calle." Secondary surface, section headers, stamp borders. |
| `--blanco-hueso` | `#F5F0E8` | Blanco Hueso | "Respiro — base silenciosa, no protagonista." The page. |

Plus `--gris-texto` `#6b6b6b` for secondary text and `--blanco` for card surfaces.

**Two more paper steps and three accent tints** carry the light system — they are mixes of the six, not new colours:

| Token | Hex | Job |
|---|---|---|
| `--hueso-hondo` | `#EDE6DA` | A sunken block of paper — section bands, image placeholders (`--surface-sunken`). |
| `--hueso-linea` | `#E2D9C9` | The paper hairline (`--border-paper`) — the default card edge on a light page. |
| `--rosa-tinte` | `#FBE0EF` | Soft rosa fill: the special-of-the-month row, quiet flags (`--surface-accent-soft`). |
| `--dorado-tinte` | `#F7EBD8` | Soft dough fill (`--surface-dough`). |
| `--terracota-tinte` | `#F6E2DA` | Soft warm fill (`--surface-warm-soft`). |

**Rules of use.** Blanco hueso is the page; white is for cards sitting on it; hueso hondo is for a band that has to recede. **The wordmark is negro carbón** — monotone, no two-tone, no shadow; invert it to blanco hueso only when the ground is negro carbón. Rosa mexicano is the accent that carries action (buttons, active nav, the number that matters), never a large field — the exceptions are the tape stripe and one social tile. Terracota carries prices. Dorado sits on dark heads and in the tape. Never put rosa and terracota adjacent at large size; they fight. There are no other colours: **no blues, no purples, no gradients-as-decoration.**

### Type

Three fonts, three jobs, no overlap:

- **Colo Pro** (`--font-display`) — the wordmark and display headings only. A rounded geometric art-deco face with inline strokes. It is a *display* face: never below ~24px, never for body copy, never for long strings. Weight 400 only (the file is Regular; there is no bold — do not synthesise one).
- **Bungee** (`--font-label`) — eyebrows, section labels, stamps, social shout lines. Always uppercase, always tracked out (`--ls-1` or `--ls-2`), always small (11–24px). Bungee at 11px with 1px tracking is the brand's signature small label.
- **Oswald** (`--font-body`) — everything functional: body copy, menu items, prices, UI, buttons, form fields. Condensed, so it holds a lot of Spanish in a narrow column. Weights 300–800 are all in play; 700/800 for item names and prices, 400 for descriptions.
- `Courier New` (`--font-mono`) — hex codes and technical values only. It appears in the mockup's swatch labels; keep it for that register.

Sizes are deliberately not on a 4px grid — the mockup uses `11.5px` and `12.5px`. Those are preserved verbatim in `tokens/typography.css`. Do not round them.

### Spacing & layout

Page max width **1080px**, prose measure **620px**, page padding `48px 24px 96px`. Sections separate by **72px**. Grids are two equal columns with a **28px** gap; swatch grids are six columns with **16px**. Cards pad `20px 24px`; framed/packaging cards pad `28px`; hero panels pad `56px 32px`. Nothing is centred except the wordmark panel and the social tile — copy is left-aligned.

Layout is **flat and quiet**: no floating action buttons, no chrome that pretends to hover. The web header does stick — an ordering surface needs it — and it sticks as a paper band with the tape stripe as its bottom edge, not as a translucent blur. Where a delivery surface needs a fixed cart bar, it reads as a printed band across the bottom, not as a floating pill.

### Borders, corners, cards

Corners are **eased one step** from the original square treatment: **6px** (`sm`), **10px** (`md`), **14px** (`lg`), plus `50%` for the circular stamp. Still nothing pill-shaped, still no 24px-radius app card — the object should read as cut paper with a clean corner, not as a soft widget.

Four border weights, each meaning something different:
- `1px solid #E2D9C9` (`--border-paper`) — the default card edge on paper. The workhorse.
- `1px solid rgba(0,0,0,.08)` (`--border-hairline`) — an even quieter line inside a white card.
- `1px dashed rgba(0,0,0,.12)` — separates menu rows. A real brand device borrowed from printed menus. Use it for lists of items with prices, nowhere else.
- `2px solid #1A1A1A` — a frame. This is what makes something feel like packaging or a sign. (Was 3px; softened.)
- `3px solid #1A1A1A` — the rule under a page header.

**Four card species exist:**
1. **White card, paper hairline, soft shadow, 10px radius** — informational (menu card, form panel).
2. **White card, 2px black frame, 10px radius** — object-like (packaging, stamped panels).
3. **Hueso hondo block, no border, 14px radius** — a band that recedes (notes, placeholders).
4. **Negro carbón panel, 14px radius** — hero accent. Use it once per surface, not as the ground.

### Shadows

Two registers, and they do not mix:

- **Soft and low** — `--shadow-soft` (`0 1px 2px / 0 4px 12px` at 5%) and `--shadow-raised` for a drawer or phone frame. This is the one softening the redesign allows: a card resting on paper, not floating over it. Never above 24px of blur, never more than 8% alpha.
- **Hard offset print** — `2px 2px 0 #1A1A1A`, and `0 2px 0` on buttons that should read as a stamped key. Reserved for things that are *stamped*: buttons, stickers, stamps.

**The wordmark carries no shadow at all** (`--shadow-wordmark: none`). Black letters on paper need nothing.

### Signature textures

Two, and they are the most recognisable things in the system after the wordmark:

1. **The tape stripe** (`--stripe-tape`) — a 45° repeating four-colour band, 10px per stripe, in the order rosa → gris asfalto → terracota → dorado. In the mockup it runs 10px tall across the top of the pizza box as sealing tape. Use it as a top or bottom edge on packaging-like surfaces, as a divider, or as a thin brand band in a header. Never as a large background field.
2. **The diagonal split** (`--split-diagonal`) — a 135° hard-edged split putting a rosa band across a negro carbón field at 45–55%. This is the social-post device. Hard stops, no gradient blur.

Also brand-correct: the **circular rubber stamp** — 130px, `2px solid` negro carbón, `border-radius:50%`, rotated `-6deg`, Bungee 11px uppercase inside, three short lines. And the **dot row** — 16px circles with a `0 0 0 2px rgba(0,0,0,.08)` ring, in the order rosa → terracota → dorado → gris asfalto → negro carbón (swap the last for blanco hueso on a dark panel).

### Imagery

**Four real product photos were delivered** and live in `assets/photos/`: `pizza-serranita`, `pizza-chisi`, `pizza-provola`, `pizza-newyork`. They set the recipe: **overhead, the whole pizza centred, on warm weathered wood, tight crop, warm low-key light.** No hands, no plates, no cutlery, no props.

Use them square (`object-fit: cover`) in menu rows and as a 4/5 crop in a hero. The remaining five dishes have **no photo, and they show none** — an empty row is correct; substituting another pizza's photo is not. Where a photo belongs but doesn't exist, leave a labelled placeholder — never an illustration, an emoji, or a hand-drawn SVG.

The intended colour treatment of imagery, read from the palette and the "taller" direction: **warm, low-key, close-up.** Dough, char, hands, steel, kraft. Shot against hueso or kraft, not on white seamless. No cool tones, no blue-hour, no black-and-white, no heavy grain filter. Crop tight on the product — the plan's differentiator is texture (crisp edge, open crumb), so the photography's job is to show texture.

### Motion, hover, press

The identity mockup is static, so motion is my inference from the brand's character — it is **short, linear-ish, and unbouncy**, matching a printed object rather than a springy app:

- Duration `120ms` (`--dur-fast`) for colour changes, `180ms` (`--dur-base`) for anything else. Never over 250ms.
- Easing `cubic-bezier(.2,0,.2,1)`. **No bounce, no elastic, no spring.**
- **Hover** = darken, don't lighten and don't fade. Rosa `#E4007C` → `#C70069`. Negro carbón → `#2A2A2A`. Opacity changes are not the brand's hover language; a colour step is. Text links pick up an underline (a 1px border that was transparent).
- **Press** = darken further (`#A80059`) and *lose the hard shadow* — a stamped key pressing flat: `transform: translate(2px,2px); box-shadow: none`. Do not scale down.
- **Focus** = `0 0 0 3px rgba(228,0,124,.35)`. Never remove it.
- Entrances, if any, are a 180ms opacity fade only. No slide-ins, no staggered reveals.

### Transparency & blur

Transparency is used **only** as a low-alpha black to make a line, a ring, or the soft card shadow (`rgba(0,0,0,.08)` hairlines, `rgba(26,26,26,.05)` shadows, the modal scrim at 42%). **`backdrop-filter` and frosted glass are off-brand** — the brand's surfaces are opaque printed materials. There are no protection gradients over imagery either; where text must sit over a photo, put it on a solid negro carbón capsule or band instead of scrimming the image.

---

## ICONOGRAPHY & ASSETS

**The brand has a real mark and it is in this repo — never redraw it.**

**The primary mark is `assets/wordmark-mextizza.svg`** — the black letterforms traced out of the founders' *Logo Mextizza letras negras* SVG, cropped tight, `fill="currentColor"` so it takes any brand colour. The same outlines are embedded in the `Wordmark` component (`vector` mode, the default), so the mark needs no font to load and is exact at any size. Everything else in `assets/` is a supplied variant:

**Wordmark / logo (full-colour "oven" mark, 768×768 artwork):**
- `logo-mextizza.svg` — primary
- `logo-mextizza-amarillo.svg` — yellow-letters variant
- `logo-mextizza-negro.svg` — all-black variant
- `logo-letras-negras-za.svg` — black letters, "za" treatment
- `logo-fondo-letras-amarillas.svg` — filled background, yellow letters
- `logo-letras-amarillas.png`, `logo-letras-negras.png`, `logo-mockup-sin-horno.png`, `logo-ultimas-letras-rosa.png` — raster equivalents / mockups

**Lockups (800×480, wordmark + "Pizzería" + tagline set as live text):**
- `lockup-principal-negro.svg` — primary, on negro carbón
- `lockup-variante-blanco.svg` — on blanco hueso
- `lockup-variante-negro-completo.svg`

**Other:** `menu-mextizza.svg` / `.png` — the printed A4 menu artwork. `assets/fonts/ColoPro-Regular.otf` — the display face, extracted from the source mockup.

**The illustrated lockup is the primary logo.** `Lockup` serves it in three cuts, all cropped straight out of `assets/logo-letras-negras.png` (the founders' artwork) — never redrawn:

| Variant | Art | Where |
|---|---|---|
| `pala` | Peel + cutter above the letters | Top-of-page marks: web header, app menu header, menu-sheet header. |
| `completo` | That plus the five ingredient icons below | The full statement: app welcome, web footer, social posts. **It replaces the `DotRow`** — the real ingredient icons are the signature, not five dots. |
| `ingredientes` | The icon strip alone | A rule or signature where the letters are already present. |

`size` is the letters' cap height in both variants, so a `pala` and a `completo` at the same size show the same wordmark. `tone="hueso"` flips only the black ink for negro carbón grounds — the tomato, cheese, onion, mushroom and slice keep their own colours. Light copies live at `assets/lockup-*-hueso.png`.

`Wordmark` (the vector letterforms) is still correct where the illustration would be smaller than legible or where the mark must be a single flat colour: stamps, tight chrome, the cart drawer, print at small size.

**Letterform construction.** The letters are **black, monotone, on paper** — no two-tone split, no print shadow. "Pizzería" sits beneath at 60% of the ink colour, tracked 6–9px; the tagline goes under that in Bungee terracota. Invert the letters to blanco hueso only on a negro carbón ground.

The business plan's earlier construction — "Mexti" dorado / "zza" rosa on black, with a `3px 3px 0` shadow — is still reachable (`<Wordmark vector={false} accent="var(--rosa-mexicano)" />` and the supplied full-colour SVGs) but it is **no longer the primary lockup**; the founders chose the black letters. Use the two-tone only where the founders' own colour artwork is what's wanted.

The five ingredient icons and the peel-and-cutter mark are **raster only** — they were rasterised in the delivered SVG, so `Lockup` crops them out of the 1024px PNG with the paper knocked out to transparency. That is good to roughly 240px tall on screen; for large print or vector output they have to come from the founders' source file.

### Icon system

**The brand's icon signature is five ingredient icons** — tomato, cheese, red onion, mushroom, pizza — which the business plan describes as part of the lockup ("5 íconos de ingredientes … como firma visual reconocible"). They exist inside the supplied logo artwork.

There is **no separate UI icon set** in the sources: no icon font, no sprite sheet, no individual icon SVGs, and no icons at all in the identity mockup (which is entirely type, colour and shape). So for interface chrome — carts, chevrons, filters, close buttons — this system **substitutes Lucide from CDN**, chosen because its 2px flat stroke and squared terminals sit closest to the brand's hard-edged, unrounded geometry.

> ⚠️ **Substitution flagged:** Lucide is *my* choice, not the founders'. If Mextizza has or wants a different icon language, replace it. Use Lucide at `stroke-width: 2`, `currentColor`, 20px or 24px, and never fill it.

**Unicode as icons:** the brand does use bare typographic characters where they read as printed marks — `·` as a separator in taglines and addresses ("Técnica italiana · Alma mexicana"), `→` in flow copy, `≤`/`≥` in operational specs. That is on-brand. Emoji is not (see Content Fundamentals).

---

## Menu data (canonical — transcribed from the delivered menu sheet)

Source of truth: **`assets/menu-mextizza.png` / `.svg`** — the printed menu the founders delivered. Names, descriptions and prices below are verbatim from it. Do **not** substitute values from the business plan or the BOM; those are cost figures, not the menu. Machine-readable copy: `ui_kits/menu-data.js`.

All pizzas: *horno de piedra, masa fermentada en frío 48 horas.*

| Category | Product | Price |
|---|---|---|
| Pizzas | Pizza Serranita | $245 |
| Pizzas | Pizza Aloha | $180 |
| Pizzas | Pizza Newyork | $170 |
| Pizzas | Pizza Provola | $195 |
| Pizzas | Pizza Chisi | $215 |
| Pizzas | Pizza Combinada | $190 |
| Pizzas | Pizza Roni | $210 |
| Pizzas | Pizza Traviesa | $215 |
| **Especial del mes** | Pizza Cochinita | $270 |
| Postres y bebidas | Chocolatoso (brownie) | $40 |
| Postres y bebidas | Soda Italiana (fresa y limón) | $45 |
| Postres y bebidas | Agua Mineral | $35 |

Pizza prices run $170–270; the plan's stated average ($215) and local market range ($190–245) hold.

**Only ONE pizza is rotativa: the Cochinita.** The "Pizza especial del mes" block holds exactly that one item — everything else lives in Pizzas. Do not pad the special block to fill space; a one-row category is correct.

**Shipping is already inside the pizza price.** No surface charges, adds, or itemises delivery: no "Envío" line in a cart, no shipping row in a total. Where it helps the customer trust the number, say *"envío incluido"* next to the total — never as a separate charge.

### Delivery zone: a real, enforced radius

The plan's 3 km radius is **enforced, not decorative.** `ui_kits/delivery-zone.js` holds the kitchen's coordinates (19.5453, −99.2745 — Lomas Lindas, CP 52947), the radius, and a table of nearby colonias with approximate centroids; `zonaEvaluar(colonia)` returns a haversine distance and one of three states:

| State | Distance | Behaviour |
|---|---|---|
| `dentro` | ≤ 3 km | Order proceeds. Rosa `StatusNote`. |
| `limite` | 3–5 km | **Order does not proceed automatically** — dorado note, "lo confirmamos a mano por WhatsApp". |
| `fuera` | > 5 km | Blocked. Terracota note. |

In production the address gets geocoded and measured against the same centre and radius; the colonia table is the prototype's stand-in. Both surfaces gate the confirm button on `dentro`, and both **require a payment method** — nothing is preselected, and the attempt reveals the errors rather than the button silently doing nothing. The checkout also captures a **10-digit phone number**, since the plan confirms every order by WhatsApp.

### Complementos (add-ons)

Per-pizza add-ons live in `MEXTIZZA_ADDONS` (`ui_kits/menu-data.js`), in four groups: **Más queso, Más carne, Verduras, El último toque.** The split is functional, not decorative — the first three go into the oven with the pizza, the last goes on at the exit. Surfaces should say so.

The picker lives **only** in that dialog/screen — the menu itself does not list add-ons on the ordering surfaces. (The printed sheet is the exception: paper has no dialog, so it prints the full list.)

Prices ($20–65) are **inferred** from the BOM's input costs times the plan's margin and need founder confirmation, same as everything else in this file marked inferred. The picker itself (`AppAddons`) is a full screen reached from product detail, not a modal: rows with a square check, a stepper once picked, `+$` in terracota, and a footer carrying the running total.

**Two things the menu sheet changes about earlier assumptions:**
1. Descriptions on the real menu are **full sentences with personality and a period** ("La clásica que divide opiniones… Sin pena."), not the terse comma-separated ingredient lists the mockup suggested. Follow the menu sheet — it is the founders' own voice.
2. The printed menu uses a **single flat red** for headers and prices, not the rosa/dorado/terracota trio in this system's tokens. Worth confirming with the founders which is canonical for print.


---

## Index

**Root**
- `styles.css` — the single entry point consumers link. `@import` lines only.
- `thumbnail.html` — homepage tile for this design system.
- `readme.md` — this file.
- `SKILL.md` — Agent-Skills-compatible entry point.

**`tokens/`** — `fonts.css` (Google Fonts import + Colo Pro `@font-face`), `colors.css`, `typography.css`, `spacing.css`, `effects.css`, `base.css`.

**`assets/`** — logos, lockups, menu artwork, `fonts/ColoPro-Regular.otf`.

**`sources/`** — the supplied identity mockup plus plain-text extractions of both business documents, kept for verification.

**`guidelines/`** — foundation specimen cards (Colors, Type, Spacing, Brand groups in the Design System tab).

**`components/core/`** — the reusable primitives. See `components/core/*.prompt.md` for per-component usage.

**`ui_kits/`** — `web/` (own website + ordering) and `app/` (own ordering app). Each has its own `README.md` with an honest caveat: no product UI existed in the sources, so these apply the documented foundations to the surfaces the business plan names rather than recreating anything.

**`templates/`** — starting artifacts consuming projects can copy: `social-post/` (1080×1080 square post) and `menu-sheet/` (one-page printed menu).

### Component inventory

No source defined a component library, so the primitives below are derived directly from the devices present in the identity mockup, plus the minimum needed to build the two ordering surfaces the business plan commits to.

**From the mockup (direct):** `Wordmark`, `SectionLabel`, `Swatch`, `Stamp`, `TapeStripe`, `MenuCard`, `MenuItem`, `SocialTile`, `DotRow`, `FramedPanel`.

**Intentional additions** (not in the sources; needed for the ordering flows the plan requires, styled strictly from the foundations):
- `Button` — the plan commits to online ordering on web and app; there is no way to build a cart without one. Styled as a stamped key (hard offset shadow, press-flat).
- `QtyStepper` — required by any cart line.
- `Badge` — carries "Del mes", "Nueva", "48h" style flags that the copy voice already uses.
- `Lockup` — the illustrated mark (peel, cutter, ingredient icons) in three cuts.
- `Field` — text/select/tel input for the checkout, with `required` and `invalid` states.
- `RadioGroup` — a required single-choice tile group; nothing preselected. Built for the mandatory payment-method step, reusable for any "exactly one, and you must answer" question.
- `StatusNote` — the flat notice used by the delivery-radius check (ok / warn / block).
- `Icon` — a thin wrapper over the substituted Lucide set, so the substitution is swappable in one place.
