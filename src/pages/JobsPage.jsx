import { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useJobs } from '../context/JobContext';
import JobFilters from '../components/job/JobFilters';
import JobGrid from '../components/job/JobGrid';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import { useSavedJobs } from '../hooks/useSavedJobs';
import { formatSalaryRange } from '../utils/helpers';

const JobsPage = () => {
  const [searchParams] = useSearchParams();
  const { jobId } = useParams();

  const [filters, setFilters] = useState({
    keyword: searchParams.get('keyword') || '',
    location: searchParams.get('location') || '',
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

  const selectedJob = useMemo(() => jobs.find((job) => String(job.id) === String(jobId)), [jobs, jobId]);

  return (
    <section className="section-wrapper">
      <h1 className="mb-6 font-heading text-4xl">Find your next role</h1>
      {jobId && selectedJob && (
        <article className="glass mb-6 rounded-2xl border border-gold/30 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.18em] text-gold">Selected Opportunity</p>
              <h2 className="font-heading text-4xl">{selectedJob.title}</h2>
              <p className="mt-2 text-zinc-300">{selectedJob.company} • {selectedJob.location}</p>
            </div>
            <Link to="/jobs" className="rounded-xl border border-white/20 px-4 py-2 text-sm">Back to all jobs</Link>
          </div>
          <p className="mt-5 text-lg leading-relaxed text-zinc-300">{selectedJob.description || 'Detailed description will be available from backend.'}</p>
          <p className="mt-4 font-heading text-3xl text-gold">{formatSalaryRange(selectedJob.salaryMin, selectedJob.salaryMax)}</p>
          <a href={selectedJob.applyUrl} target="_blank" rel="noreferrer" className="mt-5 inline-block rounded-xl bg-gold px-6 py-3 font-semibold text-noir">Apply Now</a>
        </article>
      )}

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
