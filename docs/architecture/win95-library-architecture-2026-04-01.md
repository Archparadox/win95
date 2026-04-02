# Win95 library architecture plan

Date: 2026-04-01
Project: `website_port`
Status: pre-implementation architecture for the restarted shared system

## Goal

Design a fresh shared Win95 UI system for the portfolio without reviving the deleted library.
The architecture must support a compact Win95-first foundation pass, future dual-resolution styling, and staged migration from local demo markup to shared primitives.

## Constraints

- Do not restore deleted `components/ui` or old global tokens (`docs/handoffs/2026-04-01-reset-from-scratch.md:25-34`, `:96-99`).
- Keep homepage desktop demo as the active validation/product surface during early work (`docs/handoffs/2026-04-01-next-session-figma-restart-brief.md:83-124`).
- Build foundations/tokens before primitive rollout (`docs/handoffs/2026-04-01-next-session-figma-restart-brief.md:50-59`, `:212-230`).
- Support future `800x600` and `640x480` presentation styles without binding the system to a single viewport.
- Preserve the compact density and control rhythm already working on the homepage desktop demo.

## Recommended folder structure

```text
app/
  components/
    page.tsx                # validation surface for shared primitives
  _components/
    ui/
      foundations/
        tokens.css
        resolutions.css
        motion.css
      primitives/
        BevelBox/
        WindowFrame/
        TitleBar/
        Button/
        Field/
        Checkbox/
        Radio/
        Divider/
        Scrollbar/
      icons/
        Icon.tsx
      composites/
        StartMenu/
        Taskbar/
        Dialog/
        Fieldset/

docs/
  ui-foundation/
  architecture/

lib/
  ui/
    classnames.ts           # only if truly needed later
    resolution.ts           # only if runtime helpers become necessary
```

## Boundary rules

### Foundations
Own:
- raw color tokens
- typography tokens
- border/bevel constants
- spacing scale primitives
- resolution-mode tokens

Do **not** own:
- component-specific layout rules
- page compositions

### Primitives
Own:
- reusable control shells and states
- component anatomy and variants
- relationship logic between tokens and markup

Do **not** own:
- homepage-specific window content
- page data/content concerns

### Composites
Own:
- assemblies like taskbar, start menu, dialogs, and window shells
- orchestration of primitives into larger UI structures

Do **not** own:
- application route content

## Token strategy

Use **CSS custom properties** as the primary token transport.

## Source of truth

In descending priority:

1. Compact runtime token values in code (`app/_components/ui/foundations/tokens.css`)
2. Homepage desktop demo as the visual/authenticity benchmark
3. Historical Win95 references for density, shell behavior, and optical sanity checks
4. Figma for component anatomy, state coverage, and proportion checks

Figma is not the final pixel authority for the runtime system. If Figma values are visibly too large or too clean for the intended compact desktop feel, keep the compact runtime scale and preserve the relationship instead.

### Token layers

#### 1. Raw/reference tokens
Values close to the compact runtime system and historical reference meaning.
Examples:
- `--win-color-surface`
- `--win-color-shadow-dark`
- `--win-color-shadow-light`
- `--win-font-size-ui`
- `--win-size-border-outer`
- `--win-size-bevel-inner`

#### 2. Semantic UI tokens
Mapped to component intent.
Examples:
- `--win-window-bg`
- `--win-window-titlebar-active-start`
- `--win-window-titlebar-active-end`
- `--win-button-face`
- `--win-button-shadow-raised`
- `--win-button-shadow-pressed`

#### 3. Resolution-scale tokens
Only for layout-scale adaptation.
Examples:
- `--win-resolution-window-default-width`
- `--win-resolution-desktop-gutter`
- `--win-resolution-taskbar-height`
- `--win-resolution-icon-gap-y`

### Important token split

**Invariant micro-geometry** should stay stable across resolutions whenever possible:
- bevel logic
- border thickness hierarchy
- caption-button anatomy
- glyph proportions
- focus treatment

**Resolution-sensitive layout scale** can vary:
- default window sizes
- icon spacing across desktop grid
- taskbar density
- dialog max widths
- desktop gutters and offsets

## First-pass primitive scope

Build in this order:
1. `tokens.css`
2. `BevelBox`
3. `WindowFrame`
4. `TitleBar`
5. `Button`
6. `Icon`
7. `Field`
8. `Checkbox`
9. `Radio`
10. `Divider`
11. `Scrollbar` if Figma extraction is complete enough

## Validation strategy

### Surface 1: `/components`
Rebuild `/components` into a disciplined validation page once the first primitives exist.
Use it for:
- state gallery
- resolution comparisons
- exact vs inferred notes
- primitive regression checks
- compact specimen windows that still feel like Win95 software, not a modern design-system dashboard

### Surface 2: homepage desktop demo
Keep the homepage as the visual benchmark during primitive work.
Migrate one slice at a time only after primitive confidence is high.
Likely order:
- shared window shell
- title bar/buttons
- shared button family
- shared scroll surface
- taskbar/start menu

## Resolution implementation strategy

### First implemented mode
- `data-resolution="800x600"`

### Future second mode
- `data-resolution="640x480"`

### Recommended application shape

At the top validation/demo surface, apply a resolution attribute or class that changes only the layout-scale token set.

Example:
- base tokens in `tokens.css`
- overrides in `resolutions.css`
- primitives consume semantic tokens only

This prevents component CSS from becoming resolution-specific in many places.

## Mobile strategy

Not a build target yet, but architecture must stay compatible with later adaptation.

Rules:
- semantic elements first
- avoid hover-only critical affordances
- keep window and taskbar composition separable from input gesture model
- allow future stacked/mobile shells without changing primitive anatomy

## Risks to avoid

- putting resolution-specific pixel values directly inside many primitive CSS modules
- rebuilding taskbar/window/layout shells before token layering exists
- treating large extracted Figma values as final truth when they conflict with compact Win95 density
- broadening scope to tabs/slider/progress/alerts before core shell and form controls are stable

## Decision summary

- New shared system: **yes**
- Old shared system reused: **no**
- First target resolution: **800x600**
- Second target resolution: **640x480**
- Mobile target now: **no**
- Token transport: **CSS custom properties**
- Migration order: **foundations → primitives → `/components` validation → homepage slices**
