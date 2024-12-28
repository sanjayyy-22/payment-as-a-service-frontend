import { config } from 'dotenv';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

config();

// https://vite.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env,
  },
  plugins: [react()],
  server: {
    port: 5000,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
