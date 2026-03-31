import { useEffect, useState } from 'react';
import { useJobs } from '../context/JobContext';
import JobFilters from '../components/job/JobFilters';
import JobGrid from '../components/job/JobGrid';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import { useSavedJobs } from '../hooks/useSavedJobs';

const JobsPage = () => {
  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    page: 1,
    remote: false,
    fresher: false,
    internship: false,
  });

  const { jobs, loading, error, totalPages, getJobs } = useJobs();
  const { saveJob, isSaved } = useSavedJobs();

  useEffect(() => {
    getJobs(filters);
  }, [filters.page]);

  const updateFilter = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));
  const searchNow = () => getJobs({ ...filters, page: 1 });

  return (
    <section className="section-wrapper">
      <h1 className="mb-6 font-heading text-4xl">Find your next role</h1>
      <JobFilters filters={filters} onChange={updateFilter} onSearch={searchNow} />
      {error && <p className="mb-4 text-sm text-red-300">{error}</p>}
      {loading ? <LoadingSkeleton /> : <JobGrid jobs={jobs} onSave={saveJob} isSaved={isSaved} />}

      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          disabled={filters.page === 1}
          onClick={() => updateFilter('page', filters.page - 1)}
          className="rounded-xl border border-white/10 px-4 py-2 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm text-zinc-300">Page {filters.page} / {totalPages}</span>
        <button
          disabled={filters.page >= totalPages}
          onClick={() => updateFilter('page', filters.page + 1)}
          className="rounded-xl border border-white/10 px-4 py-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default JobsPage;
