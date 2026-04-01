# Handoff — reset from scratch after removing the failed UI library attempt

Date: 2026-04-01
Project: `website_port`

## What happened in this session

The previous reusable UI library attempt was intentionally rolled back.

User direction for this session was:
- remove all tokens
- remove every component that was being presented on the `/components` library page
- keep the homepage desktop demo working, because that is still the active reference/demo
- document the resulting state for the next session

## Current state after cleanup

### Kept working
- Homepage desktop demo (`/`) remains the active reference surface.
- Subpages still work:
  - `/about`
  - `/work`
  - `/projects`

### Removed
- The tokenized global UI-library variables were removed from `app/globals.css`.
- The `components/ui` library folder was removed.
- The `lib/ui` helper folder was removed.
- The `/components` page is no longer a component library showcase.

### Replaced
- Desktop runtime chrome now uses local/demo-specific markup and CSS again instead of shared UI-library primitives.
- `SubpageWindow` now uses local/demo-specific button/chrome markup instead of the shared UI library.
- `/components` is now a minimal placeholder/reset page rather than a showcase.

## Files changed in the reset

### Core reset files
- `app/components/page.tsx`
- `app/components/page.module.css`
- `app/globals.css`

### Homepage / desktop demo kept alive without shared UI library
- `components/desktop/Taskbar/Taskbar.tsx`
- `components/desktop/Taskbar/Taskbar.module.css`
- `components/desktop/DesktopWindow/DesktopWindow.tsx`
- `components/desktop/DesktopWindow/DesktopWindow.module.css`
- `components/desktop/ScrollFrame/ScrollFrame.tsx`
- `components/desktop/ScrollFrame/ScrollFrame.module.css`
- `components/desktop/DesktopPortfolio/DesktopPortfolio.module.css`

### Subpages kept alive without shared UI library
- `components/subpage/SubpageWindow/SubpageWindow.tsx`
- `components/subpage/SubpageWindow/SubpageWindow.module.css`

### Deleted during reset
- entire `components/ui/` folder
- entire `lib/ui/` folder

## Important interpretation for next session

The old library/foundation direction is **not** the active plan anymore.

Treat these as historical context only, not as current implementation targets:
- `docs/ui-foundation/measurements.md`
- `docs/ui-foundation/states.md`
- `docs/ui-foundation/mismatches.md`
- earlier `.omx/plans/*` files about the reusable library structure

The active truth is now:
1. homepage desktop demo first
2. start over from scratch later
3. do not assume the removed token system or deleted `components/ui` primitives should come back unchanged

## Verified after reset

Passed:
- `rg -n "components/ui|@/components/ui" app components lib docs` → no remaining refs
- `rg -n 'var\(--win-|var\(--surface|var\(--text|var\(--accent|var\(--desktop|var\(--taskbar-height' app components lib docs` → no remaining design-token refs
- `npm run lint`
- `npx tsc --noEmit`
- `npm run build`

## Best restart point for next session

When we continue, start with a clean design discussion around **what the new component/library effort should be**, using the homepage demo as the practical visual reference.

Recommended restart sequence:
1. inspect homepage demo and decide what is worth extracting
2. decide whether the next attempt should be:
   - a true reusable library, or
   - a better-organized demo system first
3. define boundaries before building anything shared
4. only then create new primitives/components, one family at a time

## Warning for future session

Do **not** begin by resurrecting deleted `components/ui` files or reintroducing the old global tokens.
If a new shared system is created, it should be designed fresh from the homepage/demo needs, not restored from the removed attempt.
