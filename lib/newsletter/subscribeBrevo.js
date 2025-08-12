// Appel frontend vers notre backend sécurisée (API Next.js)
import axios from 'axios';

export const subscribeToBrevo = async (email, token) => {
  try {
    const response = await axios.post('/api/newsletter/subscribeBrevoApi', {
      email,
      token,
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Erreur inconnue' };
  }
};
