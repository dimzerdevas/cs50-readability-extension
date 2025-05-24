import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        panel: resolve(__dirname, 'public/panel.html'),
        devtools: resolve(__dirname, 'public/devtools.html'),
      }
    },
    outDir: 'dist',
  }
});