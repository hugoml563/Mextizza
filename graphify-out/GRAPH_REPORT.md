# Graph Report - mextizza-design  (2026-08-28)

## Corpus Check
- 159 files · ~363,301 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 669 nodes · 1225 edges · 85 communities (33 shown, 52 thin omitted)
- Extraction: 82% EXTRACTED · 18% INFERRED · 0% AMBIGUOUS · INFERRED: 222 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Design Canvas Runtime
- Design Canvas Runtime
- Design Canvas Runtime
- App UI Kit Screens
- Business Plan Core Concepts
- UI Primitives Demo
- Doc Page Web Component
- Doc Page Web Component
- Brand Primitive Components
- Menu Product Photography
- UI Component Source Files
- Logo Lockup Variants
- Pizza Photos & Toppings
- Business Plan Documents
- App Screens Component
- Web Surfaces Component
- Menu Display Components
- Brand Lockup & Dot Row
- Core Brand Color Tokens
- Primary Logo Assets
- Loteria Palette Exploration
- Ingredient Icon Set
- Menu Sheet Pricing
- Brand Asset Guidelines
- Menu Data Source
- Wordmark Component
- Delivery Zone Logic
- Pizza Chisi Photo
- Icon Type Definitions
- Card & Shadow Tokens
- Spacing & Layout Tokens
- Delivery Form Component
- Coca-Cola Photo
- Pizza Provola Photo
- Sprite Photo
- DotRow Type Definitions
- FramedPanel Type Definitions
- Lockup Type Definitions
- SectionLabel Type Definitions
- SocialTile Type Definitions
- Stamp Type Definitions
- Swatch Type Definitions
- TapeStripe Type Definitions
- Wordmark Type Definitions
- Badge Type Definitions
- Button Type Definitions
- Field Type Definitions
- MenuCard Type Definitions
- MenuItem Type Definitions
- QtyStepper Type Definitions
- RadioGroup Type Definitions
- StatusNote Type Definitions
- Prosciutto Arugula Pizza Photo
- Wood-Fired Cheese Pizza Photo
- GitHub Pages Deploy Setup
- Lockup Completo Hueso Asset
- Lockup White Variant Asset
- Logo Fondo Amarillas Asset
- Logo Yellow Letters Asset
- Logo Black Letters Asset
- Logo Letras Negras ZA Asset
- Logo Mextizza Yellow Asset
- Mextizza Primary Logo Asset
- Logo Black Variant Asset
- Logo Mockup Sin Horno Asset
- Logo Pink Letters Asset
- Menu Vector Asset
- Mextizza Wordmark Asset
- Cenital Product Photography
- Bungee Label Font
- Courier Mono Font
- Diagonal Split Token
- Gris Asfalto Color Token
- Oswald Body Font
- Uploaded Logo SVG Asset
- Cheese Pizza Reference Photo
- Blue Cheese Pizza Photo
- Cheese Pizza Reference Photo

## God Nodes (most connected - your core abstractions)
1. `DocPage` - 23 edges
2. `DocPage` - 23 edges
3. `get()` - 23 edges
4. `get()` - 23 edges
5. `get()` - 23 edges
6. `createRuntime()` - 22 edges
7. `createRuntime()` - 22 edges
8. `createRuntime()` - 22 edges
9. `Component Inventory Rationale` - 16 edges
10. `Icon()` - 12 edges

## Surprising Connections (you probably didn't know these)
- `Circular Rubber Stamp` --references--> `Stamp()`  [INFERRED]
  readme.md → components/brand/Stamp.jsx
- `Component Inventory Rationale` --references--> `Button()`  [EXTRACTED]
  readme.md → components/ui/Button.jsx
- `Component Inventory Rationale` --references--> `DotRow()`  [EXTRACTED]
  readme.md → components/brand/DotRow.jsx
- `Component Inventory Rationale` --references--> `Lockup()`  [EXTRACTED]
  readme.md → components/brand/Lockup.jsx
- `The Tape Stripe (--stripe-tape)` --references--> `TapeStripe()`  [INFERRED]
  readme.md → components/brand/TapeStripe.jsx

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Rosa/Dorado/Terracota Accent Trio** — readme_rosa_mexicano, readme_dorado_masa, readme_terracota_horno [INFERRED 0.85]
- **Three-Font Type System** — readme_colo_pro, readme_bungee, readme_oswald [EXTRACTED 1.00]
- **Signature Brand Devices** — readme_tape_stripe, readme_diagonal_split, readme_circular_rubber_stamp [EXTRACTED 1.00]
- **Component prompt docs mirrored in demo card** — components_ui_radiogroup_prompt_pattern, components_ui_statusnote_prompt_pattern, components_ui_ui_card_demo [EXTRACTED 1.00]
- **Packaging system: stamp, tape, and box work together** — guidelines_brand_packaging_caja, guidelines_brand_stamp_sello, guidelines_brand_tape_franja [EXTRACTED 1.00]
- **Core brand palette reused across colors, dots, and exploration** — guidelines_colors_core_paleta, guidelines_brand_dots_fila, explorations_paleta_d_loteria_paleta [EXTRACTED 1.00]
- **Identidad visual central de Mextizza** — sources_mockup_completo_v11, concept_color_palette_mextizza, concept_ingredient_lockup, guidelines_wordmark [INFERRED 0.85]
- **Flujo operativo de gestión de órdenes** — templates_sales_center_salescenter_dc, concept_order_flow_states, concept_sales_channels, sources_mextizza_plan_de_negocios_final [INFERRED 0.80]
- **Modelo de costeo financiero de Mextizza** — sources_mextizza_resumen_ejecutivo, sources_mextizza_plan_de_negocios_final, concept_bom_costing [INFERRED 0.90]

