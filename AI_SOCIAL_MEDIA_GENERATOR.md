# 🚀 AI Social Media Post Generator

## Quick Start

The AI Social Media Post Generator is located in the `ai-social-media-generator/` directory.

### Setup Instructions

1. **Navigate to the project directory:**
   ```bash
   cd ai-social-media-generator
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Get your free Hugging Face API key:**
   - Visit [https://huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)
   - Create a free account if needed
   - Generate a new token with "Read" permissions

4. **Configure environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env and add your API key
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

6. **Open in browser:**
   - Visit [http://localhost:5173](http://localhost:5173)

## Features

✨ **AI-Powered Content Generation**
- Generate images using Stable Diffusion
- Create engaging captions with GPT-2
- Generate relevant hashtags automatically

📱 **User-Friendly Interface**
- Clean, modern design with Tailwind CSS
- Responsive layout (mobile, tablet, desktop)
- Real-time platform preview

💾 **Multiple Download Options**
- Download image only (PNG)
- Download text only (TXT)
- Download combined post (image + text)
- Export data as CSV

🎨 **Customization Options**
- Multiple image styles (professional, casual, artistic, etc.)
- Platform-specific content (Instagram, Twitter, LinkedIn)
- Editable captions and hashtags

## Tech Stack

- **React 19** - Modern UI framework
- **Vite 7** - Fast build tool
- **Tailwind CSS v4** - Utility-first CSS
- **Hugging Face API** - Free AI models

## Documentation

For detailed documentation, see:
- [Complete README](ai-social-media-generator/README.md)
- [Project Documentation](ai-social-media-generator/DOCUMENTATION.md)

## Screenshots

### Desktop View
![Desktop](https://github.com/user-attachments/assets/47ebf635-e754-4863-b1a1-9282c4ab12a5)

### With Input
![With Input](https://github.com/user-attachments/assets/38e7559c-aaba-4e7d-998e-3a34d97c88f0)

### Mobile View
![Mobile](https://github.com/user-attachments/assets/d65d7886-1488-42d7-ade4-31ca33cbb8e1)

## Project Structure

```
ai-social-media-generator/
├── src/
│   ├── components/        # React components
│   ├── services/          # AI API integrations
│   ├── utils/            # Helper functions
│   └── App.jsx           # Main application
├── README.md             # Detailed documentation
├── DOCUMENTATION.md      # Technical documentation
└── .env.example          # Environment template
```

## Support

- 📚 [Full Documentation](ai-social-media-generator/README.md)
- 🐛 [Report Issues](https://github.com/innaraarif26-create/Data-SCIENCE-AND-AI/issues)
- 💡 [Feature Requests](https://github.com/innaraarif26-create/Data-SCIENCE-AND-AI/discussions)

## License

MIT License - Free to use and modify

---

Made with ❤️ using React, Vite, Tailwind CSS, and Hugging Face AI
