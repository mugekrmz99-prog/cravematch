/**
 * Image compressor utility for fast, reliable real-time mobile sync.
 * Downscales camera images to max 750px and outputs a lightweight JPEG data URL (~35KB-60KB).
 * This prevents WebSocket/MQTT payload drops (256KB limit) and localStorage QuotaExceeded errors.
 */
export async function compressImage(
  fileOrDataUrl: File | string,
  maxWidth = 750,
  quality = 0.65
): Promise<string> {
  return new Promise((resolve, reject) => {
    let src = '';
    if (typeof fileOrDataUrl === 'string') {
      src = fileOrDataUrl;
      processSource(src);
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        src = e.target?.result as string;
        processSource(src);
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(fileOrDataUrl);
    }

    function processSource(imageSrc: string) {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxWidth) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxWidth) / height);
            height = maxWidth;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(imageSrc);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const compressed = canvas.toDataURL('image/jpeg', quality);
        resolve(compressed);
      };

      img.onerror = () => {
        resolve(imageSrc);
      };

      img.src = imageSrc;
    }
  });
}