## Communities (85 total, 52 thin omitted)

### Community 0 - "Design Canvas Runtime"
Cohesion: 0.06
Nodes (75): boot(), bundledBlob(), cdnScriptFor(), collectProps(), compileAttr(), compileTemplate(), contentKey(), createComponentFactory() (+67 more)

### Community 1 - "Design Canvas Runtime"
Cohesion: 0.06
Nodes (75): boot(), bundledBlob(), cdnScriptFor(), collectProps(), compileAttr(), compileTemplate(), contentKey(), createComponentFactory() (+67 more)

### Community 2 - "Design Canvas Runtime"
Cohesion: 0.06
Nodes (75): boot(), bundledBlob(), cdnScriptFor(), collectProps(), compileAttr(), compileTemplate(), contentKey(), createComponentFactory() (+67 more)

### Community 3 - "App UI Kit Screens"
Cohesion: 0.15
Nodes (37): AddonsDialog(), AppAddons(), AppCart(), AppDetail(), AppMenu(), AppTracking(), AppWelcome(), Badge() (+29 more)

### Community 4 - "Business Plan Core Concepts"
Cohesion: 0.13
Nodes (27): Costeo BOM / food cost, Paleta de color Mextizza, Lockup de 5 íconos de ingredientes, Menú final cerrado (plan de negocios), Flujo de estados de orden (recibida→confirmada→horno→lista→camino→entregada), Canales de venta (WhatsApp, Sitio Web, App, Catering/Mostrador), Tagline: Horneada como allá, gozada como acá, Sistema tipográfico de 4 familias (Oswald/Colo Pro/Bungee/Courier) (+19 more)

### Community 5 - "UI Primitives Demo"
Cohesion: 0.12
Nodes (24): RadioGroup Required-Choice Pattern, StatusNote Block-Tone Pattern, Badge component, Button component (tones/sizes), UI Primitives Demo Card, Field component, Icon set (Lucide substitute), MenuCard + MenuItem component (+16 more)

### Community 8 - "Brand Primitive Components"
Cohesion: 0.16
Nodes (11): Brand Primitives Card, FramedPanel(), VARIANTS, SectionLabel(), SocialTile(), Stamp(), Swatch(), TapeStripe() (+3 more)

### Community 9 - "Menu Product Photography"
Cohesion: 0.14
Nodes (15): Agua Mineral Bottle Photo, Brownie Photo, Pizza Aloha Photo, Pizza Newyork Photo, Pizza Roni (Pepperoni Pizza) Photo, Bottled Mineral Water, Brownie (Dessert), Ham and Pineapple Pizza Style (+7 more)

### Community 10 - "UI Component Source Files"
Cohesion: 0.16
Nodes (9): Button(), SIZES, TONES, Field(), Icon(), PATHS, QtyStepper(), TONES (+1 more)

### Community 11 - "Logo Lockup Variants"
Cohesion: 0.21
Nodes (13): Mextizza Logo Lockup (Pala, Hueso), Lockup Pala (Mextizza Logo Lockup), Mextizza Logo Lockup - Black Complete Variant, Colo Pro Typeface, Hueso (Bone/Cream) Color Tone, Mextizza Brand, Mextizza Color Palette (charcoal, gold, magenta, terracotta, cream), Fusion Ingredient Icon Row (jalapeño/lime, taco, chili, agave, pizza slice) (+5 more)

### Community 12 - "Pizza Photos & Toppings"
Cohesion: 0.18
Nodes (12): Arugula, Pizza Combinada Photo, Pizza Combinada (Menu Item), Pizza Serranita (Menu Item), Pizza Serranita Photo, Pizza Traviesa Photo, Pizza Traviesa (Pepperoni with Spicy Honey), Parmesan Cheese (+4 more)

### Community 13 - "Business Plan Documents"
Cohesion: 0.20
Nodes (11): Mextizza_Plan_de_Negocios_Final.docx, Colo Pro (display font), Complementos (add-ons), Delivery Zone (3km/5km radius), Mextizza plan financiero.xlsx, Hugo Martínez, Mextizza (Brand), mockup_completo_v11.html (source) (+3 more)

### Community 16 - "Menu Display Components"
Cohesion: 0.28
Nodes (6): Badge(), TONES, MenuCard(), MenuItem(), Menu Data (canonical), Pizza Cochinita (Especial del mes)

