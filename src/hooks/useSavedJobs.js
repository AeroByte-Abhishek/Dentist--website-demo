import { useMemo, useState } from 'react';

const STORAGE_KEY = 'j_saved_jobs';

export const useSavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const persist = (next) => {
    setSavedJobs(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const saveJob = (job) => {
    if (savedJobs.some((item) => item.id === job.id)) return;
    persist([job, ...savedJobs]);
  };

  const removeJob = (id) => {
    persist(savedJobs.filter((job) => job.id !== id));
  };

  const isSaved = useMemo(
    () => (id) => savedJobs.some((job) => job.id === id),
    [savedJobs],
  );

  return { savedJobs, saveJob, removeJob, isSaved };
};
