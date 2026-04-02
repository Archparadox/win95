# UI Foundation Mismatches

This document resolves conflicts between:

- the full-canvas screenshot and sampled screenshots
- the Figma metadata and design-context output
- the current repo implementation

Scope is limited to the first four primitives:

- Window
- Button
- Input
- Checkbox / Radio

## Resolution Rule

When homepage/historical references and Figma disagree:

- Compact runtime values and the homepage-authentic density win for sizing.
- Historical references win for optical rhythm and shell feel.
- Figma wins for anatomy, state structure, and proportion checks when it does not conflict with compact runtime density.
- Existing repo code only matters when it has already been promoted into the shared compact token system.

## Window

### Known conflict areas

- Existing desktop runtime uses a gradient active title bar.
- Sampled Figma window chrome reads as flatter and stricter in color treatment.
- Sampled Figma titlebar/caption measurements are much larger than the compact runtime system.

### Winner

- Compact runtime system wins for:
  - title bar height
  - titlebar button size
  - window body spacing when preserving compact density
- Figma wins for:
  - titlebar anatomy
  - shell proportion relationships
- Screenshot/historical refs may refine:
  - exact visual weight of the blue title area
  - perceived border contrast

### Build rule

- Keep the compact titlebar and caption-button scale.
- Avoid inheriting the desktop runtime gradient into the reusable component library unless it is intentionally chosen as the canonical active-title treatment.
- Use Figma to check relationships, not to force oversized chrome.

## Button

### Known conflict areas

- Screenshot can make the focus ring and disabled embossing feel slightly heavier than the extracted code suggests.
- Figma button specimens are larger than the desired runtime control density.

### Winner

- Compact runtime system wins for:
  - width
  - height
  - padding
- Figma wins for:
  - state list
  - bevel direction changes
  - control family relationships
- Screenshot may refine:
  - dotted ring thickness perception
  - disabled text embossing intensity

### Build rule

- If Figma geometry conflicts with compact Win95 density, keep compact runtime geometry.
- If bevel or disabled text looks visually weak compared with the screenshot, tune rendering while preserving the compact runtime geometry.

## Input

### Known conflict areas

- Sparse Figma extraction exposed specimen widths and labeled block heights clearly, but not every small accessory measurement.
- Current runtime system intentionally compacts fields below the Figma specimen scale.

### Winner

- Compact runtime system wins for:
  - field heights
  - field widths
  - trigger sizes
- Figma wins for:
  - state model
  - vertical vs horizontal label structure
- Screenshot may refine:
  - exact compact stepper/button optical size
  - focus ring weight

### Build rule

- Preserve compact runtime field widths and heights.
- Preserve Figma-derived label structures and state behavior.
- Use screenshots/historical refs to fine-tune accessory control proportions.

## Checkbox / Radio

### Known conflict areas

- The compact runtime checkbox/radio sizes align better with the homepage and historical refs than the larger Figma specimen scale.
- Focus treatment placement can appear either on control, label, or row depending on view context.

### Winner

- Compact runtime system wins for:
  - control size
  - row density
- Figma wins for:
  - available states
  - checked vs unchecked structure
  - disabled and focused combinations
- Screenshot wins for:
  - practical focus placement if the Figma sample is ambiguous
  - optical balance of check glyph and radio dot inside the control

### Build rule

- Keep the compact runtime `13x13` control size and `4px` radio dot unless the compact token system is deliberately revised.
- Where focus placement is ambiguous, prefer the screenshot behavior that reads best and is most accessible.

## Current Implementation Gaps

These are not unresolved conflicts. They are known mismatches between the current repo and the foundation spec:

- Window typography is intentionally aligned to the compact runtime stack instead of `W95FA`.
- Desktop runtime title bars still use the older gradient treatment.
- Button, input, and checkbox/radio families are partially normalized but not yet split into the final folder/component architecture.
- Some measurements in implementation are normalized approximations pending deeper historical/Figma comparison.

## Final Authority by Primitive

| Primitive | Geometry authority | Rendering nuance authority | Notes |
| --- | --- | --- | --- |
| Window | Compact runtime tokens | Homepage + historical refs | Figma checks anatomy and relationships |
| Button | Compact runtime tokens | Homepage + historical refs | Figma checks states and family relationships |
| Input | Compact runtime tokens | Homepage + historical refs | Figma checks structures and variants |
| Checkbox / Radio | Compact runtime tokens | Homepage + historical refs | Figma checks state model |
