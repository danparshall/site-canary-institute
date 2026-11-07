// Site navigation, shared by Nav.astro and the header added to static pages
// under public/ (see static-site-header.mjs). Paths are relative to the base URL.
export const navLinks = [
  { path: '', label: 'Home' },
  { path: 'about/', label: 'About' },
  { path: 'research/', label: 'Research' },
  { path: 'policy/', label: 'Policy' },
  { path: 'blog/', label: 'Blog' },
  { path: 'blog/most-important-problem/', label: 'Verification' },
];
