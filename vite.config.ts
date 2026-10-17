import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, Plugin } from 'vite';

// In-memory cross-device pairing & real-time sync middleware
function pairingApiPlugin(): Plugin {
  const syncStore = new Map<string, any[]>();

  return {
    name: 'pairing-api-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Direct ZIP download endpoint
        if (req.url?.startsWith('/api/download-zip') || req.url === '/crave-couples-app.zip') {
          const zipFile = path.resolve(__dirname, 'public/crave-couples-app.zip');
          if (fs.existsSync(zipFile)) {
            res.setHeader('Content-Type', 'application/zip');
            res.setHeader('Content-Disposition', 'attachment; filename="crave-couples-app.zip"');
            fs.createReadStream(zipFile).pipe(res);
            return;
          }
        }

        if (!req.url?.startsWith('/api/pair')) {
          return next();
        }

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        if (req.method === 'OPTIONS') {
          res.statusCode = 204;
          res.end();
          return;
        }

        const url = new URL(req.url, 'http://localhost');
        const code = url.searchParams.get('code') || 'CRAVE-9821';

        if (req.method === 'GET' && url.pathname === '/api/pair/sync') {
          const events = syncStore.get(code) || [];
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(events));
          return;
        }

        if (req.method === 'POST' && url.pathname === '/api/pair/sync') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const payload = JSON.parse(body);
              const list = syncStore.get(payload.pairCode || code) || [];
              list.push(payload);
              // keep latest 50 events
              if (list.length > 50) list.shift();
              syncStore.set(payload.pairCode || code, list);
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ ok: true, count: list.length }));
            } catch (err) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'invalid json' }));
            }
          });
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), pairingApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
