import JobCard from './JobCard';

const JobGrid = ({ jobs, onSave, isSaved, removable = false, onRemove }) => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {jobs.map((job) => (
      <JobCard
        key={job.id}
        job={job}
        onSave={onSave}
        saved={isSaved?.(job.id)}
        removable={removable}
        onRemove={onRemove}
      />
    ))}
  </div>
);

export default JobGrid;
