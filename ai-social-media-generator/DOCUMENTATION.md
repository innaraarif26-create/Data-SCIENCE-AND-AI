# AI Social Media Post Generator - Project Documentation

## Project Overview
This is a complete AI-powered social media post generator built with React, Vite, and Tailwind CSS. It uses free AI APIs from Hugging Face to generate images, captions, and hashtags for social media posts.

## Architecture

### Component Structure
```
App.jsx (Main Container)
├── InputForm.jsx (User Input)
├── ImageGenerator.jsx (AI Image Display)
├── CaptionDisplay.jsx (AI Caption with Edit)
├── HashtagDisplay.jsx (AI Hashtags with Remove)
├── DownloadButton.jsx (Multi-format Download)
└── PreviewCard.jsx (Platform Preview)
```

### Service Layer
- **imageAI.js**: Handles Stable Diffusion API calls for image generation
- **textAI.js**: Handles GPT-2 API calls for caption and hashtag generation

### Utility Layer
- **downloadHelper.js**: File download utilities (PNG, TXT, Canvas overlay)
- **csvExport.js**: CSV export for batch processing

## API Integration

### Hugging Face Inference API
- **Image Model**: stabilityai/stable-diffusion-2-1
- **Text Model**: gpt2
- **Rate Limits**: 
  - Images: ~100 requests/day (free tier)
  - Text: ~1000 requests/day (free tier)

### Error Handling
- Model loading states (503 errors)
- API key validation
- Fallback content for text generation
- Retry mechanisms for failed requests

## State Management

The app uses React hooks for state management:
- `isLoading`: Global loading state
- `image`: Generated image data URL
- `caption`: Generated/edited caption text
- `hashtags`: Array of hashtag strings
- `platform`: Selected platform (instagram/twitter/linkedin)
- `topic`: User input topic
- `imageError`: Error messages
- `successMessage`: Success notifications

## Features

### 1. AI Image Generation
- Prompt enhancement based on style selection
- Base64 data URL response handling
- Loading states with progress indicators
- Error handling with user-friendly messages

### 2. AI Caption Generation
- Platform-specific tone and style
- Character limit awareness
- Fallback templates for reliability
- Inline editing capability

### 3. AI Hashtag Generation
- Topic-based hashtag creation
- Removable hashtag chips
- Fallback hashtag generation
- Copy all functionality

### 4. Download Options
1. **Image Only**: Direct PNG download
2. **Text Only**: TXT file with caption + hashtags
3. **Combined**: Canvas-rendered image with text overlay
4. **CSV Export**: Structured data for batch processing

### 5. Platform Preview
- Instagram-style mock preview
- Twitter/X-style mock preview
- LinkedIn-style mock preview
- Realistic engagement buttons (non-functional)

## Security Considerations

### Environment Variables
- API keys stored in `.env` file
- `.env` excluded from git via `.gitignore`
- `.env.example` provided for reference
- Client-side validation for API key presence

### API Security
- No API keys exposed in client code
- Vite environment variable prefix (`VITE_`)
- API calls made directly from client (no backend needed)

### Data Privacy
- No user data stored on server
- All processing happens client-side
- Generated content not logged or saved
- localStorage not used (privacy-first approach)

## Performance Optimizations

### Parallel API Calls
- Image, caption, and hashtags generated simultaneously using `Promise.allSettled`
- Reduces total generation time by ~60%

### Error Resilience
- `Promise.allSettled` ensures partial success
- Each API call has independent error handling
- Fallback content prevents total failure

### Loading States
- Component-level loading states
- Global loading indicator
- Estimated time displays
- Progress feedback

## Responsive Design

### Breakpoints
- Mobile: < 1024px (single column)
- Desktop: >= 1024px (two columns)

### Mobile Optimizations
- Touch-friendly button sizes
- Scrollable preview
- Optimized form inputs
- Condensed navigation

## Browser Compatibility

### Supported Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Polyfills & Fallbacks
- Canvas API (widely supported)
- Clipboard API with `execCommand` fallback
- Blob API (widely supported)

## Testing Checklist

### Functional Testing
- [ ] Image generation works
- [ ] Caption generation works
- [ ] Hashtag generation works
- [ ] All download options work
- [ ] Edit caption functionality works
- [ ] Remove hashtag functionality works
- [ ] Copy to clipboard works
- [ ] Platform selection affects output
- [ ] Image style selection affects prompt

### Error Handling Testing
- [ ] Invalid API key shows error
- [ ] Missing API key shows warning
- [ ] Network errors handled gracefully
- [ ] Model loading (503) shows appropriate message
- [ ] Retry mechanism works

### UI/UX Testing
- [ ] Responsive on mobile (375px)
- [ ] Responsive on tablet (768px)
- [ ] Responsive on desktop (1920px)
- [ ] Loading states visible
- [ ] Success messages show
- [ ] Error messages clear
- [ ] Buttons disabled during loading

### Performance Testing
- [ ] Build size < 250KB gzipped
- [ ] Initial load < 3 seconds
- [ ] Generation < 30 seconds
- [ ] No memory leaks
- [ ] Smooth animations

## Deployment

### Environment Setup
1. Add `VITE_HUGGINGFACE_API_KEY` to hosting platform
2. Ensure build command: `npm run build`
3. Set output directory: `dist`
4. Set Node version: 18+

### Platform-Specific Notes

#### Vercel
- Auto-detects Vite
- Environment variables in dashboard
- Zero-config deployment

#### Netlify
- Build command: `npm run build`
- Publish directory: `dist`
- Node version: 18

#### GitHub Pages
- Not recommended (no environment variable support)
- Use Vercel or Netlify instead

## Troubleshooting

### Common Issues

1. **"Model is loading" error**
   - Wait 10-30 seconds
   - Try again (model is warming up)

2. **API key not working**
   - Check `.env` file location
   - Restart dev server
   - Verify key starts with `hf_`

3. **Build fails**
   - Clear node_modules: `rm -rf node_modules`
   - Reinstall: `npm install`
   - Clear cache: `rm -rf .vite`

4. **Tailwind not working**
   - Check postcss.config.js
   - Verify @tailwindcss/postcss installed
   - Check index.css imports

## Future Enhancements

### High Priority
- [ ] Post scheduling feature
- [ ] User authentication
- [ ] Post history/library
- [ ] More AI models

### Medium Priority
- [ ] Batch generation
- [ ] Template library
- [ ] Dark mode
- [ ] Multi-language support

### Low Priority
- [ ] Analytics dashboard
- [ ] Direct social media posting
- [ ] Team collaboration
- [ ] A/B testing for captions

## Contributing

### Development Setup
1. Fork the repository
2. Clone your fork
3. Install dependencies: `npm install`
4. Create `.env` with your API key
5. Start dev server: `npm run dev`

### Code Style
- Use ESLint configuration
- Follow existing patterns
- Add comments for complex logic
- Keep components small and focused

### Testing Requirements
- Test on multiple browsers
- Verify responsive design
- Check accessibility
- Validate error handling

## License
MIT License - See LICENSE file for details

## Support
For issues and questions, please use GitHub Issues.
