# Win95 foundations restart spec

Date: 2026-04-01
Project: `website_port`
Status: foundation pass before any shared-library rebuild

## Purpose

This document re-establishes the visual and structural foundations for the next Win95 component-library attempt.
It intentionally starts from the reset state instead of reviving the deleted shared library.
The target is a compact, authentic Win95-feeling runtime system rather than a literal transcription of large Figma specimen measurements.

## Ground truths from the reset

- The previous shared UI library was intentionally removed and must not be restored as-is (`docs/handoffs/2026-04-01-reset-from-scratch.md:8-14`, `:25-34`, `:96-99`).
- The homepage desktop demo remains the active product/reference surface (`docs/handoffs/2026-04-01-reset-from-scratch.md:18-24`, `docs/handoffs/2026-04-01-next-session-figma-restart-brief.md:83-100`).
- The next attempt must start with foundations/tokens, then architecture, then primitives, then migration, using Figma as a structural reference instead of pixel authority (`docs/handoffs/2026-04-01-next-session-figma-restart-brief.md:50-59`, `:189-237`).
- Fidelity target is Win95-faithful in proportion, bevel logic, spacing rhythm, palette, and interaction language, but not museum-grade pixel tracing (`docs/handoffs/2026-04-01-next-session-figma-restart-brief.md:30-48`, `:184-187`).

## Authority order

1. **Compact runtime token values and homepage desktop demo** for density, scale, product intent, and currently working interaction feel (`app/page.tsx:1-4`, `app/_components/desktop/DesktopPortfolio/DesktopPortfolio.tsx:26-46`, `app/_components/ui/foundations/tokens.css:1-99`).
2. **External historical references** for optical sanity checks and original OS behavior.
3. **Figma file** (`vJFuCp7So8I9gtzg7ZJOTS`) for component anatomy, state structure, control relationships, and palette.
4. **Modern retro implementations** for semantic structure and coverage ideas, not visual authority.

If Figma and the homepage/historical references disagree, prefer the compact homepage/historical density for runtime sizing and use Figma to preserve anatomy and ratios.

## External reference stack

### Historical / behavioral references
- GUIdebook Win95 screenshots — authentic dialog, shell, and form density reference.
- The Windows Interface Guidelines for Software Design — stronger behavioral/system reference for windows, taskbar, menus, controls, and dialog layout.
- DOSBox-X Win95 screenshots — useful for authentic real-world dialogs, installers, device manager, and multi-step forms.

### Implementation-pattern references
- 98.css — semantic HTML/control mapping and faithful old-UI structure.
- XP.css — explicit control semantics, focus handling, and input/button structure.
- React95 — component inventory and packaging completeness reference.
- RetroBar — taskbar/start/open-window/tray model reference.

### Modern inspiration only
- `iiSmitty/my-website`
- `Yuteoctober/wins95Portfolio`

These can influence adaptation ideas, but they are not style authorities.

## Resolution strategy

The design system must eventually support two desktop presentation modes:
- `800x600`
- `640x480`

### Resolution decision for first pass
Use **800x600 as the first implementation target**.

Rationale:
- it is roomier for portfolio content,
- it provides a cleaner first validation surface,
- it still allows later contraction into a 640x480 mode if the system is built around relationships rather than hardcoded absolute layout assumptions.

Important clarification:

- `800x600` is a layout-scale target, not a mandate to enlarge every control.
- Control density should stay compact and close to the existing homepage unless a deliberate accessibility decision says otherwise.

### Non-negotiable resolution rule
Treat **relationships** as stable and **many dimensions** as adaptable.

Stable relationships include:
- outer border vs inner bevel thickness
- titlebar height vs caption-button height
- icon size vs label spacing
- scrollbar width vs button/input rhythm
- field padding vs text size
- taskbar height vs start button/window button rhythm

## Mobile rule

The system is **desktop-first**.

For this pass:
- do not optimize layout for mobile yet,
- do keep semantic structure and interaction layering flexible enough for later mobile fallbacks,
- do avoid introducing assumptions that only work with desktop affordances forever.

