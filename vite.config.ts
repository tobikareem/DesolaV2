

// https://vite.dev/config/
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// Debugging: Log the environment variables
console.log('VITE_APP_NAME:', process.env.VITE_APP_NAME);
console.log('VITE_API_BASE_URL:', process.env.VITE_API_BASE_URL);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true, // Enable source maps for easier debugging
  },
  optimizeDeps: {
    include: ['react', 'react-dom'], // Pre-bundle dependencies for faster builds
  },
  define: {
    'process.env': process.env,
  },
});