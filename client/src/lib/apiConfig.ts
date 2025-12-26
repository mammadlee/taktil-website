// API base URL - production və development üçün
export const API_BASE_URL = import.meta.env.VITE_API_URL || '';

// Helper function - bütün API çağırışları üçün
export function getApiUrl(path: string): string {
  // Path "/" ilə başlamalıdır
  if (!path.startsWith('/')) {
    path = '/' + path;
  }
  
  return `${API_BASE_URL}${path}`;
}