The current code already contains a minimal responsive fallback for desktop windows and taskbar wrapping (`app/_components/desktop/DesktopWindow/DesktopWindow.module.css:149-165`, `app/_components/desktop/Taskbar/Taskbar.module.css:217-220`). Keep that principle, but do not let it drive the first-pass design system.

## Figma inventory confirmed this session

Figma MCP access successfully authenticated and metadata was readable before hitting Starter-plan tool-call limits.

Confirmed component families from metadata:
- `Buttons` — node `7:34`
- `Input` — node `8:88`
- `Icons` — node `10:572`
- `Dialog` — node `28:2371`
- `Scrollbar` — node `28:1927`
- `Dropdown menu` — node `36:1793`
- `Divider` — node `26:1641`
- `Fieldset` — node `34:6219`
- `Tabs` — node `71:4170`
- `Slider` — node `71:4282`
- `Progress bar` — node `75:1668`
- `Tooltip` — node `36:2324`
- `Alerts` — node `32:4727`

### Figma extraction caveat
Deeper `get_design_context` calls were blocked by the Starter-plan MCP rate limit during the earlier pass.

### Current retry blocker
On the latest retry pass, `whoami` still reports `alucardathird@gmail.com` on a Starter/View seat, and the MCP server is now rate-limited before a fresh metadata read can complete. Treat the extracted values below as secondary reference data from earlier sampled access to `vJFuCp7So8I9gtzg7ZJOTS`, but leave room for revalidation if the live MCP session later exposes contradictory data.

Therefore this restart spec distinguishes:
- **confirmed exact** — directly observed from current codebase or Figma metadata
- **needs exact extraction** — should be pulled from Figma once tool-call budget is available again
- **inferred** — safe interim relationship guidance derived from current implementation + historical references

## Foundation categories

| Category | Current evidence | Figma authority | Status for restart |
| --- | --- | --- | --- |
| Base typography | `app/globals.css:11-18` uses Tahoma/MS Sans Serif at `11px` with `1.2` line-height | Input/Dialog/Text nodes | inferred-valid until exact Figma text extraction |
| Desktop background | `app/globals.css:7-8` and subpage shell use teal desktop tones | desktop/surface references outside current sampled nodes | inferred-valid |
| Window outer chrome | `DesktopWindow.module.css:1-7` and `SubpageWindow.module.css:10-17` | Dialog/window family | inferred-valid, needs exact Figma confirmation |
| Active titlebar | `DesktopWindow.module.css:29-45` | Dialog heading | inferred-valid, needs exact Figma confirmation |
| Caption buttons | `DesktopWindow.module.css:47-69` | Dialog heading / icon buttons | inferred-valid, needs exact Figma confirmation |
| Body/menu spacing | `DesktopWindow.module.css:115-129` | Dialog spacing variants | needs exact extraction |
| Taskbar rhythm | `Taskbar.module.css:9-24`, `:26-63`, `:79-173` | external shell refs + likely homepage behavior | inferred-valid |
| Scrollbar track/thumb/buttons | `ScrollFrame.module.css` current demo implementation | `Scrollbar` node `28:1927` | needs exact extraction |
| Form controls | current subpage button chrome only; shared controls removed | `Input`, `Checkboxes`, `Radios`, `Dropdown menu` | needs exact extraction |
| Icons | current demo glyphs are local CSS/shape approximations | `Icons` node `10:572` | needs exact extraction |

## Foundation rules to preserve

### 1. Typography mood
- Base UI text remains compact and dense.
- 11px body-scale text is a strong current signal (`app/globals.css:11-18`) and should remain the default until Figma proves otherwise.
- Heading hierarchy may expand for portfolio readability, but controls should stay compact.

### 2. Border and bevel grammar
- Outer window chrome currently uses a light top/left and dark bottom/right edge (`DesktopWindow.module.css:1-7`).
- Pressed states invert the highlight/shadow relationship (`DesktopWindow.module.css:65-68`, `Taskbar.module.css:41-45`).
- This inversion rule is more important than any one literal pixel count.

