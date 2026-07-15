import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import fs from 'fs';

// Delete stale server.ts if restored from platform cache to prevent wrangler from using it as a rogue entrypoint
try {
  const staleServerPath = path.resolve(__dirname, 'server.ts');
  if (fs.existsSync(staleServerPath)) {
    fs.unlinkSync(staleServerPath);
    console.log('Successfully deleted stale server.ts during Vite build initialization.');
  }
} catch (err) {
  console.error('Failed to delete stale server.ts:', err);
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
