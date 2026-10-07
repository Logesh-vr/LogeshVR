# Verification notes

Verified 7 October 2026 on Windows with Node 22.19 and the Codex in-app browser.

## This revision

- TypeScript and production Vite build pass. Four Node camera/route tests pass (`npm test`).
- Follow-camera destination remains behind the character throughout a complete lap. Every desktop/mobile exhibit destination is finite and points near the correct object. Entrance continuity and lap closure pass.
- Browser arrival at VaanThuli: 17% progress, camera mode `walk`, no details panel. Clicking changes mode to `focus` with no details, then `inspect` with the correct case study.
- Closing with Escape preserves document scroll exactly: desktop 912 px; phone 1291.199951171875 px. Camera returns to walking mode.
- Inspected Earth close-up and glass terrarium with their correct project content. Globe remains clear beside the desktop panel and above the phone bottom sheet.
- Inspected desktop at the native browser viewport and phone at 390 × 844. Temporary viewport override reset afterward.
- Fixed controls prevent browser scroll-into-view from jumping the sticky scene to another project. Details wait for camera arrival; approach alone does not focus an object.
- Added an accessible name to the mobile map button and a focus fallback when the opening exhibit prompt remounts.

## Earlier baseline checks retained

All six project mappings, nine map stops, contact links/copy email, readable portfolio, replay, end of lap, and reverse navigation were verified before the visual revision. They still consume the same content and navigation functions.

## Limits

Physical-phone touch behavior and 60/30 FPS targets require representative hardware testing; viewport emulation does not establish those frame rates. Reduced-motion and WebGL failure fallbacks are implemented but were not forced through browser emulation in this session. Development hot reload can produce a Drei HTML root-unmount warning. The lazy-loaded 3D bundle is approximately 273 kB gzipped; Vite reports its normal large-chunk warning. No site has been published.

Final production smoke check: About billboard focuses and opens the correct biography. Escape restores focus to the remounted nearby button; replay works. No browser console errors were recorded in this production check.

Mein Garten update (7 October 2026): production build and all four existing camera tests pass. Browser verified renamed entrance, entrance-facing About board and front-facing close-up, four hackathon wins with exactly three National labels, and Tamil/English/German in Beyond the keyboard. Arm phase is now opposite its same-side leg; no proficiency levels, placements, or prize claims added.

8 October 2026: removed recurring curious/curiosity copy from the park. Read portfolio now uses the repository's verified homepage, https://logesh-vr.vercel.app/. Production build passes; browser click-through opened Logesh Rajaraman | Full Stack & AI successfully. The existing remote site's copy was not changed.
