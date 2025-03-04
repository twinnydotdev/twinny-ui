# CLAUDE.md - Twinny UI Codebase Guidelines

## Build & Dev Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Type check the codebase
- `npm run test` - Run all Playwright tests
- `npm run test:unit` - Run Vitest unit tests
- `npx playwright test tests/index.test.ts` - Run a specific test
- `npm run lint` - Run ESLint and Prettier checks
- `npm run format` - Auto-format with Prettier
- `npm run migrate` - Run database migrations

## Code Style Guidelines
- **Formatting**: 2-space tabs, 100-char width, single quotes, no semicolons
- **Components**: Use Svelte 5 `$props()` syntax for component props
- **Types**: Use TypeScript interfaces for props and strict type checking
- **Naming**: camelCase for variables/functions, PascalCase for components
- **Imports**: Group imports by external/internal, sort alphabetically
- **CSS**: Use Tailwind for styling with utility classes
- **Error Handling**: Use try/catch blocks with appropriate error logging
- **i18n**: Use the sveltekit-i18n package for translations