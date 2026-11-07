// @ts-check
import { defineConfig } from 'astro/config';
import staticSiteHeader from './src/static-site-header.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://canaryinstitute.ai',
  integrations: [staticSiteHeader()],
});
