import apiClient from './client';

export const fetchJobs = async (params) => {
  const response = await apiClient.get('/fetch-jobs', { params });
  return response.data;
};

// REMOVE AFTER BACKEND INTEGRATION: local mock fallback for UI resilience in dev.
export const fallbackJobs = [
  {
    id: 'j1',
    title: 'Frontend Intern',
    company: 'Nova Labs',
    location: 'Remote',
    remote: true,
    fresher: true,
    internship: true,
    isNew: true,
    applyUrl: 'https://example.com/apply/j1',
    postedAt: 'Today',
  },
  {
    id: 'j2',
    title: 'Graduate React Developer',
    company: 'Kairo Systems',
    location: 'Bengaluru',
    remote: false,
    fresher: true,
    internship: false,
    isNew: true,
    applyUrl: 'https://example.com/apply/j2',
    postedAt: '1d ago',
  },
  {
    id: 'j3',
    title: 'Product Design Intern',
    company: 'OrbitPay',
    location: 'Mumbai',
    remote: true,
    fresher: false,
    internship: true,
    isNew: false,
    applyUrl: 'https://example.com/apply/j3',
    postedAt: '2d ago',
  },
];
