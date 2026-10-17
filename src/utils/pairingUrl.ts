// Pairing URL helper
// Ensures mobile cameras scanning the QR code NEVER get directed to an unreachable http://localhost:3000
// Instead, points to the reachable local Wi-Fi IP or live public tunnel URL.

import { pairingSync } from './pairingSync';

export const PUBLIC_APP_URL =
  (import.meta.env.VITE_PUBLIC_APP_URL as string) ||
  'https://eighty-otters-roll.loca.lt';

export function getBestPairingUrl(
  pairCode: string = 'CRAVE-9821',
  partnerName: string = 'Müge',
  targetPersona: string = 'Cihat',
  preferWifi: boolean = true
): string {
  const netInfo = pairingSync.getCachedNetworkInfo();

  if (typeof window !== 'undefined') {
    const origin = window.location.origin;
    const hostname = window.location.hostname;
    const isLocal =
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '0.0.0.0';

    // If currently running on a real public or tunnel domain
    if (!isLocal && (origin.startsWith('https://') || origin.includes(':3000'))) {
      return `${origin}/?pair=${encodeURIComponent(pairCode)}&partner=${encodeURIComponent(partnerName)}&as=${encodeURIComponent(targetPersona)}`;
    }
  }

  // If Wi-Fi preferred and local IP known:
  if (preferWifi && netInfo?.localUrl) {
    return `${netInfo.localUrl}/?pair=${encodeURIComponent(pairCode)}&partner=${encodeURIComponent(partnerName)}&as=${encodeURIComponent(targetPersona)}`;
  }

  // Fallback to detected local network IP or tunnel
  const baseUrl = netInfo?.localUrl || (netInfo?.tunnelUrl || PUBLIC_APP_URL);
  return `${baseUrl}/?pair=${encodeURIComponent(pairCode)}&partner=${encodeURIComponent(partnerName)}&as=${encodeURIComponent(targetPersona)}`;
}

export function getPublicPairingUrl(
  pairCode: string = 'CRAVE-9821',
  partnerName: string = 'Müge',
  targetPersona: string = 'Cihat'
): string {
  return getBestPairingUrl(pairCode, partnerName, targetPersona, false);
}

export function getLocalWifiPairingUrl(
  ip: string = '192.168.145.231',
  pairCode: string = 'CRAVE-9821',
  partnerName: string = 'Müge',
  targetPersona: string = 'Cihat'
): string {
  const netInfo = pairingSync.getCachedNetworkInfo();
  const cleanIp = (netInfo?.localIp || ip).replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  const host = cleanIp.includes(':') ? cleanIp : `${cleanIp}:3000`;
  return `http://${host}/?pair=${encodeURIComponent(pairCode)}&partner=${encodeURIComponent(partnerName)}&as=${encodeURIComponent(targetPersona)}`;
}
