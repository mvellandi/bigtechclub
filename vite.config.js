import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

const projectRoot = import.meta.dirname;

export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  publicDir: 'public',
  resolve: {
    alias: {
      '@': resolve(projectRoot, 'src')
    }
  },
  build: {
    outDir: 'docs',
    rolldownOptions: {
      input: {
        main: resolve(projectRoot, 'index.html'),
        clubWeb: resolve(projectRoot, 'club-web/index.html'),
        twitter: resolve(projectRoot, 'twitter/index.html')
      }
    }
  }
});
