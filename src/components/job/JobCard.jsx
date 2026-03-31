import { motion } from 'framer-motion';
import GlassCard from '../common/GlassCard';

const badgeClasses = 'rounded-full border border-gold/30 bg-gold/10 px-2 py-1 text-xs text-gold';

const JobCard = ({ job, onSave, saved, removable, onRemove }) => {
  const copyLink = async () => {
    await navigator.clipboard.writeText(job.applyUrl || window.location.href);
  };

  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25 }}>
      <GlassCard className="h-full transition hover:shadow-glow">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h3 className="font-heading text-xl">{job.title}</h3>
            <p className="text-sm text-zinc-300">{job.company} • {job.location}</p>
          </div>
          <span className="text-xs text-zinc-400">{job.postedAt || 'Recent'}</span>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {job.remote && <span className={badgeClasses}>Remote</span>}
          {job.fresher && <span className={badgeClasses}>Fresher</span>}
          {job.internship && <span className={badgeClasses}>Internship</span>}
          {job.isNew && <span className={badgeClasses}>New</span>}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <a href={job.applyUrl} target="_blank" rel="noreferrer" className="rounded-xl bg-gold px-3 py-2 text-center text-sm font-medium text-noir">Apply Now</a>
          {removable ? (
            <button onClick={() => onRemove(job.id)} className="rounded-xl border border-red-400/30 px-3 py-2 text-sm text-red-300">Remove</button>
          ) : (
            <button onClick={() => onSave(job)} className="rounded-xl border border-white/20 px-3 py-2 text-sm">{saved ? 'Saved' : 'Save Job'}</button>
          )}
          <button onClick={copyLink} className="rounded-xl border border-white/20 px-3 py-2 text-sm">Copy Link</button>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`Check this job: ${job.title} at ${job.applyUrl}`)}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-royal/40 px-3 py-2 text-center text-sm text-purple-300"
          >
            Share
          </a>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default JobCard;
