import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fallbackJobs } from '../api/jobsApi';
import JobGrid from '../components/job/JobGrid';
import { useSavedJobs } from '../hooks/useSavedJobs';

const floating = {
  animate: { y: [0, -10, 0] },
  transition: { repeat: Infinity, duration: 6, ease: 'easeInOut' },
};

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { saveJob, isSaved } = useSavedJobs();

  const onExplore = () => {
    if (!isAuthenticated) return navigate('/auth');
    navigate('/jobs');
  };

  return (
    <section className="section-wrapper space-y-12">
      <div className="glass rounded-3xl p-6 text-center md:p-12">
        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-gold">Premium Student Careers</p>
        <h1 className="font-heading text-4xl md:text-6xl">Build your future with <span className="text-gold">J</span></h1>
        <p className="mx-auto mt-4 max-w-2xl text-zinc-300">A curated, luxury-grade platform for internships, fresher roles, and remote opportunities.</p>

        <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl">
          <div className="grid gap-2 sm:grid-cols-3">
            <input className="rounded-xl bg-black/20 px-4 py-3 sm:col-span-2" placeholder="Search premium roles" />
            <button onClick={onExplore} className="rounded-xl bg-gold px-4 py-3 font-semibold text-noir">Explore More</button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {['Active Listings', 'Partner Companies', 'Students Placed'].map((item, idx) => (
          <motion.div key={item} {...floating} transition={{ ...floating.transition, delay: idx * 0.4 }} className="glass rounded-2xl p-5 text-center">
            <p className="text-sm text-zinc-400">{item}</p>
            <p className="mt-2 font-heading text-3xl text-gold">{['2.4K', '420+', '12K+'][idx]}</p>
          </motion.div>
        ))}
      </div>

      <div>
        <h2 className="mb-4 font-heading text-3xl">Featured opportunities</h2>
        <JobGrid jobs={fallbackJobs.concat(fallbackJobs).slice(0, 6)} onSave={saveJob} isSaved={isSaved} />
      </div>
    </section>
  );
};

export default HomePage;
