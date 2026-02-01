import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://reyansh.art',
  base: '/',
  build: {
    assets: '_astro',
  },
});
