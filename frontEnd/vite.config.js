import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/HiringWeb/', // It is the subdirectory
  plugins: [react()],
});
