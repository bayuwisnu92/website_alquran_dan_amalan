import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/--web-Ba/', // Sesuaikan dengan nama repository GitHub
  root: '.',          // Pastikan root folder adalah '.'
  build: {
    outDir: 'dist',  // Output directory untuk hasil build
  },
});

