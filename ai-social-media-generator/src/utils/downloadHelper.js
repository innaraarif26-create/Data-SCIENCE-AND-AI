// Download helper utilities

/**
 * Download an image from a data URL
 * @param {string} dataUrl - The image data URL
 * @param {string} filename - The filename for the download
 */
export function downloadImage(dataUrl, filename = 'social-media-image.png') {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Download text content as a text file
 * @param {string} content - The text content to download
 * @param {string} filename - The filename for the download
 */
export function downloadText(content, filename = 'post-content.txt') {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Download image with text overlay
 * @param {string} imageDataUrl - The base image data URL
 * @param {string} caption - The caption text
 * @param {string[]} hashtags - Array of hashtags
 * @param {string} filename - The filename for the download
 */
export async function downloadImageWithText(
  imageDataUrl,
  caption,
  hashtags,
  filename = 'social-media-post.png'
) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Set canvas size based on image
      canvas.width = img.width;
      canvas.height = img.height + 200; // Extra space for text

      // Draw image
      ctx.drawImage(img, 0, 0);

      // Add semi-transparent background for text
      ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
      ctx.fillRect(0, img.height, canvas.width, 200);

      // Add caption
      ctx.fillStyle = 'white';
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'center';
      
      // Wrap text if too long
      const maxWidth = canvas.width - 40;
      const words = caption.split(' ');
      let line = '';
      let y = img.height + 40;

      words.forEach((word) => {
        const testLine = line + word + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && line !== '') {
          ctx.fillText(line, canvas.width / 2, y);
          line = word + ' ';
          y += 30;
        } else {
          line = testLine;
        }
      });
      ctx.fillText(line, canvas.width / 2, y);

      // Add hashtags
      ctx.font = '18px Arial';
      ctx.fillText(hashtags.join(' '), canvas.width / 2, y + 40);

      // Download
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        resolve();
      }, 'image/png');
    };

    img.onerror = reject;
    img.src = imageDataUrl;
  });
}

/**
 * Copy text to clipboard
 * @param {string} text - The text to copy
 * @returns {Promise<boolean>} - Success status
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (err) {
      document.body.removeChild(textArea);
      return false;
    }
  }
}
