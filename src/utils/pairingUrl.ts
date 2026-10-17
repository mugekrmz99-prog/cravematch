// Pairing URL helper
// Ensures mobile cameras scanning the QR code NEVER get directed to an unreachable http://localhost:3000
// Instead, points to the reachable local Wi-Fi IP or live public tunnel URL.

import { pairingSync } from './pairingSync';

export const PUBLIC_APP_URL =
  (import.meta.env.VITE_PUBLIC_APP_URL as string) ||
  'https://mugekrmz99-prog.github.io/cravematch';

export function getBestPairingUrl(
  pairCode: string = 'CRAVE-9821',
  inviterName: string = '',
  preferWifi: boolean = false
): string {
  const netInfo = pairingSync.getCachedNetworkInfo();
  const queryParams = new URLSearchParams();
  queryParams.set('pair', pairCode);
  if (inviterName && inviterName.trim()) {
    queryParams.set('inviter', inviterName.trim());
  }
  const queryString = queryParams.toString();

  if (typeof window !== 'undefined') {
    const origin = window.location.origin;
    const hostname = window.location.hostname;
    const isLocal =
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '0.0.0.0';

    // If currently running on a real public domain, GitHub Pages or tunnel
    if (!isLocal && (origin.startsWith('https://') || origin.includes(':3000'))) {
      const pathname = window.location.pathname.replace(/\/$/, '');
      return `${origin}${pathname}/?${queryString}`;
    }
  }

  // If Wi-Fi preferred and local IP known
  if (preferWifi && netInfo?.localUrl) {
    return `${netInfo.localUrl}/?${queryString}`;
  }

  // Fallback to detected tunnel or public app URL or local IP
  const baseUrl = netInfo?.tunnelUrl || PUBLIC_APP_URL || netInfo?.localUrl || 'http://localhost:3000';
  return `${baseUrl}/?${queryString}`;
}

export function getPublicPairingUrl(
  pairCode: string = 'CRAVE-9821',
  inviterName: string = ''
): string {
  return getBestPairingUrl(pairCode, inviterName, false);
}

export function getLocalWifiPairingUrl(
  ip: string = '192.168.145.231',
  pairCode: string = 'CRAVE-9821',
  inviterName: string = ''
): string {
  const netInfo = pairingSync.getCachedNetworkInfo();
  const cleanIp = (netInfo?.localIp || ip).replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  const host = cleanIp.includes(':') ? cleanIp : `${cleanIp}:3000`;
  const queryParams = new URLSearchParams();
  queryParams.set('pair', pairCode);
  if (inviterName && inviterName.trim()) {
    queryParams.set('inviter', inviterName.trim());
  }
  return `http://${host}/?${queryParams.toString()}`;
}

