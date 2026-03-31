import apiClient from './client';

const normalizeJob = (job) => {
  const company = job.companyName?.displayName || job.company?.display_name || job.company || 'Confidential';
  const location = job.location?.displayName || job.location?.display_name || job.location || 'Location not specified';
  const category = job.category?.label || job.category || 'General';

  return {
    id: job.id,
    title: job.title,
    description: job.description,
    company,
    location,
    category,
    salaryMin: job.salaryMin ?? job.salary_min ?? null,
    salaryMax: job.salaryMax ?? job.salary_max ?? null,
    applyUrl: job.redirectUrl ?? job.redirect_url ?? '#',
    postedAt: job.Created || job.created || 'Recently posted',
    remote: /remote/i.test(location),
    fresher: /fresher|graduate|entry/i.test(category),
    internship: /intern/i.test(category),
    isNew: true,
  };
};

export const fetchJobs = async (params) => {
  const response = await apiClient.get('/fetch-jobs', { params });
  const payload = response.data;
  const rawJobs = payload?.jobs ?? payload?.content ?? payload ?? [];
  const jobs = Array.isArray(rawJobs) ? rawJobs.map(normalizeJob) : [];

  return {
    jobs,
    totalPages: payload?.totalPages || 1,
  };
};

// REMOVE AFTER BACKEND INTEGRATION: local mock fallback for UI resilience in dev.
export const fallbackJobs = [
  {
    id: 'j1',
    title: 'Senior Frontend Architect',
    description: 'Lead the architecture of scalable frontend products for high-growth teams.',
    company: 'Tech Innovations Pvt Ltd',
    location: 'Mumbai, Maharashtra',
    category: 'Premium',
    remote: false,
    fresher: false,
    internship: false,
    isNew: true,
    salaryMin: 1400000,
    salaryMax: 2000000,
    applyUrl: 'https://example.com/apply/j1',
    postedAt: 'Today',
  },
  {
    id: 'j2',
    title: 'Product Manager — AI/ML',
    description: 'Shape the future of AI-powered products and drive strategy and execution.',
    company: 'StartUp Ventures',
    location: 'Bangalore, Karnataka',
    category: 'Remote',
    remote: true,
    fresher: false,
    internship: false,
    isNew: false,
    salaryMin: 1800000,
    salaryMax: 2500000,
    applyUrl: 'https://example.com/apply/j2',
    postedAt: '1d ago',
  },
  {
    id: 'j3',
    title: 'Creative Director',
    description: 'Lead creative vision for premium brands with strategic storytelling.',
    company: 'Digital Agency Co',
    location: 'Delhi, NCR',
    category: 'Featured',
    remote: false,
    fresher: false,
    internship: false,
    isNew: true,
    salaryMin: 1200000,
    salaryMax: 1800000,
    applyUrl: 'https://example.com/apply/j3',
    postedAt: '2d ago',
  },
];
