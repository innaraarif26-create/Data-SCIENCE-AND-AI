// CSV Export utility for batch processing

/**
 * Export post data to CSV format
 * @param {Array} posts - Array of post objects with {timestamp, topic, caption, hashtags, imageUrl}
 * @param {string} filename - The filename for the CSV file
 */
export function exportToCSV(posts, filename = 'social-media-posts.csv') {
  if (!posts || posts.length === 0) {
    throw new Error('No posts to export');
  }

  // Define CSV headers
  const headers = ['Timestamp', 'Topic', 'Caption', 'Hashtags', 'Image URL'];

  // Convert posts to CSV rows
  const rows = posts.map(post => {
    const timestamp = post.timestamp || new Date().toISOString();
    const topic = escapeCsvValue(post.topic || '');
    const caption = escapeCsvValue(post.caption || '');
    const hashtags = escapeCsvValue(
      Array.isArray(post.hashtags) ? post.hashtags.join(' ') : post.hashtags || ''
    );
    const imageUrl = escapeCsvValue(post.imageUrl || '');

    return [timestamp, topic, caption, hashtags, imageUrl].join(',');
  });

  // Combine headers and rows
  const csvContent = [headers.join(','), ...rows].join('\n');

  // Create and download the CSV file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
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
 * Escape CSV values to handle commas, quotes, and newlines
 * @private
 */
function escapeCsvValue(value) {
  if (value === null || value === undefined) {
    return '';
  }

  const stringValue = String(value);

  // If value contains comma, quote, or newline, wrap in quotes and escape existing quotes
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }

  return stringValue;
}

/**
 * Create a post object for CSV export
 * @param {string} topic - The post topic
 * @param {string} caption - The generated caption
 * @param {string[]} hashtags - Array of hashtags
 * @param {string} imageUrl - The image data URL
 * @returns {Object} Post object ready for CSV export
 */
export function createPostEntry(topic, caption, hashtags, imageUrl) {
  return {
    timestamp: new Date().toISOString(),
    topic,
    caption,
    hashtags,
    imageUrl,
  };
}
