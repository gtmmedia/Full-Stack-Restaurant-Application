// API Configuration
const API_CONFIG = {
  // For production deployment on Render
  BASE_URL: import.meta.env.VITE_API_URL || 'https://full-stack-restaurant-application-backend.onrender.com',
  
  // API endpoints
  ENDPOINTS: {
    RESERVATION_SEND: '/api/v1/reservation/send',
    RESERVATION_ALL: '/api/v1/reservation/all'
  }
};

export default API_CONFIG;
