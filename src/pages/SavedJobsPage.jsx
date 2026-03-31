import JobGrid from '../components/job/JobGrid';
import { useSavedJobs } from '../hooks/useSavedJobs';

const SavedJobsPage = () => {
  const { savedJobs, removeJob } = useSavedJobs();

  return (
    <section className="section-wrapper">
      <h1 className="mb-6 font-heading text-4xl">Saved jobs</h1>
      {savedJobs.length ? (
        <JobGrid jobs={savedJobs} removable onRemove={removeJob} />
      ) : (
        <p className="text-zinc-400">No saved jobs yet. Save roles from Jobs page.</p>
      )}
    </section>
  );
};

export default SavedJobsPage;
