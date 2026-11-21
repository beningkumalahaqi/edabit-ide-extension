import { defineConfig } from 'vite';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = dirname(fileURLToPath(import.meta.url));
export default defineConfig({
  base: './', publicDir: 'public',
  build: { outDir: 'dist', emptyOutDir: true, target: 'es2022',
    rollupOptions: { input: { content: resolve(root, 'src/content.js') },
      output: { entryFileNames: '[name].js', chunkFileNames: 'assets/[name]-[hash].js', assetFileNames: 'assets/[name]-[hash][extname]' } }
  }
});
