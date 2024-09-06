import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import dotenv from 'dotenv';

const envPrefix = 'VITE_';
const envs = dotenv.config({ path: `./.env` });

export default defineConfig({
  plugins: [
    react(),
  ],

  root: path.resolve(__dirname, 'src/client'),
  
  define: {
    'process.env': Object.fromEntries(
        Object.entries({ ...process.env, ...envs })
          .filter(([key]) => key.startsWith(envPrefix))
          .map(([key, value]) => [key.replace(`${envPrefix}_`, ''), value])
    ),
  },
  
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
  
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },

  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/client/src/components'),
      '@helpers': path.resolve(__dirname, 'src/client/src/helpers'),
    },
  },

});
