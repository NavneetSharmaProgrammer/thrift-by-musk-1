/**
 * Extracts the Google Drive file ID from a shareable link.
 * @param url The Google Drive shareable link.
 * @returns The file ID or null if not found.
 */
const getGoogleDriveFileId = (url: string): string | null => {
  if (!url) return null;
  const match = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  return match ? match[1] : null;
};

/**
 * Formats a Google Drive URL for direct embedding.
 * @param url The original Google Drive shareable link.
 * @param type 'image' for direct image display, 'video' for video embedding.
 * @returns The formatted URL or the original URL if it's not a valid Google Drive link.
 */
export const formatGoogleDriveLink = (url: string, type: 'image' | 'video'): string => {
  if (!url || !url.includes('drive.google.com')) {
    return url; // Return original url if not a GDrive link or is empty
  }

  const fileId = getGoogleDriveFileId(url);
  if (!fileId) {
    return url; // Return original if ID can't be extracted
  }
  
  if (type === 'image') {
    // This is a more reliable direct link format for images.
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }

  if (type === 'video') {
    // This format is correct for embedding in an iframe.
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }
  
  return url;
};