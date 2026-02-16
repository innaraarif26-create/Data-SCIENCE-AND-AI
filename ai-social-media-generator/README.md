# 🚀 AI Social Media Post Generator

A complete AI-powered social media post generator that allows users to create engaging social media content with AI-generated images, captions, and hashtags - all using free tools and APIs!

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.3.1-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.18-38B2AC?logo=tailwind-css)

## ✨ Features

### Core Features
- **🎨 AI Image Generation**: Generate stunning social media images using Stable Diffusion
- **✍️ AI Caption Generation**: Create engaging captions tailored to your platform
- **#️⃣ AI Hashtag Generation**: Generate relevant hashtags for better reach
- **💾 Multiple Download Options**: Download images, text, or combined posts
- **📱 Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **🎯 Platform-Specific**: Optimize content for Instagram, Twitter, or LinkedIn
- **🎭 Multiple Image Styles**: Choose from professional, casual, artistic, and more
- **👁️ Live Preview**: See how your post will look on different platforms
- **✏️ Editable Content**: Edit captions and remove hashtags as needed
- **📋 Copy to Clipboard**: Quickly copy captions and hashtags
- **📊 CSV Export**: Export post data for batch processing

## 🛠️ Tech Stack

All tools used are **100% free** with generous free tiers:

- **Frontend Framework**: [React 19](https://react.dev) with [Vite](https://vitejs.dev)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **AI Image Generation**: [Hugging Face Inference API](https://huggingface.co/docs/api-inference/index) - Stable Diffusion 2.1
- **AI Text Generation**: [Hugging Face Inference API](https://huggingface.co/docs/api-inference/index) - GPT-2
- **State Management**: React Hooks (useState, useEffect)
- **File Downloads**: Canvas API and Blob API

## 📋 Prerequisites

- Node.js 18+ and npm
- A free Hugging Face account and API token

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/innaraarif26-create/Data-SCIENCE-AND-AI.git
cd Data-SCIENCE-AND-AI/ai-social-media-generator
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Get Your Free Hugging Face API Key

1. Go to [Hugging Face](https://huggingface.co/join)
2. Create a free account
3. Navigate to [Settings → Access Tokens](https://huggingface.co/settings/tokens)
4. Click "New token"
5. Give it a name (e.g., "social-media-generator")
6. Select "Read" role
7. Click "Generate a token"
8. Copy your token

### 4. Configure Environment Variables

```bash
# Copy the example env file
cp .env.example .env

# Open .env and add your API key
# VITE_HUGGINGFACE_API_KEY=hf_your_actual_token_here
```

### 5. Run the Development Server

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) to see the app in action!

## 📖 Usage Guide

### Creating Your First Post

1. **Enter a Topic**: Describe what you want your post to be about
   - Example: "A beautiful sunset over the ocean"
   - Example: "Modern office workspace with natural lighting"

2. **Select Platform**: Choose your target social media platform
   - Instagram (optimal for visual content)
   - Twitter (concise, witty captions)
   - LinkedIn (professional tone)

3. **Choose Image Style**: Select the aesthetic you want
   - Professional
   - Casual
   - Artistic
   - Minimalist
   - Vibrant & Colorful

4. **Generate**: Click "Generate Post" and wait 10-30 seconds

5. **Review & Edit**: 
   - Edit the generated caption if needed
   - Remove unwanted hashtags
   - Preview how it looks

6. **Download**: Choose your download option
   - Image only (PNG)
   - Text only (TXT with caption + hashtags)
   - Combined (image with text overlay)
   - CSV export (for batch processing)

## 🏗️ Project Structure

```
ai-social-media-generator/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── InputForm.jsx          # User input form
│   │   ├── ImageGenerator.jsx     # Image display & loading
│   │   ├── CaptionDisplay.jsx     # Caption with edit functionality
│   │   ├── HashtagDisplay.jsx     # Hashtag chips with remove option
│   │   ├── DownloadButton.jsx     # Multi-option download menu
│   │   └── PreviewCard.jsx        # Platform preview mockup
│   ├── services/
│   │   ├── imageAI.js             # Hugging Face image API
│   │   └── textAI.js              # Hugging Face text API
│   ├── utils/
│   │   ├── downloadHelper.js      # Download utilities
│   │   └── csvExport.js           # CSV export functionality
│   ├── App.jsx                    # Main app component
│   ├── App.css                    # Additional styles
│   ├── index.css                  # Tailwind imports
│   └── main.jsx                   # React entry point
├── .env.example                   # Environment variables template
├── .gitignore
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🎨 Features in Detail

### AI Image Generation
- Uses Stable Diffusion 2.1 model
- Automatic prompt enhancement based on style selection
- Error handling with retry mechanism
- Loading states with estimated time
- High-quality image output

### AI Caption Generation
- Platform-specific tone and style
- Character limit awareness
- Fallback templates for reliability
- Editable output
- Copy to clipboard functionality

### AI Hashtag Generation
- Relevant hashtag suggestions
- Removable hashtag chips
- Copy all hashtags at once
- Fallback generation for consistency

### Download Options
1. **Image Only**: High-quality PNG download
2. **Text Only**: TXT file with caption and hashtags
3. **Combined**: Image with text overlay using Canvas API
4. **CSV Export**: Structured data for batch processing

### Platform Preview
- Instagram-style preview
- Twitter/X-style preview
- LinkedIn-style preview
- Realistic mock engagement buttons

## 🔧 Configuration

### API Rate Limits
The free Hugging Face tier includes:
- Image generation: ~100 requests/day
- Text generation: ~1000 requests/day

### Customization
Edit these files to customize:
- `src/services/imageAI.js`: Change image model or parameters
- `src/services/textAI.js`: Modify caption/hashtag generation logic
- `tailwind.config.js`: Customize colors and design system
- `src/App.jsx`: Adjust layout and flow

## 📦 Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` folder.

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Add environment variables in Vercel dashboard:
   - Go to your project settings
   - Add `VITE_HUGGINGFACE_API_KEY`

### Deploy to Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build and deploy:
```bash
npm run build
netlify deploy --prod --dir=dist
```

3. Add environment variables in Netlify dashboard

### Deploy to GitHub Pages

1. Install gh-pages:
```bash
npm install -D gh-pages
```

2. Add to package.json:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://your-username.github.io/ai-social-media-generator"
}
```

3. Deploy:
```bash
npm run deploy
```

**Note**: For GitHub Pages, you'll need to set environment variables differently (they're not supported directly). Consider using Vercel or Netlify instead.

## 🐛 Troubleshooting

### "Model is loading" Error
- The AI model needs to warm up (first request after being idle)
- Wait 10-30 seconds and try again
- This is normal behavior for free-tier Hugging Face models

### API Key Issues
- Ensure your `.env` file is in the root directory
- Check that the key starts with `hf_`
- Restart the dev server after adding the key
- Make sure the key has "Read" permissions

### Build Errors
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear cache: `rm -rf .vite`
- Update dependencies: `npm update`

### Image Not Generating
- Check your internet connection
- Verify API key is valid
- Check browser console for error messages
- Try a simpler prompt

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Add comments for complex logic
- Test on multiple browsers
- Ensure responsive design works
- Update README if adding features

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Hugging Face](https://huggingface.co) for free AI model hosting
- [Stability AI](https://stability.ai) for Stable Diffusion
- [React](https://react.dev) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS

## 🗺️ Roadmap

- [ ] Post scheduling functionality
- [ ] User authentication and post history
- [ ] More AI models (DALL-E alternatives)
- [ ] Batch generation (multiple posts at once)
- [ ] Template library
- [ ] Dark mode support
- [ ] Multi-language support (i18n)
- [ ] Analytics dashboard
- [ ] Direct posting to social media APIs

---

Made with ❤️ using React, Vite, Tailwind CSS, and Hugging Face AI

**Free, Open Source, and AI-Powered** 🚀
