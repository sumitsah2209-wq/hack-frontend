import axiosInstance from './axiosInstance';

// Create a donation
export const createDonation = async (donationData) => {
  try {
    const response = await axiosInstance.post('/greenround/donations', donationData);
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Get user's donations
export const getUserDonations = async (page = 1, limit = 10) => {
  try {
    const response = await axiosInstance.get(
      `/greenround/donations?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Get province leaderboard
export const getProvinceLeaderboard = async (period = 'monthly', province = null) => {
  try {
    let url = `/greenround/leaderboard?period=${period}`;
    if (province) url += `&province=${province}`;
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Get user contribution statistics
export const getUserContributionStats = async () => {
  try {
    const response = await axiosInstance.get('/greenround/stats');
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Get GreenRound analytics
export const getGreenRoundAnalytics = async () => {
  try {
    const response = await axiosInstance.get('/greenround/analytics');
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Get GreenRound settings
export const getGreenRoundSettings = async () => {
  try {
    const response = await axiosInstance.get('/greenround/settings');
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Toggle GreenRound
export const toggleGreenRound = async (enabled) => {
  try {
    const response = await axiosInstance.post('/greenround/settings/toggle', {
      enabled,
    });
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};
