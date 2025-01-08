import { MESSAGE_TYPES, LIMITS } from './constants.js';

export const validateUsername = (username) => {
  if (!username || typeof username !== 'string') {
    throw new Error('Geçersiz kullanıcı adı');
  }
  
  const trimmedUsername = username.trim();
  if (trimmedUsername.length < LIMITS.USERNAME_MIN_LENGTH || 
      trimmedUsername.length > LIMITS.USERNAME_MAX_LENGTH) {
    throw new Error(`Kullanıcı adı ${LIMITS.USERNAME_MIN_LENGTH}-${LIMITS.USERNAME_MAX_LENGTH} karakter arasında olmalıdır`);
  }
  
  return trimmedUsername;
};

export const validateMessage = (message) => {
  if (!message || typeof message !== 'string') {
    throw new Error('Geçersiz mesaj');
  }
  
  const trimmedMessage = message.trim();
  if (trimmedMessage.length === 0 || trimmedMessage.length > LIMITS.MESSAGE_LENGTH) {
    throw new Error(`Mesaj 1-${LIMITS.MESSAGE_LENGTH} karakter arasında olmalıdır`);
  }
  
  return trimmedMessage;
};

export const createSystemMessage = async (Message, message) => {
  return await Message.create({
    username: 'System',
    message,
    type: MESSAGE_TYPES.SYSTEM,
    createdAt: new Date()
  });
};

export const debug = (message, ...args) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[DEBUG] ${message}`, ...args);
  }
};

export const sanitizeInput = (input) => {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}; 