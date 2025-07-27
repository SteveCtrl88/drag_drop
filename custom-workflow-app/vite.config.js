import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for the prototype.  This sets up React support via
// @vitejs/plugin-react.  The default development server runs on port 5173.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});