import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { defineConfig, Plugin } from 'vite';
import { dbManager } from './server/db.ts';

function getLocalIp(): string {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name] || []) {
      if (net.family === 'IPv4' && !net.internal && !net.address.startsWith('169.254')) {
        return net.address;
      }
    }
  }
  return '127.0.0.1';
}

interface SseClient {
  id: string;
  res: any;
  pairCode: string;
  user: string;
}

const sseClients: SseClient[] = [];

function broadcastToRoom(pairCode: string, eventType: string, data: any) {
  const payload = JSON.stringify({ type: eventType, data, timestamp: Date.now() });
  for (let i = sseClients.length - 1; i >= 0; i--) {
    const client = sseClients[i];
    if (client.pairCode === pairCode) {
      try {
        client.res.write(`event: ${eventType}\ndata: ${payload}\n\n`);
      } catch {
        sseClients.splice(i, 1);
      }
    }
  }
}

// In-memory + persistent cross-device pairing & real-time sync middleware
function pairingApiPlugin(): Plugin {
  const syncStore = new Map<string, unknown[]>();

  return {
    name: 'pairing-api-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Direct ZIP download endpoint
        if (req.url?.startsWith('/api/download-zip') || req.url === '/crave-couples-app.zip') {
          const zipFile = path.resolve(import.meta.dirname, 'public/crave-couples-app.zip');
          if (fs.existsSync(zipFile)) {
            res.setHeader('Content-Type', 'application/zip');
            res.setHeader('Content-Disposition', 'attachment; filename="crave-couples-app.zip"');
            fs.createReadStream(zipFile).pipe(res);
            return;
          }
        }

        // Network Info endpoint for dynamic QR code generation
        if (req.url?.startsWith('/api/network-info')) {
          const localIp = getLocalIp();
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.end(
            JSON.stringify({
              localIp,
              port: 3000,
              localUrl: `http://${localIp}:3000`,
              tunnelUrl: process.env.TUNNEL_URL || 'https://eighty-otters-roll.loca.lt'
            })
          );
          return;
        }

        // Real-Time SSE (Server-Sent Events) Stream
        if (req.url?.startsWith('/api/db/events')) {
          const url = new URL(req.url, 'http://localhost');
          const pairCode = url.searchParams.get('code') || 'CRAVE-9821';
          const user = url.searchParams.get('user') || 'Guest';

          res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Access-Control-Allow-Origin': '*'
          });

          const clientId = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
          const client: SseClient = { id: clientId, res, pairCode, user };
          sseClients.push(client);

          // Notify room that user connected
          broadcastToRoom(pairCode, 'PARTNER_CONNECTED', {
            user,
            onlineUsers: sseClients.filter((c) => c.pairCode === pairCode).map((c) => c.user)
          });

          // Send initial state snapshot
          const room = dbManager.getRoom(pairCode);
          res.write(`event: INITIAL_STATE\ndata: ${JSON.stringify(room)}\n\n`);

          // Heartbeat ping every 15s to keep connection alive
          const pingInterval = setInterval(() => {
            try {
              res.write(': ping\n\n');
            } catch {
              clearInterval(pingInterval);
            }
          }, 15000);

          req.on('close', () => {
            clearInterval(pingInterval);
            const idx = sseClients.findIndex((c) => c.id === clientId);
            if (idx !== -1) sseClients.splice(idx, 1);
            broadcastToRoom(pairCode, 'PARTNER_DISCONNECTED', {
              user,
              onlineUsers: sseClients.filter((c) => c.pairCode === pairCode).map((c) => c.user)
            });
          });
          return;
        }

        // Database REST Endpoints
        if (req.url?.startsWith('/api/db/')) {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

          if (req.method === 'OPTIONS') {
            res.statusCode = 204;
            res.end();
            return;
          }

          const url = new URL(req.url, 'http://localhost');
          const pairCode = url.searchParams.get('code') || 'CRAVE-9821';

          // GET /api/db/state
          if (req.method === 'GET' && url.pathname === '/api/db/state') {
            const room = dbManager.getRoom(pairCode);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(room));
            return;
          }

          // Parse POST bodies
          if (req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => {
              body += chunk;
            });
            req.on('end', () => {
              try {
                const parsed = JSON.parse(body || '{}');

                if (url.pathname === '/api/db/message') {
                  const room = dbManager.addMessage(parsed.pairCode || pairCode, parsed.message);
                  broadcastToRoom(parsed.pairCode || pairCode, 'CHAT_MESSAGE', parsed.message);
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ ok: true, room }));
                  return;
                }

                if (url.pathname === '/api/db/profile') {
                  const room = dbManager.saveProfile(parsed.pairCode || pairCode, parsed.profile);
                  broadcastToRoom(parsed.pairCode || pairCode, 'PROFILE_UPDATE', parsed.profile);
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ ok: true, room }));
                  return;
                }

                if (url.pathname === '/api/db/swipe') {
                  const { isMatch, room } = dbManager.recordSwipe(
                    parsed.pairCode || pairCode,
                    parsed.user,
                    parsed.dishId,
                    parsed.liked
                  );
                  broadcastToRoom(parsed.pairCode || pairCode, 'SWIPE_EVENT', {
                    user: parsed.user,
                    dishId: parsed.dishId,
                    liked: parsed.liked,
                    isMatch
                  });
                  if (isMatch) {
                    broadcastToRoom(parsed.pairCode || pairCode, 'DISH_MATCH', {
                      dishId: parsed.dishId,
                      matchedUsers: Object.keys(room.swipes[parsed.dishId] || {})
                    });
                  }
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ ok: true, isMatch, room }));
                  return;
                }

                if (url.pathname === '/api/db/cart') {
                  const room = dbManager.updateCart(parsed.pairCode || pairCode, parsed.cart);
                  broadcastToRoom(parsed.pairCode || pairCode, 'CART_UPDATE', parsed.cart);
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ ok: true, room }));
                  return;
                }

                if (url.pathname === '/api/db/dice') {
                  const room = dbManager.setDiceWinner(parsed.pairCode || pairCode, parsed.winner);
                  broadcastToRoom(parsed.pairCode || pairCode, 'DICE_ROLL', parsed.winner);
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ ok: true, room }));
                  return;
                }

                res.statusCode = 404;
                res.end(JSON.stringify({ error: 'not found' }));
              } catch (err) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'invalid json' }));
              }
            });
            return;
          }
        }

        // Legacy /api/pair/sync endpoint
        if (req.url?.startsWith('/api/pair')) {
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
                const list = (syncStore.get(payload.pairCode || code) as any[]) || [];
                list.push(payload);
                if (list.length > 50) list.shift();
                syncStore.set(payload.pairCode || code, list);
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ ok: true, count: list.length }));
              } catch {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'invalid json' }));
              }
            });
            return;
          }
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
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
