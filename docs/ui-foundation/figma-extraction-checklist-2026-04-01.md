# Figma extraction checklist — Win95 restart

Date: 2026-04-01
File: `vJFuCp7So8I9gtzg7ZJOTS`
Purpose: resume exact measurement extraction without re-discovery when MCP tool-call budget is available again.

## Priority order

1. Buttons
2. Dialog / dialog heading
3. Inputs
4. Checkboxes / radios
5. Icons
6. Scrollbar
7. Dropdown menu
8. Divider / fieldset

## Canonical node map

### Buttons
- Frame: `7:34` — `Buttons`
- Representative child families seen in metadata:
  - default/highlighted/active/focused/disabled button states
  - icon buttons
  - action buttons

Extract:
- outer size
- inner bevel thickness
- text padding
- state deltas (default vs active vs focused vs disabled)
- icon button vs text button relationship

### Inputs
- Frame: `8:88` — `Input`
- Includes:
  - text input
  - number input
  - color input
  - select input
  - selection list
  - combo box
  - checkboxes
  - radios

Extract:
- label-to-field spacing
- vertical vs horizontal label layout differences
- input height, field padding, border/bevel anatomy
- focused state treatment
- disabled text and surface treatment
- checkbox/radio control box/circle geometry
- spacing between control and label text

### Dialog
- Frame: `28:2371` — `Dialog`
- Includes dialog heading variants and spacing variants.

Extract:
- titlebar height
- caption button spacing and alignment
- body padding by dialog size variant
- footer/action row spacing
- content group spacing rhythm

### Icons
- Frame: `10:572` — `Icons`

Extract:
- canonical icon box sizes
- small vs default chevrons
- close/minimize/maximize glyph boxes
- disabled icon treatment
- alert icon sizes

### Scrollbar
- Frame: `28:1927` — `Scrollbar`

Extract:
- track thickness
- thumb size minimums
- arrow button size
- corner block treatment
- horizontal vs vertical relationship

### Dropdown menu
- Frame: `36:1793` — `Dropdown menu`

Extract:
- menu container padding
- item row height
- selected state fill/text treatment
- submenu icon/right-chevron alignment
- checkbox/radio item internal spacing
- separator spacing and thickness

### Divider
- Frame: `26:1641` — `Divider`

Extract:
- horizontal divider anatomy
- vertical divider anatomy
- dropdown divider differences

### Fieldset
- Frame: `34:6219` — `Fieldset`

Extract:
- label notch treatment
- inner padding
- border relationship to surrounding controls

## Extraction ledger format

For every extracted measurement, log:
- token/properties name
- value
- source node id
- source variant/state
- exact or inferred
- resolution-sensitive or invariant
- note if it differs from current demo CSS

## Immediate implementation handoff after extraction

Once the above is captured, implement in this order:
1. `app/_components/ui/foundations/tokens.css`
2. `app/_components/ui/foundations/resolutions.css`
3. `app/_components/ui/primitives/BevelBox`
4. `app/_components/ui/primitives/WindowFrame`
5. `app/_components/ui/primitives/TitleBar`
6. `app/_components/ui/primitives/Button`
