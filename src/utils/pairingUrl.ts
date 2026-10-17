// Pairing URL helper
// Ensures mobile cameras scanning the QR code NEVER get directed to an unreachable http://localhost:3000
// Instead, points to the live public shared URL or detected live domain.

export const PUBLIC_APP_URL = 'https://ais-pre-ky6cp5q7dfunxjqj7ax66w-952999318419.europe-west2.run.app';

export interface PairingUrlOptions {
  mode?: 'cloud' | 'local' | 'custom';
  customIp?: string;
}

export function getPublicPairingUrl(
  pairCode: string,
  partnerName: string = 'Müge',
  targetPersona: string = 'Cihat'
): string {
  // If the browser is currently running on a real public URL (like .run.app or a custom domain), use that.
  if (typeof window !== 'undefined') {
    const origin = window.location.origin;
    const hostname = window.location.hostname;
    const isLocalhost =
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '0.0.0.0' ||
      hostname.endsWith('.local');

    if (!isLocalhost && origin.startsWith('https://')) {
      return `${origin}/?pair=${encodeURIComponent(pairCode)}&partner=${encodeURIComponent(partnerName)}&as=${encodeURIComponent(targetPersona)}`;
    }
  }

  // When running inside AI Studio development environment or localhost,
  // mobile phone cameras MUST be directed to the live public shared application URL,
  // otherwise mobile browsers will attempt to open localhost:3000 on the phone itself and fail with "Sunucuya bağlanılamıyor".
  return `${PUBLIC_APP_URL}/?pair=${encodeURIComponent(pairCode)}&partner=${encodeURIComponent(partnerName)}&as=${encodeURIComponent(targetPersona)}`;
}

export function getLocalWifiPairingUrl(
  ip: string,
  pairCode: string,
  partnerName: string = 'Müge',
  targetPersona: string = 'Cihat'
): string {
  const cleanIp = ip.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  const host = cleanIp.includes(':') ? cleanIp : `${cleanIp}:3000`;
  return `http://${host}/?pair=${encodeURIComponent(pairCode)}&partner=${encodeURIComponent(partnerName)}&as=${encodeURIComponent(targetPersona)}`;
}
