# Win95 restart component map

Date: 2026-04-02
Project: `website_port`
Status: architecture-only map for the restart pass

## Goal

Define what belongs in the future shared Win95 system before implementation resumes.

This map assumes:
- homepage desktop demo remains the live product reference
- `/components` becomes the first disciplined validation surface later
- Figma file `vJFuCp7So8I9gtzg7ZJOTS` is the intended primary design authority once access is restored

## Category map

### 1. Foundations

Own:
- palette tokens
- typography tokens
- bevel and border constants
- spacing rhythm
- resolution-mode tokens
- exact vs inferred documentation

Planned files:
- `app/_components/ui/foundations/tokens.css`
- `app/_components/ui/foundations/resolutions.css`
- `app/_components/ui/foundations/motion.css`
- `docs/ui-foundation/*`

Rule:
- micro-geometry belongs here only when it is shared and stable across components

### 2. Icons

Own:
- local SVG/TSX glyphs
- size families
- caption/control glyphs
- disabled and active visual treatments

Planned shape:
- `app/_components/ui/icons/`

Rule:
- icon drawing primitives should be shared, but icon placement belongs to the consuming component

### 3. Primitives / controls

Own:
- shared anatomy
- shared state logic
- control-specific CSS

First-pass primitives:
1. `BevelBox`
2. `WindowFrame`
3. `TitleBar`
4. `Button`
5. `Field`
6. `Checkbox`
7. `Radio`
8. `Divider`
9. `Scrollbar`

Rule:
- if a value is specific to one control family, keep it in component CSS until repeated usage proves it should become a token

### 4. Layout / shells / composites

Own:
- desktop window composition
- taskbar composition
- dialog composition
- start-menu or menu assemblies

Examples:
- desktop window shell
- taskbar/start strip
- dialog footer/action layout

Rule:
- these should assemble primitives; they should not redefine bevel grammar or duplicate button chrome

### 5. App surfaces

Own:
- route-level validation and product pages

Target surfaces:
- `/components` for primitive validation and state galleries
- `/` homepage for staged migration once primitives are trustworthy

Rule:
- route surfaces consume the system; they are not the place to invent new chrome rules

## Token boundary rules

Tokenize:
- shared palette
- shared text sizes and line heights
- shared border and bevel thickness relationships
- shared control heights when consistent across families
- resolution-mode layout scale values

Keep local to component CSS:
- one-off internal spacing
- layout decisions unique to a specific control
- temporary experiment values during validation

Promote from local CSS to tokens only after reuse is confirmed.

## Resolution split

### Resolution-invariant

These should stay stable unless Figma proves otherwise:
- bevel direction rules
- border hierarchy
- caption glyph proportions
- focus treatment
- disabled-state contrast logic

### Resolution-sensitive

These can vary between `800x600` and `640x480` modes:
- default window sizes
- desktop icon spacing
- taskbar density
- route/page gutters
- dialog max widths

## First implementation order

1. foundation tokens and resolution layering
2. bevel/surface shell
3. window shell primitives
4. buttons and icons
5. field family
6. checkbox/radio
7. divider
8. scrollbar if exact extraction is strong enough

## Guardrails

- Do not treat the current untracked `app/_components/ui/` draft as approved architecture.
- Do not migrate the homepage to shared primitives until `/components` is a useful validation surface.
- Do not encode one fixed desktop viewport into primitive CSS.
- Do not claim Figma-exact values until the shared file is accessible from the active MCP account.
