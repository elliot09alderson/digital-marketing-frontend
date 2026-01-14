// API Configuration
// Uses environment variable or defaults to /api (works with Vite proxy and nginx)
export const API_URL = import.meta.env.VITE_API_URL || '/api';
