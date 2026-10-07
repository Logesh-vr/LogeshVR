# Mein Garten

Logesh Rajaraman’s interactive 3D portfolio: a guided walk through a park with project exhibits, an About board, interests, and contact information.

Built with React, TypeScript, Vite, Three.js, React Three Fiber, and Drei.

## Backend and hosting architecture

**This version has no application backend.** It is a static frontend. There is no API server, database, authentication service, serverless function, or runtime GitHub integration to configure.

```text
GitHub repository
    → Vercel installs locked dependencies with npm ci
    → TypeScript check + Vite production build
    → dist/ static files served by Vercel
    → visitor’s browser runs React, WebGL, and the guided walk
```

Node.js is needed for development, tests, and the build. The deployed portfolio does not require a running Node.js application server. Vercel handles HTTPS and delivery of the generated HTML, JavaScript, CSS, and public assets.

### Where the data comes from

`src/data.ts` is the source of truth for the profile, languages, hackathon wins, six project descriptions, links, and nine park stops. Each stop references an exhibit type and route position; project stops also reference a project ID. The 3D exhibits and the readable fallback consume the same data.

All content is bundled at build time. Editing a project or contact detail requires a source change and a new deployment. Visitors do not make GitHub API calls, and there is no access token in the browser.

### What happens when someone visits

1. React renders the navigation and loads the 3D scene lazily.
2. Normal document scrolling updates the target position along an entrance path and circular route.
3. The scene follows that position, animates the character, and positions the camera behind him.
4. Approaching an exhibit reveals a prompt. Clicking moves the camera to its close-up; the details panel appears after the camera arrives.
5. While the panel is open, walking pauses. Closing returns the camera to the same route position.

The camera uses separate walk, focus, inspect, and return states. Free roam is not implemented. The exhibit animations illustrate the projects; this website does not run satellite services, neural simulations, trading tools, or the other projects’ backends.

### External services and assets

- **Read portfolio** navigates to the existing portfolio at [logesh-vr.vercel.app](https://logesh-vr.vercel.app/).
- Repository and social links navigate to their respective public websites.
- Some project screenshots are loaded from public GitHub raw-content URLs. If an image fails, its figure is omitted.
- Google Fonts are requested by the stylesheet, with system-font fallbacks.
- The Earth texture is bundled locally, with a generated fallback. See [asset attribution](public/textures/ATTRIBUTION.txt).
- Contact opens a `mailto:` link; it does not submit a form or send email through a backend. Copy email uses the browser clipboard, with a local fallback.

The application does not implement a contact database, visitor accounts, cookies for application state, or analytics collection. Hosting-provider request logs are separate from application features.

### Environment variables and secrets

No environment variables, API keys, database URLs, or tokens are required. Do not add credentials to frontend code: Vite variables exposed to the client become part of the public bundle. `.gitignore` excludes local environment files, Vercel metadata, dependencies, caches, and build output.

### Adding a backend later

A contact form, CMS, or visitor account system would be a separate feature. Server-side validation, secret storage, authentication (where needed), spam controls, and data-retention decisions would need to be designed before adding such a feature. None of those services are required to host the current version.

## Development requirements

- Node.js **22.x** (also specified in `.nvmrc` and `package.json`)
- npm and the committed `package-lock.json`
- A modern browser with WebGL2 for the park; readable content is available when 3D rendering fails

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. To validate and preview the production build:

```sh
npm test
npm run build
npm run preview
```

`npm test` checks the follow camera, exhibit camera destinations, route continuity, and entrance-board placement. `npm run build` checks TypeScript and produces `dist/`. Browser verification and its limits are recorded in [VERIFICATION.md](VERIFICATION.md).

## Deployment on Vercel

Import [Logesh-vr/LogeshVR](https://github.com/Logesh-vr/LogeshVR) using the repository root and production branch `main`. The checked-in `vercel.json` specifies:

| Setting | Value |
| --- | --- |
| Framework | Vite |
| Install command | `npm ci` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Node.js | 22.x from `package.json` |
| Environment variables | None |

The Git connection supports deployment on future pushes. GitHub Actions runs the existing tests and production build independently; it does not hold Vercel credentials or publish deployments.

## Source layout

| File | Responsibility |
| --- | --- |
| `src/data.ts` | Typed profile, project content, stop definitions, and route |
| `src/App.tsx` | Navigation, details, focus handling, and readable fallback |
| `src/World.tsx` | Rendering, camera state transitions, and character animation |
| `src/cameraPath.ts` | Follow-camera and exhibit close-up destinations |
| `src/ParkEnvironment.tsx` | Paths, fountain, trees, walls, furniture, and gate |
| `src/Exhibits.tsx` | Clickable project objects and illustrative animations |
| `src/sceneAssets.tsx` | Reusable meshes, materials, and generated textures |
| `src/style.css` | HTML interface and responsive layouts |
| `public/` | Static assets copied into the production build |
| `tests/camera.test.ts` | Camera and route checks |

## Accessibility and performance

Keyboard-accessible controls, Escape-to-close, focus restoration, reduced-motion behavior, and a readable failure fallback are included. Phones use a smaller details sheet. Rendering uses instanced vegetation, limited pixel ratio, adaptive detail, reduced shadow resolution, and hidden-tab pausing. Frame-rate targets still require testing on representative physical hardware; the build passing does not establish 60 FPS.
