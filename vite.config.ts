import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import fs from 'fs';

import { fileURLToPath } from 'url';

const currentDir = path.dirname(fileURLToPath(import.meta.url));

// Delete stale server.ts if restored from platform cache to prevent wrangler from using it as a rogue entrypoint
try {
  const staleServerPath = path.resolve(currentDir, 'server.ts');
  if (fs.existsSync(staleServerPath)) {
    fs.unlinkSync(staleServerPath);
    console.log('Successfully deleted stale server.ts during Vite build initialization.');
  }
} catch (err) {
  console.error('Failed to delete stale server.ts:', err);
}

// Force overwrite wrangler.toml during build initialization to make sure it is correct and not corrupted by stale build cache
try {
  const wranglerPath = path.resolve(currentDir, 'wrangler.toml');
  const expectedContent = `name = "comparador-cat-logo-de-insumos"
main = "worker.ts"
compatibility_date = "2024-03-01"
compatibility_flags = [ "nodejs_compat" ]

[assets]
directory = "./dist"
binding = "ASSETS"
`;
  fs.writeFileSync(wranglerPath, expectedContent, 'utf-8');
  console.log('Successfully wrote and sanitized wrangler.toml configuration.');
} catch (err) {
  console.error('Failed to sanitize wrangler.toml:', err);
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(currentDir, '.'),
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