### Community 17 - "Brand Lockup & Dot Row"
Cohesion: 0.25
Nodes (6): DEFAULT_DOTS, DotRow(), ART, Lockup(), Dot Row, Illustrated Lockup

### Community 18 - "Core Brand Color Tokens"
Cohesion: 0.29
Nodes (8): Blanco Hueso (#F5F0E8), Dorado Masa (#D9A65C), Light-Dominant System Rationale, Negro Carbón (#1A1A1A), Rosa Mexicano (#E4007C), Terracota Horno (#C1502E), Primary Wordmark Mark, Homepage Thumbnail Tile

### Community 19 - "Primary Logo Assets"
Cohesion: 0.29
Nodes (7): Mextizza Complete Lockup, Lockup Principal Negro, Ingredient Icon Set (Tomato, Cheese, Onion, Mushroom, Pizza Slice), Mextizza Wordmark, Crossed Pizza Peel and Cutter Icon, Pizzeria Tagline, Topping Icon Row

### Community 20 - "Loteria Palette Exploration"
Cohesion: 0.29
Nodes (7): Paleta D · Lotería exploration, Corte diagonal 135° (recurso de redes), Fila de puntos (paleta como firma), Acentos (Rosa, Dorado, Terracota), Paleta central (6 colores con nombre), Estados de interacción (hover/press/focus), Neutros (estructura, calle, respiro)

### Community 21 - "Ingredient Icon Set"
Cohesion: 0.60
Nodes (6): Ingredientes (Ingredients Icons), Cheese, Mushroom, Onion, Pizza Slice, Tomato

### Community 22 - "Menu Sheet Pricing"
Cohesion: 0.60
Nodes (6): Mextizza Menu Sheet, Mextizza Pizzería (brand), Pizza Aloha - $180, Pizza Cochinita - $270 (Especial del Mes), Pizza Combinada - $190, Pizza Serranita - $245

### Community 23 - "Brand Asset Guidelines"
Cohesion: 0.33
Nodes (6): Marcas suministradas (SVG assets), Lockup ilustrado (pala, ingredientes), Lockup principal (wordmark + tagline), Empaque y sellos (caja kraft), Sello de goma (Hecho a mano en 48h), Franja de cinta (stripe-tape)

### Community 24 - "Menu Data Source"
Cohesion: 0.33
Nodes (4): MEXTIZZA_ADDONS, MEXTIZZA_FACTS, MEXTIZZA_MENU, MEXTIZZA_SOCIAL

### Community 25 - "Wordmark Component"
Cohesion: 0.50
Nodes (3): GLYPHS, SIZES, Wordmark()

### Community 26 - "Delivery Zone Logic"
Cohesion: 0.67
Nodes (3): MEXTIZZA_ZONE, zonaDistanciaKm(), zonaEvaluar()

### Community 27 - "Pizza Chisi Photo"
Cohesion: 0.67
Nodes (3): Pizza Chisi (Four-Cheese Pizza), Pizza Chisi Photo, Pizza Menu

### Community 29 - "Card & Shadow Tokens"
Cohesion: 0.67
Nodes (3): Las cuatro tarjetas (informativa, objeto, papel, héroe), Escala de radios (6/10/14px, círculo), Relieve y sombra (shadow-soft, shadow-lift)

### Community 30 - "Spacing & Layout Tokens"
Cohesion: 0.67
Nodes (3): Medidas de layout, Paddings compuestos, Escala de espaciado

## Ambiguous Edges - Review These
- `Template: Hoja de menú` → `Menú final cerrado (plan de negocios)`  [AMBIGUOUS]
  templates/menu-sheet/MenuSheet.dc.html · relation: conceptually_related_to

## Knowledge Gaps
- **131 isolated node(s):** `DotRowProps`, `DEFAULT_DOTS`, `FramedPanelProps`, `VARIANTS`, `LockupProps` (+126 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **52 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Template: Hoja de menú` and `Menú final cerrado (plan de negocios)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `Component Inventory Rationale` connect `Brand Primitive Components` to `Menu Display Components`, `Brand Lockup & Dot Row`, `UI Component Source Files`, `Wordmark Component`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._
- **Why does `DocPage` connect `Doc Page Web Component` to `App UI Kit Screens`?**
  _High betweenness centrality (0.005) - this node is a cross-community bridge._
- **Why does `Wordmark()` connect `Wordmark Component` to `Brand Primitive Components`, `Core Brand Color Tokens`?**
  _High betweenness centrality (0.004) - this node is a cross-community bridge._
- **What connects `DotRowProps`, `DEFAULT_DOTS`, `FramedPanelProps` to the rest of the system?**
  _131 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Design Canvas Runtime` be split into smaller, more focused modules?**
  _Cohesion score 0.060678962844159315 - nodes in this community are weakly interconnected._
- **Should `Design Canvas Runtime` be split into smaller, more focused modules?**
  _Cohesion score 0.060678962844159315 - nodes in this community are weakly interconnected._