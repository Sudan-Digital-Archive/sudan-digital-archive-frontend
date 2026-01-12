# Sudan Digital Archive Frontend

## Project Overview

This is the frontend repository for the **Sudan Digital Archive**, a community-driven project dedicated to preserving
and making accessible the collective memory and experiences of the Sudanese people.

The application is a **Single Page Application (SPA)** built with **React** and **TypeScript**, bundled using **Vite**.
It interacts with a separate backend API (documented in the `sudan-digital-archive-api` repository).

### Key Features

- **Bilingual Support:** Full English and Arabic support using `i18next`.
- **Digital Preservation:** Integrates `replayweb.page` for high-fidelity web archive replay.
- **Modern UI:** Built with **Chakra UI** and **Emotion** for styling.
- **Routing:** Uses **React Router v7** for client-side routing.

## Technology Stack

- **Core:** React 18, TypeScript, Vite
- **Styling:** Chakra UI, Emotion
- **Routing:** React Router
- **Internationalization (i18n):** i18next, react-i18next
- **Testing:** Vitest, React Testing Library
- **Linting/Formatting:** ESLint, Prettier
- **Key Dependencies:**
  - `replayweb.page` (Web archive replay)

## Project Structure

- `src/`
  - `apiTypes/`: TypeScript definitions for API requests/responses.
  - `components/`: Reusable UI components (Accession cards, DatePickers, etc.).
  - `context/`: React Context definitions (e.g., `UserContext`).
  - `css/`: Global styles and specific component CSS.
  - `hooks/`: Custom React hooks (e.g., `useUser`, `useParsedDate`).
  - `pages/`: Main route components (Home, Archive, Login, etc.).
  - `translations/`: JSON files for English (`en.json`) and Arabic (`ar.json`) translations.
  - `utils/`: Helper functions.
  - `il18n.ts`: Internationalization configuration.
  - `main.tsx`: Application entry point.
- `public/`: Static assets, including the critical `replay/` directory for `replayweb.page` integration.
- `testUtils/`: Test setup and helpers.

## Development Workflow

### Prerequisites

- Node.js (version compatible with dependencies)
- `pnpm` (Package manager)
- **Backend:** The backend API must be running locally for full functionality.

### Key Commands

| Command                 | Description                                                                           |
| :---------------------- | :------------------------------------------------------------------------------------ |
| `pnpm run dev`          | Starts the development server.                                                        |
| `pnpm run build`        | specific build command: `tsc -b && vite build`. Typechecks and builds for production. |
| `pnpm run test`         | Runs unit tests using Vitest.                                                         |
| `pnpm run lint`         | Runs ESLint to check for code quality issues.                                         |
| `pnpm run lint:fix`     | Runs ESLint to autofix code quality issues.                                           |
| `pnpm run format`       | Formats code using Prettier.                                                          |
| `pnpm run format:check` | Checks for code formatting issues using Prettier.                                     |
| `pnpm run preview`      | Previews the production build locally.                                                |

### Testing

- Tests are written using **Vitest** and **React Testing Library**.
- Files are typically named `*.test.tsx`.
- Run tests locally before pushing: `pnpm run test`.
- CI (GitHub Actions) runs tests on pull requests and merges to main.

## Conventions & Best Practices

- **Strict Formatting:** Always run `pnpm run format` before committing. The project uses Prettier.
- **Linting:** Ensure `pnpm run lint` passes. Fix any reported issues.
- **Internationalization:**
  - All user-facing text **must** be translatable.
  - Add new keys to `src/translations/en.json` and `src/translations/ar.json`.
  - Use the `useTranslation` hook to retrieve strings.
- **ReplayWeb.page Integration:**
  - **CRITICAL:** Do NOT let React Router intercept requests to `/replay/*`.
  - The `public/replay` directory contains essential scripts (`sw.js`, `ui.js`) for the replay web component.
  - The service worker is handled by the web component itself.
- **Component Structure:**
  - Prefer functional components with hooks.
  - Colocate tests with components where possible or follow the existing pattern in `src/components`.
- **Styling:** Use Chakra UI components and props for layout and styling. Use Emotion for custom overrides if necessary.

## Deployment

- Deployment is automated via Digital Ocean when merging to the `main` branch.
