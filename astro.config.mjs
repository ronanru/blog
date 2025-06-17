import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import solidJs from '@astrojs/solid-js';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.ronanru.com',
  integrations: [mdx(), sitemap(), solidJs()],
  vite: {
    plugins: [tailwindcss()],
  },
});

