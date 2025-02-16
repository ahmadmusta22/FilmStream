import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/movieapp/', // ✅ Add this line
  plugins: [react()],
});
