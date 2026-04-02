# UI Foundation Measurements

This document defines the compact runtime foundation measurements for the first four primitives only:

- Window
- Button
- Input
- Checkbox / Radio

Rules for confidence:

- `Runtime exact` means the value is directly encoded in the current compact token system.
- `Reference exact` means the value came from sampled Figma output or historical reference sampling.
- `Inferred` means the value is derived from references and the surrounding component geometry.

Implementation rule:

- Compact runtime values are the source of truth.
- Larger Figma specimen values are reference-only unless explicitly promoted into the runtime token set.

## Window

### Outer shell

- Window outer border: `2px` per side. `Runtime exact`
- Inner bevel inset on shell: `1px` visual inset layer. `Runtime exact`
- Title bar height: `18px`. `Runtime exact`
- Title bar horizontal padding: left `3px`, right `2px`. `Runtime exact`
- Title bar vertical padding: `2px`. `Runtime exact`
- Gap between title text and actions: `8px`. `Inferred`
- Title bar action spacing: `2px`. `Runtime exact`
- Window body gap between stacked sections: `10px`. `Runtime exact`
- Window body padding: `8px` on all sides. `Runtime exact`

### Runtime widths

- Narrow specimen window width: `260px`. `Runtime exact`
- Wide specimen window width: `420px`. `Runtime exact`

### Section rhythm inside windows

- Section title to section body gap: `8px`. `Inferred normalization`
- Typical control stack gap inside section body: `8px` to `10px`. `Runtime exact`
- Divider thickness: `2px`. `Runtime exact`

### Secondary Figma reference

- Figma sampled window titlebar: `40px`. `Reference exact`
- Figma sampled narrow window width: `259px`. `Reference exact`
- Figma sampled wide window width: `570px`. `Reference exact`

## Button

### Text button

- Min width: `75px`. `Runtime exact`
- Height: `23px`. `Runtime exact`
- Horizontal padding: `12px`. `Runtime exact`
- Vertical padding: `0px`. `Runtime exact`
- Focus ring inset: `4px`. `Runtime exact`

### Icon button

- Width: `23px`. `Runtime exact`
- Height: `23px`. `Runtime exact`
- Icon viewport inside button: `12px`. `Runtime exact`
- Focus ring inset: `3px`. `Runtime exact`

### Action button

- Width: `16px`. `Runtime exact`
- Height: `16px`. `Runtime exact`
- Icon viewport inside button: `8px` to `12px`. `Inferred`
- Focus ring inset: `3px`. `Runtime exact`

### Titlebar button

- Runtime titlebar control: `16x14`. `Runtime exact`
- Caption icon box: `8px`. `Runtime exact`
- Larger Figma caption/action button family (`32px`) remains secondary reference data. `Reference exact`

Decision:

- For the reusable library, use the compact runtime caption/button scale.
- Treat larger Figma caption/button sizes as proportion references, not foundation truth.

## Input

### Field shell

- Base field height: `21px`. `Runtime exact`
- Horizontal internal padding: `3px`. `Runtime exact`
- Vertical internal padding: `2px`. `Runtime exact`
- Focus ring inset: `3px`. `Runtime exact`
- Sunken border depth: `2px` outer edge pattern. `Runtime exact`

### Labeled input variants from Figma

- Vertical labeled specimen block height: `36px`. `Runtime exact`
- Horizontal labeled specimen block height: `23px`. `Runtime exact`
- Input specimen width: `220px`. `Runtime exact`

### Compound inputs

- Number/select trigger width: `18px`. `Runtime exact`
- Color swatch size in compact field: `14px`. `Inferred`

### Label layout

- Vertical field gap: `3px`. `Runtime exact`
- Horizontal label column width: `68px`. `Runtime exact`
- Horizontal label/content gap: `8px`. `Runtime exact`

### Secondary Figma reference

- Figma sampled vertical field height: `59px`. `Reference exact`
- Figma sampled horizontal field height: `40px`. `Reference exact`
- Figma sampled field width: `288px`. `Reference exact`

## Checkbox / Radio

### Shared row layout

- Control column width: `16px`. `Runtime exact`
- Gap between control and label: `8px`. `Runtime exact`

### Checkbox control

- Box size: `13x13`. `Runtime exact`
- Internal selected glyph size: `8px` to `10px`. `Inferred`
- Focus treatment inset expansion around control: `6px` outward. `Runtime exact`

### Radio control

- Outer size: `13x13`. `Runtime exact`
- Dot size: `4x4`. `Runtime exact`
- Shape: circle. `Runtime exact`

## Typography

### Runtime typography

- Foundation font family: `Tahoma, "MS Sans Serif", "Microsoft Sans Serif", sans-serif`. `Runtime exact`
- Body/control text size: `11px`. `Runtime exact`
- Secondary label / kicker size: `11px`. `Runtime exact`
- Compact specimen heading size: `11px` to `14px` depending on context. `Runtime exact + inferred`
- Window title size: `11px`. `Runtime exact`
- Line height: `1.2`. `Runtime exact`
- Letter spacing: `0`. `Runtime exact`

### Secondary Figma reference

- Sampled Figma font family reference: `W95FA`. `Reference exact`
- Larger sampled Figma type sizes should not override the compact runtime system by default.

## Notes

- The old large Figma specimen values are still useful as relationship checks.
- For Window, Button, Input, and Checkbox / Radio, the compact runtime values above are the current foundation contract unless the runtime token system itself is deliberately changed.
