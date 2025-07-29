import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for the React Flow prototype.  The React plugin
// enables automatic JSX transpilation and hot reload during development.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});
