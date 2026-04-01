# UI Foundation States

This document defines a compact state and variant matrix for the first four primitives only:

- Window
- Button
- Input
- Checkbox / Radio

## Window

### Variants

- `narrow`
- `wide`

### States

- `active`
- `inactive`

### Visual changes by state

| Primitive | Variant | State | Visual change |
| --- | --- | --- | --- |
| Window | narrow, wide | active | Title bar uses deep blue fill, white title text, high-contrast chrome |
| Window | narrow, wide | inactive | Title bar shifts to inactive gray treatment, content shell remains unchanged |

## Button

### Variants

- `text`
- `icon`
- `action`
- `titlebar`

### States

- `default`
- `highlighted` for text button only
- `active`
- `focused`
- `disabled`

### Visual changes by state

| Primitive | Variant | State | Visual change |
| --- | --- | --- | --- |
| Button | all | default | Raised bevel, gray surface, black text or icon |
| Button | text | highlighted | Stronger outer/inner contrast, emphasized shell, not yet pressed |
| Button | all | active | Bevel direction inverts to pressed/sunken look, content shifts about `1px` down-right |
| Button | all | focused | Dotted black focus ring appears inside control; shell remains in focus treatment |
| Button | all | disabled | Structure remains raised, label/icon shifts to muted gray, embossed white text shadow appears |

## Input

### Variants

- `text`
- `number`
- `color`
- `select`
- label layout `vertical`
- label layout `horizontal`

### States

- `default`
- `focused`
- `disabled`

### Visual changes by state

| Primitive | Variant | State | Visual change |
| --- | --- | --- | --- |
| Input | all | default | Sunken white field, dark top/left, light right/bottom, black text |
| Input | all | focused | Inner black focus indication appears; structure otherwise unchanged |
| Input | all | disabled | Field background shifts toward gray, text becomes muted, embossed white shadow appears |
| Input | number | default/focused/disabled | Adds compact vertical stepper buttons |
| Input | color | default/focused/disabled | Adds color swatch inside field |
| Input | select | default/focused/disabled | Adds dropdown trigger button |

## Checkbox / Radio

### Variants

- `checkbox`
- `radio`

### States

- `unchecked`
- `checked`
- `focused`
- `disabled unchecked`
- `disabled checked`

### Visual changes by state

| Primitive | Variant | State | Visual change |
| --- | --- | --- | --- |
| Checkbox | checkbox | unchecked | Sunken square, empty interior |
| Checkbox | checkbox | checked | Sunken square with check glyph |
| Checkbox | checkbox | focused | Dotted focus treatment appears around control or associated label |
| Checkbox | checkbox | disabled unchecked | Shell remains visible, label and any glyph area mute to disabled colors |
| Checkbox | checkbox | disabled checked | Checked mark remains visible but muted, embossed disabled text treatment on label |
| Radio | radio | unchecked | Sunken circular control, empty interior |
| Radio | radio | checked | Sunken circular control with centered dot |
| Radio | radio | focused | Dotted focus treatment appears around control or associated label |
| Radio | radio | disabled unchecked | Muted circular shell and disabled label treatment |
| Radio | radio | disabled checked | Dot remains visible in muted state, disabled label treatment applies |

## State Priority

When more than one state applies, use this precedence:

1. `disabled`
2. `focused`
3. `active`
4. `highlighted`
5. `default`

Notes:

- `disabled` suppresses active interaction while preserving layout.
- `focused` must remain visible even when paired with `checked`.
- `highlighted` is specific to text button presentation and should not be generalized to all controls.
