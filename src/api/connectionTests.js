// FRONTEND-BACKEND CONNECTION VERIFICATION SCRIPT
// This script tests all API connections between frontend and backend

import axiosInstance from './api/axiosInstance';

// Test configuration
const DEMO_USER_ID = "69fdabbcf923adec7bd512ad";
const API_BASE = 'http://localhost:5000/api';

const connectionTests = [
  // ===== USER ENDPOINTS =====
  {
    name: 'Get User Profile',
    method: 'GET',
    endpoint: '/user/profile',
    requiresAuth: true,
    category: 'User Management'
  },
  {
    name: 'Load Funds',
    method: 'POST',
    endpoint: '/user/load-funds',
    data: { userId: DEMO_USER_ID, amount: 1000 },
    requiresAuth: true,
    category: 'User Management'
  },
  {
    name: 'Update Preferences',
    method: 'POST',
    endpoint: '/user/update-preferences',
    data: { userId: DEMO_USER_ID, preferences: {} },
    requiresAuth: true,
    category: 'User Management'
  },

  // ===== TRANSACTION ENDPOINTS =====
  {
    name: 'Get Transactions',
    method: 'GET',
    endpoint: `/transactions/${DEMO_USER_ID}`,
    requiresAuth: true,
    category: 'Transactions'
  },
  {
    name: 'Add Transaction',
    method: 'POST',
    endpoint: '/transactions/add',
    data: { amount: 100, merchant: 'Test', type: 'DEBIT', category: 'Test' },
    requiresAuth: true,
    category: 'Transactions'
  },

  // ===== PAYMENT ENDPOINTS =====
  {
    name: 'Execute Payment',
    method: 'POST',
    endpoint: '/payment/execute',
    data: { userId: DEMO_USER_ID, amount: 100, merchant: 'Test' },
    requiresAuth: true,
    category: 'Payments'
  },
  {
    name: 'Get Payment Schedules',
    method: 'GET',
    endpoint: `/payment/schedule/${DEMO_USER_ID}`,
    requiresAuth: true,
    category: 'Payments'
  },
  {
    name: 'Retry Payment',
    method: 'POST',
    endpoint: '/payment/retry-payment',
    data: { scheduleId: 'test-id' },
    requiresAuth: true,
    category: 'Payments'
  },
  {
    name: 'Get Payment History',
    method: 'GET',
    endpoint: `/payment/history/${DEMO_USER_ID}`,
    requiresAuth: true,
    category: 'Payments'
  },

  // ===== NOTIFICATION ENDPOINTS =====
  {
    name: 'Get Notifications',
    method: 'GET',
    endpoint: `/notifications/${DEMO_USER_ID}`,
    requiresAuth: true,
    category: 'Notifications'
  },
  {
    name: 'Mark as Read',
    method: 'PUT',
    endpoint: '/notifications/test-id/read',
    requiresAuth: true,
    category: 'Notifications'
  },
  {
    name: 'Delete Notification',
    method: 'DELETE',
    endpoint: '/notifications/test-id',
    requiresAuth: true,
    category: 'Notifications'
  },

  // ===== RECURRING PAYMENT ENDPOINTS =====
  {
    name: 'Get Recurring Payments',
    method: 'GET',
    endpoint: `/recurring/${DEMO_USER_ID}`,
    requiresAuth: true,
    category: 'Recurring Payments'
  },
  {
    name: 'Detect Recurring',
    method: 'POST',
    endpoint: '/recurring/detect',
    data: { userId: DEMO_USER_ID },
    requiresAuth: true,
    category: 'Recurring Payments'
  },
  {
    name: 'Enable Autopay',
    method: 'POST',
    endpoint: '/recurring/enable-autopay',
    data: { recurringId: 'test-id', enable: true },
    requiresAuth: true,
    category: 'Recurring Payments'
  },

  // ===== ANALYTICS ENDPOINTS =====
  {
    name: 'Get Dashboard Analytics',
    method: 'GET',
    endpoint: `/analytics/dashboard/${DEMO_USER_ID}`,
    requiresAuth: true,
    category: 'Analytics'
  },

  // ===== PREDICTION ENDPOINTS =====
  {
    name: 'Get Predictions',
    method: 'GET',
    endpoint: '/predictions',
    requiresAuth: true,
    category: 'Predictions'
  },
  {
    name: 'Get Wallet Forecast',
    method: 'GET',
    endpoint: '/predictions/forecast',
    requiresAuth: true,
    category: 'Predictions'
  },

  // ===== ML ENDPOINTS =====
  {
    name: 'Check ML Health',
    method: 'GET',
    endpoint: '/ml/health',
    requiresAuth: false,
    category: 'ML Service'
  },
  {
    name: 'Get ML Info',
    method: 'GET',
    endpoint: '/ml/info',
    requiresAuth: false,
    category: 'ML Service'
  },
  {
    name: 'Test ML',
    method: 'POST',
    endpoint: '/ml/test',
    data: {},
    requiresAuth: false,
    category: 'ML Service'
  },
  {
    name: 'Predict Recurring (ML)',
    method: 'POST',
    endpoint: '/ml/predict/recurring',
    data: {},
    requiresAuth: true,
    category: 'ML Service'
  },
  {
    name: 'Get High Confidence Predictions',
    method: 'GET',
    endpoint: '/ml/predictions/high-confidence',
    requiresAuth: true,
    category: 'ML Service'
  },

  // ===== GREENROUND ENDPOINTS =====
  {
    name: 'Create Donation',
    method: 'POST',
    endpoint: '/greenround/donations',
    data: { amount: 100, province: 'test', cause: 'test' },
    requiresAuth: true,
    category: 'GreenRound'
  },
  {
    name: 'Get User Donations',
    method: 'GET',
    endpoint: '/greenround/donations',
    requiresAuth: true,
    category: 'GreenRound'
  },
  {
    name: 'Get Province Leaderboard',
    method: 'GET',
    endpoint: '/greenround/leaderboard',
    requiresAuth: false,
    category: 'GreenRound'
  },
  {
    name: 'Get User Contribution Stats',
    method: 'GET',
    endpoint: '/greenround/stats',
    requiresAuth: true,
    category: 'GreenRound'
  },
  {
    name: 'Get GreenRound Analytics',
    method: 'GET',
    endpoint: '/greenround/analytics',
    requiresAuth: false,
    category: 'GreenRound'
  },
  {
    name: 'Get GreenRound Settings',
    method: 'GET',
    endpoint: '/greenround/settings',
    requiresAuth: true,
    category: 'GreenRound'
  },
  {
    name: 'Toggle GreenRound',
    method: 'POST',
    endpoint: '/greenround/settings/toggle',
    data: { enabled: true },
    requiresAuth: true,
    category: 'GreenRound'
  },

  // ===== AUTH ENDPOINTS =====
  {
    name: 'Register User',
    method: 'POST',
    endpoint: '/auth/register',
    data: { name: 'Test', email: 'test@test.com', password: 'test123' },
    requiresAuth: false,
    category: 'Authentication'
  },
  {
    name: 'Login User',
    method: 'POST',
    endpoint: '/auth/login',
    data: { email: 'test@test.com', password: 'test123' },
    requiresAuth: false,
    category: 'Authentication'
  },

  // ===== HEALTH CHECKS =====
  {
    name: 'API Health Check',
    method: 'GET',
    endpoint: '/health',
    requiresAuth: false,
    category: 'System'
  }
];

/**
 * Summary of all connected endpoints organized by category
 */
export const connectionSummary = {
  totalEndpoints: connectionTests.length,
  categories: [
    ...new Set(connectionTests.map(t => t.category))
  ],
  byCategory: connectionTests.reduce((acc, test) => {
    if (!acc[test.category]) acc[test.category] = [];
    acc[test.category].push(test);
    return acc;
  }, {}),
  testSuites: connectionTests
};

export default connectionTests;
