import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: './', // Ensure Vite looks for index.html in the root
  build: {
    outDir: 'dist', // Output to the 'dist' folder
    rollupOptions: {
      input: {
        main: 'index.html', // Point to your index.html
      },
    },
  },
  server: {
    open: true,
  }
});