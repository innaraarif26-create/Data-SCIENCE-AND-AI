// Text AI Service for caption and hashtag generation using Hugging Face

const TEXT_GEN_API_URL = "https://api-inference.huggingface.co/models/gpt2";

/**
 * Generate a social media caption based on the topic
 * @param {string} topic - The topic or prompt for caption generation
 * @param {string} platform - Social media platform (instagram, twitter, linkedin)
 * @returns {Promise<string>} - Generated caption
 */
export async function generateCaption(topic, platform = 'instagram') {
  const apiKey = import.meta.env.VITE_HUGGINGFACE_API_KEY;
  
  if (!apiKey || apiKey === 'your_api_key_here') {
    throw new Error('Hugging Face API key not configured');
  }

  // Craft a prompt based on the platform
  let maxLength = 280; // Default for Twitter
  let style = "engaging";

  switch (platform.toLowerCase()) {
    case 'instagram':
      maxLength = 150;
      style = "creative and engaging";
      break;
    case 'linkedin':
      maxLength = 200;
      style = "professional and informative";
      break;
    case 'twitter':
      maxLength = 280;
      style = "concise and witty";
      break;
  }

  const prompt = `Write a ${style} social media caption about ${topic}. Caption:`;

  try {
    const response = await fetch(TEXT_GEN_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_length: maxLength,
          temperature: 0.7,
          top_p: 0.9,
          do_sample: true,
          return_full_text: false,
        },
        options: {
          wait_for_model: true,
        }
      }),
    });

    if (!response.ok) {
      if (response.status === 503) {
        throw new Error('Model is loading. Please try again in a few moments.');
      }
      throw new Error(`Failed to generate caption: ${response.statusText}`);
    }

    const result = await response.json();
    let caption = result[0]?.generated_text || '';
    
    // Clean up the caption
    caption = caption.replace(prompt, '').trim();
    caption = caption.split('\n')[0]; // Take first line only
    
    // If caption is empty or too short, provide a fallback
    if (!caption || caption.length < 10) {
      caption = generateFallbackCaption(topic, platform);
    }

    return caption;
  } catch (error) {
    console.error('Caption generation error:', error);
    // Return fallback caption on error
    return generateFallbackCaption(topic, platform);
  }
}

/**
 * Generate relevant hashtags based on the topic
 * @param {string} topic - The topic for hashtag generation
 * @param {number} count - Number of hashtags to generate (default: 5)
 * @returns {Promise<string[]>} - Array of hashtags
 */
export async function generateHashtags(topic, count = 5) {
  const apiKey = import.meta.env.VITE_HUGGINGFACE_API_KEY;
  
  if (!apiKey || apiKey === 'your_api_key_here') {
    return generateFallbackHashtags(topic, count);
  }

  const prompt = `Generate ${count} relevant hashtags for a post about ${topic}. Hashtags:`;

  try {
    const response = await fetch(TEXT_GEN_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_length: 100,
          temperature: 0.8,
          top_p: 0.9,
          do_sample: true,
          return_full_text: false,
        },
        options: {
          wait_for_model: true,
        }
      }),
    });

    if (!response.ok) {
      return generateFallbackHashtags(topic, count);
    }

    const result = await response.json();
    let hashtagText = result[0]?.generated_text || '';
    
    // Extract hashtags from the generated text
    const hashtagMatches = hashtagText.match(/#\w+/g);
    
    if (hashtagMatches && hashtagMatches.length > 0) {
      return hashtagMatches.slice(0, count);
    }
    
    // Fallback to generated hashtags if no hashtags found
    return generateFallbackHashtags(topic, count);
  } catch (error) {
    console.error('Hashtag generation error:', error);
    return generateFallbackHashtags(topic, count);
  }
}

/**
 * Generate fallback caption when AI generation fails
 * @private
 */
function generateFallbackCaption(topic, platform) {
  const templates = {
    instagram: [
      `✨ Excited to share this amazing ${topic}! 💫`,
      `Check out this incredible ${topic}! 🌟`,
      `Loving everything about ${topic}! ❤️`,
    ],
    twitter: [
      `Thoughts on ${topic}? Let's discuss! 💭`,
      `Just discovered something amazing about ${topic}!`,
      `${topic} is game-changing! 🚀`,
    ],
    linkedin: [
      `Sharing insights on ${topic} and its impact on our industry.`,
      `Exploring the latest developments in ${topic}.`,
      `Key takeaways from my research on ${topic}.`,
    ]
  };

  const platformTemplates = templates[platform.toLowerCase()] || templates.instagram;
  return platformTemplates[Math.floor(Math.random() * platformTemplates.length)];
}

/**
 * Generate fallback hashtags when AI generation fails
 * @private
 */
function generateFallbackHashtags(topic, count) {
  // Convert topic to hashtags
  const words = topic.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/);
  const hashtags = [];
  
  // Add main topic as hashtag
  const mainHashtag = words.join('');
  if (mainHashtag) {
    hashtags.push(`#${mainHashtag}`);
  }
  
  // Add individual word hashtags
  words.forEach(word => {
    if (word.length > 2 && hashtags.length < count) {
      hashtags.push(`#${word}`);
    }
  });
  
  // Add common generic hashtags to fill up to count
  const commonHashtags = [
    '#socialmedia',
    '#content',
    '#trending',
    '#viral',
    '#instagood',
    '#photooftheday',
    '#amazing',
    '#awesome',
  ];
  
  for (const tag of commonHashtags) {
    if (hashtags.length >= count) break;
    if (!hashtags.includes(tag)) {
      hashtags.push(tag);
    }
  }
  
  return hashtags.slice(0, count);
}
