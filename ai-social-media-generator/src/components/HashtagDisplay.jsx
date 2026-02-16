import React, { useState } from 'react';
import { copyToClipboard } from '../utils/downloadHelper';

const HashtagDisplay = ({ hashtags, onHashtagsChange }) => {
  const [copied, setCopied] = useState(false);

  const handleRemove = (index) => {
    const newHashtags = hashtags.filter((_, i) => i !== index);
    onHashtagsChange(newHashtags);
  };

  const handleCopyAll = async () => {
    const hashtagText = hashtags.join(' ');
    const success = await copyToClipboard(hashtagText);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!hashtags || hashtags.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Hashtags</h2>
        <button
          onClick={handleCopyAll}
          className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
          title="Copy all hashtags"
        >
          {copied ? (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
              Copy All
            </>
          )}
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {hashtags.map((hashtag, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors duration-200"
          >
            <span>{hashtag}</span>
            <button
              onClick={() => handleRemove(index)}
              className="hover:text-blue-900"
              title="Remove hashtag"
              aria-label={`Remove ${hashtag}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </span>
        ))}
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>{hashtags.length} hashtag{hashtags.length !== 1 ? 's' : ''} • Click to remove any hashtag</p>
      </div>
    </div>
  );
};

export default HashtagDisplay;
