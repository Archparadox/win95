# UI library next steps — 2026-04-01

## Requirements summary

Grounded from the session handoff plus current repo state:

- A tokenized UI foundation is already in place in `app/globals.css:1-103` and the new primitives are exported from `components/ui/index.ts:1-21`.
- The biggest remaining integration blocker is `WinButton`: the newer `Button` surface only supports `text | icon | action | titlebar` in `components/ui/Button/Button.tsx:6-18`, while `WinButton` still owns `taskbar`, `scrollbar`, and link-button usage in `components/ui/WinButton/WinButton.tsx:14-28` and `:36-77`.
- `WinButton` is still used in four places, not three: `components/desktop/Taskbar/Taskbar.tsx:4-97`, `components/desktop/DesktopWindow/DesktopWindow.tsx:4-89`, `components/desktop/ScrollFrame/ScrollFrame.tsx:5-142`, and `components/subpage/SubpageWindow/SubpageWindow.tsx:2-66`.
- There is an intentional design tension between the new library titlebar sizing (`components/ui/Button/Button.module.css:49-55`) and the legacy runtime titlebar sizing still embedded in `components/ui/WinButton/WinButton.module.css:122-144`.
- A small token follow-up is still needed: `components/desktop/DesktopPortfolio/DesktopPortfolio.module.css:1-109` now consumes shared aliases, but it still references `var(--desktop)` at line 6 even though `app/globals.css:1-60` does not define that alias.
- The docs establish current design authority and should remain the source of truth for migration decisions: `docs/ui-foundation/measurements.md`, `docs/ui-foundation/states.md`, `docs/ui-foundation/mismatches.md`.

## Acceptance criteria

1. Desktop and subpage surfaces no longer import from `components/ui/WinButton/WinButton`.
2. Any remaining button primitive(s) fully cover the currently used runtime surfaces: taskbar button, compact titlebar control, scrollbar button, and link-button behavior.
3. `components/ui/WinButton/*` can be removed without breaking `npm run lint` or `npm run build`.
4. Global tokens remain centralized and all referenced aliases are defined.
5. Structural refactors happen only after the runtime migration layer is stable.

## Recommended implementation order

### 1. Finish the button bridge before any folder-architecture refactor

Why first:

- The current `Button` API is not yet a drop-in replacement for `WinButton`.
- Refactoring folder structure before this migration would create two moving targets.

Scope:

- Extend or wrap the new primitives so they cover the missing runtime surfaces:
  - `taskbar`
  - `scrollbar`
  - link-button rendering
  - compact legacy titlebar glyph/button presentation
- Keep the source of truth in the newer primitives where possible; use thin compatibility wrappers if that reduces churn.

Primary files:

- `components/ui/Button/Button.tsx:6-74`
- `components/ui/Button/Button.module.css:1-90`
- `components/ui/Icon/Icon.tsx` / icon CSS if new glyph handling is needed
- optionally `components/ui/TitleBar/TitleBar.tsx:1-30` if titlebar actions should become composable instead of hard-coded

### 2. Migrate all remaining WinButton consumers in one bounded pass

Target files:

- `components/desktop/Taskbar/Taskbar.tsx:37-97`
- `components/desktop/DesktopWindow/DesktopWindow.tsx:59-89`
- `components/desktop/ScrollFrame/ScrollFrame.tsx:90-142`
- `components/subpage/SubpageWindow/SubpageWindow.tsx:34-66`

Notes:

- Treat `SubpageWindow` as part of the migration scope even though it was missing from the handoff list.
- The migration should preserve current behavior first; visual tuning can happen after the old imports are gone.

### 3. Remove WinButton and its duplicate styling only after imports hit zero

Delete only when the search is clean:

- `components/ui/WinButton/WinButton.tsx`
- `components/ui/WinButton/WinButton.module.css`
- `components/ui/WinButton/index.ts`

Verification gate:

- `rg -n "WinButton" components app lib`
- `npm run lint`
- `npm run build`

### 4. Do the architecture split as the next milestone, not the current one

After the runtime migration is stable:

- split `Field` into dedicated control files/components
- then reorganize the flatter `components/ui/*` layout into the fuller approved structure
- only then consider overlays and style-file extraction

Reason:

- Right now `Field` and button compatibility are still active moving pieces; splitting structure first would increase churn without unlocking removal of legacy code.

### 5. Fold in the small token/authority cleanups during or immediately after migration

Small but concrete follow-ups:

- define/replace the missing desktop alias used at `components/desktop/DesktopPortfolio/DesktopPortfolio.module.css:6`
- reconcile body typography in `app/globals.css:73-80` with the documented `W95FA` authority from `docs/ui-foundation/measurements.md`
- if desired, move tokens from `app/globals.css` into dedicated style files only after the migration above is complete

## Risks and mitigations

- **Risk:** New `Button` variants drift away from the approved Figma-derived library.
  - **Mitigation:** keep legacy-only sizing/behavior explicitly scoped to desktop runtime compatibility, not the base design spec.
- **Risk:** Deleting `WinButton` too early breaks subpages because `SubpageWindow` was omitted from the handoff.
  - **Mitigation:** include `SubpageWindow` in the migration grep/verification gate.
- **Risk:** Architecture refactor and migration overlap, causing noisy diffs.
  - **Mitigation:** finish the compatibility migration first, then restructure.

## Verification steps

- `rg -n "WinButton|WinIconButton|WinLinkButton" components app lib`
- `npm run lint`
- `npm run build`
- manual visual spot-check of:
  - taskbar buttons
  - desktop titlebar controls
  - custom scrollbars
  - subpage action buttons

## Immediate next slice

If you want the next implementation task to stay narrow, the best slice is:

**"Add the missing button compatibility surface to the new UI primitives, then migrate `Taskbar` and `SubpageWindow` first."**

That proves the bridge on both button and link-button usage before touching the trickier `DesktopWindow` and `ScrollFrame` cases.
