// Image AI Service using Hugging Face Inference API

const API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1";

/**
 * Generate an image from a text prompt using Hugging Face Stable Diffusion
 * @param {string} prompt - The text description for image generation
 * @returns {Promise<string>} - Base64 encoded image data URL
 */
export async function generateImage(prompt) {
  const apiKey = import.meta.env.VITE_HUGGINGFACE_API_KEY;
  
  if (!apiKey || apiKey === 'your_api_key_here') {
    throw new Error('Hugging Face API key not configured. Please add VITE_HUGGINGFACE_API_KEY to your .env file');
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        options: {
          wait_for_model: true,
        }
      }),
    });

    if (!response.ok) {
      if (response.status === 503) {
        throw new Error('Model is loading. Please try again in a few moments.');
      } else if (response.status === 401) {
        throw new Error('Invalid API key. Please check your Hugging Face API key.');
      }
      throw new Error(`Failed to generate image: ${response.statusText}`);
    }

    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Image generation error:', error);
    throw error;
  }
}

/**
 * Check if API is available
 * @returns {Promise<boolean>}
 */
export async function checkAPIAvailability() {
  const apiKey = import.meta.env.VITE_HUGGINGFACE_API_KEY;
  
  if (!apiKey || apiKey === 'your_api_key_here') {
    return false;
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: "test",
      }),
    });

    return response.ok || response.status === 503;
  } catch (error) {
    return false;
  }
}