### 3. Control rhythm
- Current demo signals a compact control family: title buttons `16x14`, caption glyphs `8x8`, standard taskbar/button height around `21px`, taskbar bar height `32px` (`DesktopWindow.module.css:52-76`, `Taskbar.module.css:17`, `:30-38`, `:141-169`).
- These values are provisional relationship anchors for the first architecture pass, not permanent truth.

### 4. Interaction states
- Default / active / focused / disabled states must be explicit primitives, not ad-hoc one-off styles.
- XP.css and the Windows guidelines are useful for semantics and focus behavior; the compact runtime system remains the visual authority.

### 5. Desktop shell behavior
- Start area, open-window strip, tray/clock separation should remain part of the product metaphor (`Taskbar.module.css:79-173`).
- Avoid replacing this with a modern header/navigation abstraction.

## Exact vs inferred ledger

### Confirmed exact this session
- Current app base text defaults: Tahoma-ish stack, `11px`, line-height `1.2` (`app/globals.css:11-18`).
- Current homepage is the live reference surface (`app/page.tsx:1-4`).
- `/components` is the current validation surface (`app/components/page.tsx:9-26`).
- Figma contains the required component families listed above.

### Figma values kept as secondary reference data
- **Dialog heading height**: `40px` sampled from Figma.
- **Text button**: `41px` sampled from Figma.
- **Icon button**: `40px × 40px` sampled from Figma.
- **Action button**: `32px × 32px` sampled from Figma.
- **Canonical field width**: `288px` sampled from Figma.
- **Checkbox row height**: `24px`; **radio row height**: `22px` sampled from Figma.

These values are useful as proportion references, but they do not override the compact runtime scale.

### Runtime compact foundation values
- **Titlebar height**: `18px` runtime authority (`app/_components/ui/foundations/tokens.css:34`).
- **Text button height**: `23px` runtime authority (`app/_components/ui/foundations/tokens.css:41`).
- **Icon button size**: `23px` runtime authority (`app/_components/ui/foundations/tokens.css:45`).
- **Caption button size**: `16px × 14px` runtime authority (`app/_components/ui/foundations/tokens.css:47-49`).
- **Field control height**: `21px` runtime authority (`app/_components/ui/foundations/tokens.css:52`).
- **Field width**: `220px` runtime authority (`app/_components/ui/foundations/tokens.css:51`).
- **Checkbox / radio row height**: `19px` runtime authority (`app/_components/ui/foundations/tokens.css:61-62`).
- **Scrollbar thickness**: `16px` runtime authority (`app/_components/ui/foundations/tokens.css:68`).

### Relationship rules kept for the runtime system
- **Titlebar and primary controls should feel rhythmically related**, even when runtime values are compact.
- **Caption controls stay one size family down from standard controls**.
- **Scrollbar thickness should align with compact caption/control rhythm rather than become a separate oversized element**.
- **Spacing should use a small repeatable ladder instead of arbitrary gaps**.
- **Bevel logic is more important than literal pixel constants**: raised surfaces use light top/left and dark bottom/right; pressed surfaces invert that hierarchy. `Portable inference`

### Still inferred or pending exact extraction
- full color-token naming/alias map
- exact icon family coverage beyond the first interaction set
- field internal border anatomy and focus ring treatment for every input family
- dropdown/menu item internals beyond sampled metadata

### Safe inferences for architecture work now
- split tokens into invariant micro-geometry vs resolution-sensitive layout scale
- use 800x600 as first implementation mode
- preserve compact Win95 control density
- rebuild via primitives first, not page migration first

## Immediate output of this document

This spec is sufficient to begin:
1. token architecture design
2. primitive/component boundary definition
3. phased implementation planning

It is sufficient for the first-pass primitives implemented from this restart. Live MCP revalidation is still desirable later because the active session is rate-limited, but the runtime source of truth remains the compact token system in code.
