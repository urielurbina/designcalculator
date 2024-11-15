import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {},
    'global': {},
  },
  optimizeDeps: {
    include: ['@react-pdf/renderer', 'buffer']
  },
  build: {
    commonjsOptions: {
      include: [/@react-pdf\/renderer/, /node_modules/]
    }
  }
});