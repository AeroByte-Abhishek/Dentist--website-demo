import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { fallbackJobs, fetchJobs } from '../api/jobsApi';

const JobContext = createContext(null);

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalPages, setTotalPages] = useState(1);

  const getJobs = useCallback(async (params) => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchJobs(params);
      const list = data?.jobs ?? data?.content ?? data ?? [];
      setJobs(Array.isArray(list) ? list : []);
      setTotalPages(data?.totalPages || 1);
    } catch (err) {
      setError('Unable to fetch jobs. Showing preview data.');
      setJobs(fallbackJobs);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({ jobs, loading, error, totalPages, getJobs }),
    [jobs, loading, error, totalPages, getJobs],
  );

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) throw new Error('useJobs must be used inside JobProvider');
  return context;
};
