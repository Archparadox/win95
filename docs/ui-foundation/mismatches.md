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

When screenshot and Figma disagree:

- Figma wins for geometry, sizing, spacing, and state definitions.
- Screenshot wins only when it reveals rendering nuance that the sparse Figma metadata did not expose, such as anti-aliasing behavior, perceived stroke weight, or embossed disabled treatment.
- Existing repo code never overrides Figma; it is implementation history, not source of truth.

## Window

### Known conflict areas

- Existing desktop runtime uses a gradient active title bar.
- Sampled Figma window chrome reads as flatter and stricter in color treatment.
- Existing desktop runtime titlebar controls are smaller than the normalized Figma-derived chrome.

### Winner

- Figma wins for:
  - title bar height
  - title bar padding
  - window body spacing
  - general shell proportions
- Screenshot may refine:
  - exact visual weight of the blue title area
  - perceived border contrast

### Build rule

- Use Figma proportions first.
- Avoid inheriting the desktop runtime gradient and compact titlebar button sizes into the reusable component library.

## Button

### Known conflict areas

- Screenshot can make the focus ring and disabled embossing feel slightly heavier than the extracted code suggests.
- Existing repo implementation grouped button states in a more normalized way than the Figma samples, which can flatten differences between highlighted and focused text buttons.

### Winner

- Figma wins for:
  - width
  - height
  - padding
  - state list
  - bevel direction changes
- Screenshot may refine:
  - dotted ring thickness perception
  - disabled text embossing intensity

### Build rule

- If exact measured geometry conflicts with screenshot perception, keep Figma geometry.
- If bevel or disabled text looks visually weak compared with the screenshot, tune rendering while preserving Figma dimensions.

## Input

### Known conflict areas

- Sparse Figma extraction exposed specimen widths and labeled block heights clearly, but not every small accessory measurement.
- Current repo implementation normalizes steppers and dropdown buttons to `18px`, which is visually plausible but not directly guaranteed by extracted Figma numbers.

### Winner

- Figma wins for:
  - labeled block heights
  - input specimen widths
  - state model
  - vertical vs horizontal label structure
- Screenshot may refine:
  - exact compact stepper/button optical size
  - focus ring weight

### Build rule

- Preserve Figma field widths, label structures, and state behavior.
- Use screenshot to fine-tune accessory button proportions only if Figma data is sparse.

## Checkbox / Radio

### Known conflict areas

- The checkbox/radio box sizes were clearly consistent in the old implementation and match the overall screenshot rhythm, but sampled Figma output for these controls was not as rich as for buttons.
- Focus treatment placement can appear either on control, label, or row depending on view context.

### Winner

- Figma wins for:
  - available states
  - checked vs unchecked structure
  - disabled and focused combinations
- Screenshot wins for:
  - practical focus placement if the Figma sample is ambiguous
  - optical balance of check glyph and radio dot inside the control

### Build rule

- Keep the `14x14` control size and `4px` radio dot unless future exact Figma extraction contradicts it.
- Where focus placement is ambiguous, prefer the screenshot behavior that reads best and is most accessible.

## Current Implementation Gaps

These are not unresolved conflicts. They are known mismatches between the current repo and the foundation spec:

- Window typography is not yet fully aligned to `W95FA`.
- Desktop runtime title bars still use the older gradient treatment.
- Button, input, and checkbox/radio families are partially normalized but not yet split into the final folder/component architecture.
- Some measurements in implementation are normalized approximations pending deeper Figma extraction access.

## Final Authority by Primitive

| Primitive | Geometry authority | Rendering nuance authority | Notes |
| --- | --- | --- | --- |
| Window | Figma | Screenshot secondary | Ignore old runtime gradient when building library primitives |
| Button | Figma | Screenshot secondary | Screenshot can tune disabled embossing and focus contrast |
| Input | Figma | Screenshot secondary where Figma is sparse | Accessory control sizes may still need one refinement pass |
| Checkbox / Radio | Figma for state model, screenshot for optical placement | Screenshot secondary | Use screenshot for final focus placement if Figma remains ambiguous |
