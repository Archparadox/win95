# Components page rebuild execution plan — 2026-04-01

## Scope

Bounded to:
- key-finding fixes in the current UI/runtime bridge
- the `/components` showcase page
- page-only showcase panel components that should not remain part of the reusable library surface

Files/areas in scope:
- `components/ui/Button/*`
- `components/ui/index.ts`
- `components/ui/WinButton/*`
- `components/desktop/Taskbar/*`
- `components/desktop/DesktopWindow/*`
- `components/desktop/ScrollFrame/*`
- `components/subpage/SubpageWindow/*`
- `components/desktop/DesktopPortfolio/DesktopPortfolio.module.css`
- `app/globals.css`
- `app/components/*`
- current page-only panel components under `components/ui/*Panel/`

## Behavior lock / baseline

Because the repo has no dedicated test runner configured, lock current behavior with existing project verification before edits:
- `npm run lint`
- `npx tsc --noEmit`
- `npm run build`

## Cleanup smells and order

1. **Boundary violation**
   - `WinButton` still owns runtime-only variants and leaks page/demo concerns into the library migration.
2. **Needless abstraction / duplicate surface**
   - page-only showcase panels are exported from `components/ui/index.ts` as if they were library primitives.
3. **Dead code / stale showcase surface**
   - once the page is rebuilt, old panel components should be removed.
4. **Token inconsistency**
   - `var(--desktop)` is referenced but not defined.
5. **Missing behavior lock reinforcement**
   - rerun verification after each meaningful pass.

## Execution order

1. Baseline verification.
2. Key findings first:
   - absorb missing `WinButton` behaviors into the newer button surface or thin compat wrappers
   - migrate all `WinButton` consumers
   - remove `WinButton`
   - fix the missing desktop token alias
3. Clear the current components page library surface:
   - remove panel exports from `components/ui/index.ts`
   - replace/delete page-only panel components once the new page is ready
4. Build a completely new `/components` page using actual primitives instead of exported showcase panels.
5. Final verification.
