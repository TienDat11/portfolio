# Goldfish Review Report — Round 1

Repo: `portfolio` (Vite base `/portfolio/`, React 18.3, Vite 6, Tailwind 3.4, TypeScript 5.6).
Status: findings 1–5 resolved; finding 3 partially resolved (see below); Reel Mode is a documented gap.

## Verification

- `npm run build` (runs `tsc -b && vite build`): exit 0.
- Browser QA (`C:\Users\ADMIN\tmp\qa-run.mjs`, Edge headless, SwiftShader): console errors 0, page errors 0, failed requests 0, HTTP 4xx 0.
- Screenshots: `C:\Users\ADMIN\tmp\qa-screenshots\` (`hero-act1-ai.png`, `hero-act2-crm.png`, `hero-act3-desktop.png`, `tablet-900-hero.png`, `mobile-hero.png`, `hero-act3-mobile.png`, `projects-section.png`, `experience-section.png`). All hero shots were read and checked as described below.

## Findings and resolution

| # | Finding | Status | Resolution | Evidence |
|---|---------|--------|------------|----------|
| 1 | Chapter cards ghosted: neighbouring headlines overlapped during scrub (Act 1 showed "Multi-agent RAG…" over "Full-stack systems…") | Resolved | Card weight `clamp(1 - (|d| - 0.25)/0.25, 0, 1)`: full opacity within a quarter act, zero by half an act; neighbours never both visible. First/last cards held at the scroll ends (see regression below). `src/components/HeroScrollStage.tsx` | `hero-act1-ai.png` (card 01 visible), `hero-act2-crm.png`, `hero-act3-desktop.png`: one card per act, no overlap. QA assertion: exactly one card at opacity > 0.9 at 0, 0.5, 0.92 |
| 2 | Frame hard rectangle: WebP frames showed a hard rectangular edge against the backdrop | Resolved | Frames are now DOM layers (`<img>` slots) under a CSS mask that feathers all four edges into transparency (`maskComposite: intersect`). The canvas no longer draws frames. `HeroScrollStage.tsx`, `deviceRenderer.ts` | Desktop acts 1–3: no hard edge; a soft dark panel remains behind the device, feathered |
| 3 | Mobile collision: device band (y 0.17h–0.53h at 390×844) collided with title and headline | Partially resolved (scrim accepted) | Mobile device band is dimmed with a scrim (`from-obsidian/90 via-obsidian/55 to-obsidian/90 md:hidden`), kept by your decision; the device is not hidden. Relayout was rejected: at 844px height, header + device + cards + CTAs cannot fit without overlap | `mobile-hero.png` (act 1, card 01 visible): clean. `hero-act3-mobile.png`: the dimmed device still sits behind the body copy in act 3. Legible, not separated |
| 4 | Performance: hero canvas ran ~13 rAF/s while scrubbing; target ≥50 | Resolved in this environment (see numbers) | Frame images moved out of the canvas into compositor-only DOM layers (opacity, transform, mask). Canvas now only draws the orbit ring and brackets, at `MAX_DPR = 1`. Canvas region limited to device + ring. Idle redraw only for the procedural fallback. Reduced-motion now also turns off auto-orbit | Table below |
| 5 | `tsconfig.tsbuildinfo` not ignored | Resolved | `.gitignore` appended: `*.tsbuildinfo`, `scripts/render-3d/node_modules/`, `scripts/render-3d/*.log`, `preview/`, `*.preview.png` | `.gitignore` |
| 6 | Docs: no architecture spec; review not recorded | Resolved | `docs/3D_SCROLL_STAGE_ARCHITECTURE.md` (spec) and this report | Files exist in `docs/` |

Additional fixes found during audit:
- **Card 01 regression (found in review, fixed)**: the first pass gave card 01 weight 0 at 0%, because its centre sits at 0.5 act and the zero-weight edge at half an act, so the hero's first screen showed no chapter text. Fixed by holding the first and last cards at the scroll ends. QA now asserts exactly one card is visible at 0%, 50% and 92% on desktop, and at 0% and 92% on mobile (`qa-run.mjs`, exit non-zero on failure).

- **Reduced-motion desync**: reduced-motion set the toggle state but left `orbitRef` true, so the orbit kept running. Now both are turned off.
- **CV parity** (`src/data/portfolio.ts`): portfolio text contradicted the three CV PDFs in several places. Corrected: removed "Google Maps" from skills and Connect Car Booking tech; Tennis project now YOLOv8 players + YOLOv5 ball detector + PyTorch CNN keypoints; FaceFind no longer claims a React front end; Family Health rewritten (Flutter, BLoC, sqflite, Firebase, Geolocator; no FastAPI/Next/Socket.IO); GPLX 600 metric changed to `600 câu · live on 2 stores`; Rikkeisoft highlights rewritten (2nd-year student; Jinjer HRM React dashboard; AKAS Bank in Volt MX Iris); Education now `B.Sc. Information Technology (Software Engineering)`, `CodeGym Huế`, `PHP / Laravel Bootcamp, graduated with distinction`.

## Performance: before and after

Measured with the same Edge headless flags (`--use-angle=swiftshader --enable-unsafe-swiftshader`). `rAF/s` is requestAnimationFrame callbacks per second during the measured window. Blank page (`about:blank`) is the ceiling of the harness, about 110–120.

| State | Before (original) | After round-1 first pass (canvas frames, DPR 1.5) | After (DOM frames, DPR 1.5) | After (DOM frames, DPR 1) — final |
|-------|------|------|------|------|
| Scrub | 12 | 29 | 52, 48.5 | 58.5, 47, 50.5, 53 — median ≈52 |
| Idle (auto-orbit) | 13.5 | 31 | 42.5, 55 | 59, 59.5, 58.5, 59.5 — median ≈59 |
| Blank baseline | 137 | 114.5 | 117.5, 119.5 | 110, 117.5 |

Notes on the numbers:

- Single headless runs vary about ±6 rAF/s. The final configuration has four scrub samples: 47–58.5, median about 52. It meets ≥50 on the median and in three of four runs, but not on every run.
- Root cause (microbenchmarks): cost scaled with canvas surface area, not any one primitive. Removing the canvas (`display:none`) did not help; halving the surface (DPR 1.5 → 1) roughly doubled the rate. Under SwiftShader (CPU rasterization) every redrawn pixel costs. On a GPU-accelerated browser this cost is far lower, but I did not measure that here.
- Caveat: these are headless software-rasterized numbers, not real-device measurements.

## Open items (need your decision)

1. **Mobile act 3 overlap (finding 3)**: accepted as is. The scrim stays and the device is not hidden on mobile. The act 3 device still sits behind dimmed body copy; legible, not separated.
2. **Reel Mode (out of scope, not implemented)**: `public/sequence/hero-showcase.mp4` and `.webm` are generated by `scripts/generate-3d-sequence.mjs` but nothing references them, and there is no toggle. Excluded by your direction; no UI or doc claims it.
3. **Unreferenced assets**: `public/avatar.png` and `public/profile.jpg` are not referenced. Not deleted; confirm before removal.

## Unverified claims (kept, not contradicted by the CVs)

- Mail project: "Nginx" and "GitHub Actions CI/CD".
- Family Health highlight: "Clean Architecture with BLoC".
- Crosstechedu: "Real-estate AI consultation platform (Next.js 15, FastAPI RAG)"; period "Jan 2026 – Present" (CV says "2026").
- Rikkeisoft highlight: "Integrated REST APIs … Agile/Scrum".
- FaceFind: "512-D" embedding.
- FamHub: "Background location / Geofencing" wording.

## Git state

The working tree has the user's uncommitted changes, which were not reverted: modified `index.html`, `public/cv.pdf`, `App.tsx`, several components, `data/portfolio.ts`, `types/index.ts`, `tailwind.config.js`; deleted `src/components/Hero.tsx`; untracked `public/CV_*.pdf`, `public/sequence/`, `scripts/`, `CvMenu.tsx`, `HeroScrollStage.tsx`, `ScrollSection.tsx`, `src/lib/`. Nothing has been committed.

## Files changed

- `src/lib/deviceRenderer.ts`: canvas renders ring/brackets (and procedural device); new `getStageRegion`, `getContainRect`; removed canvas frame/feather/sheen paths.
- `src/lib/frames.ts`: `FRAME_ASPECT` exported.
- `src/components/HeroScrollStage.tsx`: DOM device layer, canvas sizing, card weights, reduced-motion, redraw logic, mobile scrim.
- `src/data/portfolio.ts`: CV parity.
- `.gitignore`: ignore rules (finding 5).
- `docs/3D_SCROLL_STAGE_ARCHITECTURE.md`, `docs/goldfish_review_report.md` (this file).
- Outside the repo: `C:\Users\ADMIN\tmp\qa-run.mjs` (QA script), `C:\Users\ADMIN\tmp\goldfish_review_report.md` (copy of this report).
