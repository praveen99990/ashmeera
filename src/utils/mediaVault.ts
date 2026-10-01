/**
 * Media Vault Utility (Read-Only)
 * Provides paths to the 48 permanently bundled original photos and videos.
 * Uploads and IndexedDB storage have been intentionally removed.
 */

class MediaVaultService {
  public getMediaUrl(filename?: string, fallbackUrl?: string): string {
    if (!filename) return fallbackUrl || '';
    if (filename.startsWith('http://') || filename.startsWith('https://') || filename.startsWith('blob:')) {
      return filename;
    }

    return `${import.meta.env.BASE_URL}assets/media/${filename}`;
  }
}

export const mediaVault = new MediaVaultService();
