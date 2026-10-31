# Mona Mayhem Repository Instructions

## Project overview

Mona Mayhem is a retro arcade GitHub Contribution Battle Arena. The app will let users compare GitHub contribution activity in an engaging arcade-style experience.

## Stack

- Astro with server-side output and the Node adapter
- JavaScript and TypeScript
- Tailwind CSS and/or Astro scoped CSS for styling
- Astro file-based pages and API routes

## Development commands

- `npm install` — install dependencies
- `npm run dev` — start the local development server
- `npm run build` — create a production build
- `npm run preview` — preview the production build

## Project rules

- Keep components modular and focused on a clear responsibility.
- Follow the existing file naming and directory conventions.
- Prefer clean, readable code over clever abstractions.
- Preserve type safety in TypeScript and use existing Astro patterns for pages and API routes.
- Keep styling maintainable by using Tailwind utilities or component-scoped CSS rather than broad global selectors.
- Reuse shared logic instead of duplicating behavior, but avoid abstractions that make simple code harder to understand.
- Review changes for accessibility, responsive behavior, and error handling before considering a feature complete.
- Keep workshop documentation separate from application implementation unless a task explicitly requires documentation changes.
