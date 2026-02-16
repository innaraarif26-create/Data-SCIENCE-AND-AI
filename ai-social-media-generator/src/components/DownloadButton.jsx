import React, { useState } from 'react';
import { downloadImage, downloadText, downloadImageWithText } from '../utils/downloadHelper';
import { exportToCSV, createPostEntry } from '../utils/csvExport';

const DownloadButton = ({ image, caption, hashtags, topic }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const canDownload = image && caption && hashtags;

  const handleDownloadImage = () => {
    if (!image) return;
    
    setIsDownloading(true);
    try {
      downloadImage(image, 'social-media-image.png');
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download image. Please try again.');
    } finally {
      setIsDownloading(false);
      setShowMenu(false);
    }
  };

  const handleDownloadText = () => {
    if (!caption || !hashtags) return;
    
    setIsDownloading(true);
    try {
      const content = `${caption}\n\n${hashtags.join(' ')}`;
      downloadText(content, 'post-content.txt');
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download text. Please try again.');
    } finally {
      setIsDownloading(false);
      setShowMenu(false);
    }
  };

  const handleDownloadCombined = async () => {
    if (!image || !caption || !hashtags) return;
    
    setIsDownloading(true);
    try {
      await downloadImageWithText(image, caption, hashtags, 'social-media-post.png');
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download combined post. Please try again.');
    } finally {
      setIsDownloading(false);
      setShowMenu(false);
    }
  };

  const handleExportCSV = () => {
    if (!caption || !hashtags || !topic) return;
    
    setIsDownloading(true);
    try {
      const post = createPostEntry(topic, caption, hashtags, image || '');
      exportToCSV([post], 'post-data.csv');
    } catch (error) {
      console.error('Export error:', error);
      alert('Failed to export CSV. Please try again.');
    } finally {
      setIsDownloading(false);
      setShowMenu(false);
    }
  };

  if (!canDownload) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Download</h2>
      
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          disabled={isDownloading}
          className="w-full bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
        >
          {isDownloading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Downloading...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              Download Options
              <svg className={`w-5 h-5 ml-2 transition-transform ${showMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </>
          )}
        </button>

        {showMenu && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
            <button
              onClick={handleDownloadImage}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors duration-200 flex items-center"
            >
              <svg className="w-5 h-5 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <div>
                <div className="font-medium">Image Only</div>
                <div className="text-xs text-gray-500">Download as PNG</div>
              </div>
            </button>

            <button
              onClick={handleDownloadText}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors duration-200 flex items-center border-t border-gray-100"
            >
              <svg className="w-5 h-5 mr-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <div>
                <div className="font-medium">Text Only</div>
                <div className="text-xs text-gray-500">Caption + Hashtags as TXT</div>
              </div>
            </button>

            <button
              onClick={handleDownloadCombined}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors duration-200 flex items-center border-t border-gray-100"
            >
              <svg className="w-5 h-5 mr-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
              <div>
                <div className="font-medium">Combined Post</div>
                <div className="text-xs text-gray-500">Image with text overlay</div>
              </div>
            </button>

            <button
              onClick={handleExportCSV}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors duration-200 flex items-center border-t border-gray-100"
            >
              <svg className="w-5 h-5 mr-3 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <div>
                <div className="font-medium">Export as CSV</div>
                <div className="text-xs text-gray-500">Batch processing format</div>
              </div>
            </button>
          </div>
        )}
      </div>

      {showMenu && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowMenu(false)}
        ></div>
      )}
    </div>
  );
};

export default DownloadButton;
