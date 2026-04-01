# Reset library, keep homepage demo — 2026-04-01

## Scope
Bounded to removing the reusable `/components` library attempt while preserving the working homepage desktop demo and existing subpages.

Files/areas in scope:
- `app/components/*`
- `app/globals.css`
- `components/ui/**`
- `components/desktop/Taskbar/*`
- `components/desktop/DesktopWindow/*`
- `components/desktop/ScrollFrame/*`
- `components/desktop/DesktopPortfolio/DesktopPortfolio.module.css`
- `components/subpage/SubpageWindow/*`
- `lib/ui/**`
- handoff/docs updates only for future-session continuity

## Behavior lock
Run current verification before edits:
- `npm run lint`
- `npx tsc --noEmit`
- `npm run build`

## Cleanup smells and order
1. Dead code deletion: remove `/components` library page surface and obsolete library primitives.
2. Boundary repair: move homepage/subpage chrome off `components/ui` and back into local demo-specific code.
3. Token removal: remove global token system and replace remaining demo usage with local literals.
4. Documentation: write a fresh handoff explaining the reset, what remains working, and where to restart next time.

## Intended end state
- Homepage desktop demo still works.
- About/work/projects subpages still work.
- `/components` is no longer the failed library showcase; it becomes a minimal reset page.
- No `components/ui` tokenized library remains.
- A future-session handoff is written and saved.
