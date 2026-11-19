import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const projectRoot = import.meta.dirname;

export default defineConfig({
  base: './',
  publicDir: 'public',
  input: {
    main: resolve(projectRoot, 'index.html'),
    future: resolve(projectRoot, 'future/index.html')
  },
  build: {
    outDir: 'docs'
  }
});
