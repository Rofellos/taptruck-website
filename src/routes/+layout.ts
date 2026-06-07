// Prerender the whole site to static HTML at build time.
// This ensures crawlers, AI assistants, and social/link previews receive
// fully-rendered content (text, prices, structured data) on first load,
// rather than an empty client-rendered shell.
//
// Pages that must stay dynamic (e.g. server actions) can override this with
// `export const prerender = false;` in their own +page.ts / +page.server.ts.
export const prerender = true;

// Keep server-side rendering on (default) so HTML is generated for each route.
export const ssr = true;
