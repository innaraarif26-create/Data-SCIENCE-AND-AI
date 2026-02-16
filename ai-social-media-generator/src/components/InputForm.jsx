import React, { useState } from 'react';

const InputForm = ({ onSubmit, isLoading }) => {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState('instagram');
  const [imageStyle, setImageStyle] = useState('professional');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (topic.trim()) {
      onSubmit({ topic: topic.trim(), platform, imageStyle });
    }
  };

  const characterLimit = 200;
  const remaining = characterLimit - topic.length;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Create Your Post</h2>
      <form onSubmit={handleSubmit}>
        {/* Topic Input */}
        <div className="mb-4">
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
            Topic or Prompt *
          </label>
          <textarea
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., A beautiful sunset over the ocean, Modern office workspace, Healthy breakfast ideas..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows="3"
            maxLength={characterLimit}
            required
            disabled={isLoading}
          />
          <div className="flex justify-between mt-1">
            <p className="text-xs text-gray-500">Be specific for better results</p>
            <p className={`text-xs ${remaining < 20 ? 'text-red-500' : 'text-gray-500'}`}>
              {remaining} characters remaining
            </p>
          </div>
        </div>

        {/* Platform Selection */}
        <div className="mb-4">
          <label htmlFor="platform" className="block text-sm font-medium text-gray-700 mb-2">
            Target Platform
          </label>
          <select
            id="platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          >
            <option value="instagram">Instagram</option>
            <option value="twitter">Twitter</option>
            <option value="linkedin">LinkedIn</option>
          </select>
        </div>

        {/* Image Style Selection */}
        <div className="mb-4">
          <label htmlFor="imageStyle" className="block text-sm font-medium text-gray-700 mb-2">
            Image Style
          </label>
          <select
            id="imageStyle"
            value={imageStyle}
            onChange={(e) => setImageStyle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          >
            <option value="professional">Professional</option>
            <option value="casual">Casual</option>
            <option value="artistic">Artistic</option>
            <option value="minimalist">Minimalist</option>
            <option value="vibrant">Vibrant & Colorful</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !topic.trim()}
          className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              Generate Post
            </>
          )}
        </button>
      </form>

      {/* API Key Notice */}
      {!import.meta.env.VITE_HUGGINGFACE_API_KEY && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            ⚠️ <strong>API Key Required:</strong> Please add your Hugging Face API key to the .env file to use AI features.
          </p>
        </div>
      )}
    </div>
  );
};

export default InputForm;
