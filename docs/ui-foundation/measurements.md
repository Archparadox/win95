# UI Foundation Measurements

This document defines the normalized foundation measurements for the first four primitives only:

- Window
- Button
- Input
- Checkbox / Radio

Rules for confidence:

- `Exact` means the value was directly observable from the Figma metadata or sampled design-context output.
- `Inferred` means the value is derived from the sampled Figma code, the full-canvas screenshot, and the surrounding component geometry.

## Window

### Outer shell

- Window outer border: `2px` per side. `Exact`
- Inner bevel inset on shell: `1px` visual inset layer. `Exact`
- Title bar height: `40px`. `Exact`
- Title bar horizontal padding: left `8px`, right `4px`. `Exact`
- Title bar vertical padding: `4px`. `Exact`
- Gap between title text and actions: `8px`. `Inferred`
- Title bar action spacing: `4px`. `Exact`
- Window body gap between stacked sections: `24px`. `Exact`
- Window body padding: top `20px`, right `20px`, bottom `18px`, left `20px`. `Exact`

### Widths visible in Figma

- Narrow specimen window width: `259px`. `Exact`
- Wide specimen window width: `570px`. `Exact`

### Section rhythm inside windows

- Section title to section body gap: `16px`. `Exact`
- Typical control stack gap inside section body: `20px`. `Exact`
- Divider thickness: `4px`. `Exact`

## Button

### Text button

- Min width: `108px`. `Exact`
- Height: `41px`. `Exact`
- Horizontal padding: `14px`. `Exact`
- Vertical padding: `12px`. `Exact`
- Focus ring inset: `7px`. `Exact`

### Icon button

- Width: `40px`. `Exact`
- Height: `40px`. `Exact`
- Inner padding: `8px`. `Exact`
- Icon viewport inside button: `24px`. `Exact`
- Focus ring inset: `5px`. `Exact`

### Action button

- Width: `32px`. `Exact`
- Height: `32px`. `Exact`
- Inner padding: `8px`. `Exact`
- Icon viewport inside button: `12px`. `Exact`
- Focus ring inset: `6px`. `Inferred`

### Titlebar button

- In the sampled implementation, a compact titlebar control appears as `16x14` in the existing desktop runtime. `Repo value, not Figma authority`
- In the sampled Figma-based library work, titlebar controls were normalized closer to `28x28` inside a `40px` title bar. `Inferred`

Decision:

- For the reusable library, use the Figma window chrome proportions first.
- Treat old desktop titlebar button sizes as legacy runtime measurements, not foundation truth.

## Input

### Field shell

- Base field height: `28px`. `Inferred`
- Horizontal internal padding: `5px`. `Exact` from sampled field shell code
- Vertical internal padding: `4px`. `Exact`
- Focus ring inset: `3px`. `Exact`
- Sunken border depth: `2px` outer edge pattern. `Exact`

### Labeled input variants from Figma

- Vertical labeled specimen block height: `59px`. `Exact`
- Horizontal labeled specimen block height: `40px`. `Exact`
- Input specimen width: `288px`. `Exact`

### Compound inputs

- Number field stepper column width: `18px`. `Inferred from current implementation, visually consistent with Figma`
- Select trigger button width: `18px`. `Inferred`
- Color swatch size in compact field: `14px`. `Inferred from current sample implementation`

### Label layout

- Vertical field gap: `4px`. `Exact in current implementation, visually consistent with Figma`
- Horizontal label column width: `74px`. `Inferred normalization`
- Horizontal label/content gap: `10px`. `Exact in current implementation, visually consistent with Figma`

## Checkbox / Radio

### Shared row layout

- Control column width: `16px`. `Exact in current and prior implementations`
- Gap between control and label: `8px`. `Exact`

### Checkbox control

- Box size: `14x14`. `Exact`
- Internal selected glyph size: `10px` target viewport, visually occupying less. `Inferred`
- Focus treatment inset expansion around control: `4px` outward. `Exact in earlier panel implementation`

### Radio control

- Outer size: `14x14`. `Exact`
- Dot size: `4x4`. `Exact`
- Shape: circle. `Exact`

## Typography

### Figma font family

- The sampled Figma code references `font-['W95FA:Regular',sans-serif]`. `Exact`

Working conclusion:

- Foundation font family: `W95FA`. `Exact from sampled Figma output`
- Fallback stack in code can still include system fonts, but `W95FA` is the design authority.

### Exact type values

- Body/control text size: `18px`. `Exact`
- Secondary label / specimen annotation size: `16px`. `Exact`
- Section heading size: `20px`. `Exact`
- Window title size: `18px`. `Exact`
- Line height: `normal`. `Exact`
- Letter spacing: not explicitly surfaced in sampled Figma output. Use `0`. `Inferred`

## Notes

- The biggest measurement uncertainty is the compact titlebar button size inside desktop runtime code; the current repo contains an older implementation that does not fully match the Figma-derived chrome.
- For Window, Button, Input, and Checkbox / Radio, the values above should be treated as the current foundation contract unless future Figma access exposes contradictory exact measurements.
