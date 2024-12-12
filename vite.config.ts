import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  define: {
    'process.env': {},
    'global': {},
  },
  optimizeDeps: {
    include: ['@react-pdf/renderer', 'buffer', '@stripe/stripe-js']
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    commonjsOptions: {
      include: [/@react-pdf\/renderer/, /node_modules/]
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@react-pdf/renderer', 'framer-motion', 'lucide-react'],
          'db-vendor': ['@supabase/supabase-js', '@stripe/stripe-js']
        }
      }
    }
  }
});