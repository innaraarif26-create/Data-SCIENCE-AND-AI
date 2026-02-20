import React, { useState } from 'react';
import InputForm from './components/InputForm';
import ImageGenerator from './components/ImageGenerator';
import CaptionDisplay from './components/CaptionDisplay';
import HashtagDisplay from './components/HashtagDisplay';
import DownloadButton from './components/DownloadButton';
import PreviewCard from './components/PreviewCard';
import { generateImage } from './services/imageAI';
import { generateCaption, generateHashtags } from './services/textAI';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState([]);
  const [platform, setPlatform] = useState('instagram');
  const [topic, setTopic] = useState('');
  const [imageError, setImageError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleGenerate = async ({ topic: newTopic, platform: newPlatform, imageStyle }) => {
    setIsLoading(true);
    setImageError(null);
    setSuccessMessage('');
    setTopic(newTopic);
    setPlatform(newPlatform);

    try {
      // Enhance the prompt with the selected style
      const enhancedPrompt = `${imageStyle} style, ${newTopic}, high quality, detailed`;

      // Generate all content in parallel for better performance
      const [imageResult, captionResult, hashtagsResult] = await Promise.allSettled([
        generateImage(enhancedPrompt),
        generateCaption(newTopic, newPlatform),
        generateHashtags(newTopic, 5),
      ]);

      // Handle image result
      if (imageResult.status === 'fulfilled') {
        setImage(imageResult.value);
      } else {
        setImageError(imageResult.reason?.message || 'Failed to generate image');
      }

      // Handle caption result
      if (captionResult.status === 'fulfilled') {
        setCaption(captionResult.value);
      } else {
        console.error('Caption generation failed:', captionResult.reason);
        // Set a default caption if generation fails
        setCaption(`Check out this amazing content about ${newTopic}! 🚀`);
      }

      // Handle hashtags result
      if (hashtagsResult.status === 'fulfilled') {
        setHashtags(hashtagsResult.value);
      } else {
        console.error('Hashtags generation failed:', hashtagsResult.reason);
        // Set default hashtags if generation fails
        setHashtags(['#socialmedia', '#content', '#trending']);
      }

      setSuccessMessage('✅ Content generated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Generation error:', error);
      setImageError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (topic) {
      handleGenerate({ topic, platform, imageStyle: 'professional' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AI Social Media Generator</h1>
                <p className="text-sm text-gray-600">Create engaging posts with AI</p>
              </div>
            </div>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              title="View on GitHub"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* Success Message */}
      {successMessage && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2 text-green-800">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
            </svg>
            {successMessage}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Input and Controls */}
          <div>
            <InputForm onSubmit={handleGenerate} isLoading={isLoading} />
            <ImageGenerator
              image={image}
              isLoading={isLoading}
              error={imageError}
              onRetry={handleRetry}
            />
          </div>

          {/* Right Column - Generated Content */}
          <div>
            <CaptionDisplay
              caption={caption}
              onCaptionChange={setCaption}
              platform={platform}
            />
            <HashtagDisplay
              hashtags={hashtags}
              onHashtagsChange={setHashtags}
            />
            <DownloadButton
              image={image}
              caption={caption}
              hashtags={hashtags}
              topic={topic}
            />
            <PreviewCard
              image={image}
              caption={caption}
              hashtags={hashtags}
              platform={platform}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-600 text-sm">
          <div className="border-t border-gray-200 pt-8 pb-4">
            <p>Made with ❤️ using React, Vite, Tailwind CSS, and Hugging Face AI</p>
            <p className="mt-2">
              Free and open source •{' '}
              <a href="#" className="text-blue-600 hover:text-blue-800">Documentation</a> •{' '}
              <a href="#" className="text-blue-600 hover:text-blue-800">Get API Key</a>
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
