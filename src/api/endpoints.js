import axiosInstance from './axiosConfig';

// ─── Auth ────────────────────────────────────────────────────────────────────
export const authAPI = {
  login: (credentials) => axiosInstance.post('/auth/login/', credentials),
  register: (userData) => axiosInstance.post('/auth/register/', userData),
  logout: () => axiosInstance.post('/auth/logout/'),
  getProfile: () => axiosInstance.get('/auth/profile/'),
  updateProfile: (data) => axiosInstance.put('/auth/profile/', data),
  changePassword: (data) => axiosInstance.post('/auth/change-password/', data),
};

// ─── Analysis ────────────────────────────────────────────────────────────────
export const analysisAPI = {
  analyzeProduct: (data) => axiosInstance.post('/analysis/analyze/', data),
  getAnalysisById: (id) => axiosInstance.get(`/analysis/${id}/`),
  getHistory: (params) => axiosInstance.get('/analysis/history/', { params }),
  deleteAnalysis: (id) => axiosInstance.delete(`/analysis/${id}/`),
};

// ─── Dashboard ───────────────────────────────────────────────────────────────
export const dashboardAPI = {
  getDashboardData: () => axiosInstance.get('/dashboard/'),
  getHealthScore: () => axiosInstance.get('/dashboard/health-score/'),
  getRecommendations: () => axiosInstance.get('/dashboard/recommendations/'),
};

// ─── Settings ────────────────────────────────────────────────────────────────
export const settingsAPI = {
  getSettings: () => axiosInstance.get('/settings/'),
  updateSettings: (data) => axiosInstance.put('/settings/', data),
};
