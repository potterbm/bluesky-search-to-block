import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import metadata from './oauth/client-metadata.json' with { type: 'json' };

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // injects OAuth-related environment variables
    react(),
  ],
  server: {
    host: '127.0.0.1',
    port: 3000,
  },
});
