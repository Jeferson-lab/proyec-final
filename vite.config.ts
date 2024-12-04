/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Habilita `describe`, `it`, etc. globalmente
    environment: 'jsdom', // Entorno DOM simulado
    setupFiles: './src/test/setup.ts', // Archivo de configuración global
  },
});
