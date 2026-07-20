# @theya/icons

Basil icon set (Craftwork Studio, craftwork.design/product/basil) — 500 icons,
2 styles × 9 categories. Free-tier license, see `LICENSE.pdf`.

## Usage

```tsx
import { Icon } from '@theya/icons';

<Icon name="star" />                          // outline (default), 16px
<Icon name="star" variant="solid" size={24} /> // solid, 24px
```

Icons inherit color from `currentColor` — set `color` on the icon or a
parent element, same pattern as Button/IconButton/Fab's icon slots.

## Categories (outline; solid is a 1:1 mirror)

| Category | Count |
|---|---|
| Interface | 47 |
| Brands | 46 |
| Status | 37 |
| Files | 28 |
| Communication | 25 |
| General | 24 |
| Devices | 19 |
| Media | 15 |
| Navigation | 9 |

Full name → category mapping: `src/generated/manifest.json`.

## Structure

```
icons-source/           ← raw SVGs from the Basil download (source of truth)
  Outline/{Category}/*.svg
  Solid/{Category}/*.svg
scripts/build-icons.py  ← converts icons-source/ into the registries below
src/
  generated/
    outline.ts          ← { icon-name: svg-markup } (auto-generated)
    solid.ts
    manifest.json       ← { icon-name: category } (auto-generated)
  Icon.tsx              ← the component
  index.ts
```

## Updating icons

If Basil ships a new version: replace the contents of `icons-source/`
with the new SVG export (same `Outline/{Category}/*.svg` structure),
then:

```bash
cd packages/icons
python3 scripts/build-icons.py
```

This regenerates `src/generated/*` from scratch — don't hand-edit those
files, they'll be overwritten.

## Note on icon names

Names are derived from the original filenames (e.g. `Adobe-After-effects.svg`
→ `adobe-after-effects`), not curated — some are more descriptive than
others (`interface/other-1`, `other-2` are unlabeled icons in the
original set). No name collisions exist between categories, so lookup
is by name alone; `manifest.json` has the category if you need it for
a browsable gallery.
