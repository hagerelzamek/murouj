// src/translationService.js
import axios from 'axios';

const TRANSLATE_API_URL = 'https://translation.googleapis.com/language/translate/v2';
const API_KEY = 'YOUR_GOOGLE_API_KEY'; // Replace with your actual API key

export const translateText = async (text, targetLanguage) => {
  try {
    const response = await axios.post(TRANSLATE_API_URL, null, {
      params: {
        q: text,
        target: targetLanguage,
        key: API_KEY,
      },
    });

    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error('Error translating text:', error);
    return text; // Fallback to original text in case of error
  }
};
