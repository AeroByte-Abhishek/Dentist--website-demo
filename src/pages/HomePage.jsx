import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fallbackJobs } from '../api/jobsApi';
import { useJobs } from '../context/JobContext';
import { useAuth } from '../context/AuthContext';
import { formatSalaryRange } from '../utils/helpers';

const pillClass = 'rounded-full border border-gold/40 bg-gold/15 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-gold';

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { jobs, getJobs } = useJobs();

  const [search, setSearch] = useState({ keyword: '', location: '' });

  useEffect(() => {
    getJobs({ page: 1 });
  }, []);

  const featuredJobs = (jobs.length ? jobs : fallbackJobs).slice(0, 6);
  const heroCards = featuredJobs.slice(0, 2);

  const goToJob = (jobId) => {
    if (!isAuthenticated) return navigate('/auth');
    navigate(`/jobs/${jobId}`);
  };

  const onSearch = () => {
    const params = new URLSearchParams();
    if (search.keyword) params.set('keyword', search.keyword);
    if (search.location) params.set('location', search.location);
    navigate(`/jobs?${params.toString()}`);
  };

  return (
    <section>
      <div className="section-wrapper py-8 md:py-12">
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.28em] text-gold">Exclusive career network</p>
            <h1 className="font-heading text-5xl leading-[0.95] sm:text-6xl lg:text-8xl">
              Where <span className="text-gold">Exceptional</span> Talent Meets Elite Opportunities
            </h1>
            <p className="mt-6 max-w-xl text-lg text-zinc-300">
              A curated platform for ambitious students seeking premium internships and fresher roles.
            </p>
          </div>

          <div className="relative min-h-[320px]">
            {heroCards.map((job, idx) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: [0, -8, 0] }}
                transition={{ duration: 0.9, delay: idx * 0.2, repeat: Infinity, repeatType: 'mirror', repeatDelay: 2 }}
                className={`glass absolute w-full max-w-[320px] rounded-2xl border border-gold/20 p-6 ${idx === 0 ? 'right-8 top-0' : 'bottom-0 right-0'}`}
              >
                <p className={pillClass}>{idx === 0 ? 'Premium' : 'Featured'}</p>
                <h3 className="mt-4 font-heading text-3xl">{job.title}</h3>
                <p className="mt-2 text-zinc-300">{job.company}</p>
                <p className="mt-4 text-xl font-semibold text-gold">{formatSalaryRange(job.salaryMin, job.salaryMax)}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-gold/30 bg-charcoal/60 p-2">
          <div className="grid gap-2 md:grid-cols-[1fr_1fr_220px]">
            <input
              placeholder="Role or expertise"
              className="rounded-xl bg-zinc-800/80 px-5 py-4"
              value={search.keyword}
              onChange={(e) => setSearch((prev) => ({ ...prev, keyword: e.target.value }))}
            />
            <input
              placeholder="Location"
              className="rounded-xl bg-zinc-800/80 px-5 py-4"
              value={search.location}
              onChange={(e) => setSearch((prev) => ({ ...prev, location: e.target.value }))}
            />
            <button onClick={onSearch} className="rounded-xl bg-gold px-4 py-4 text-sm font-semibold tracking-[0.15em] text-noir transition hover:-translate-y-1">
              SEARCH
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-6 border-b border-gold/30 pb-10 sm:grid-cols-3">
          {[
            ['10K+', 'Curated Roles'],
            ['500+', 'Elite Partners'],
            ['24h', 'Instant Alerts'],
          ].map(([value, label]) => (
            <div key={label}>
              <p className="font-heading text-5xl text-gold">{value}</p>
              <p className="mt-2 uppercase tracking-[0.2em] text-zinc-400">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-charcoal/75 py-16">
        <div className="section-wrapper">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-5xl md:text-7xl">Featured Opportunities</h2>
            <p className="mt-4 text-lg text-zinc-300">Handpicked roles from innovative companies. Updated in real-time.</p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {featuredJobs.slice(0, 3).map((job) => (
              <article key={job.id} className="rounded-2xl border border-gold/20 bg-gradient-to-br from-zinc-900 to-charcoal p-6 shadow-card transition hover:-translate-y-1 hover:shadow-glow">
                <div className="mb-5 flex items-center gap-2">
                  <span className="rounded-full bg-emerald-400 px-4 py-1 text-xs font-semibold uppercase text-emerald-950">New</span>
                  <span className="rounded-full bg-gold px-4 py-1 text-xs font-semibold uppercase text-noir">{job.category || 'Premium'}</span>
                </div>
                <h3 className="font-heading text-4xl leading-tight">{job.title}</h3>
                <p className="mt-4 text-xl text-zinc-200">⚡ {job.company}</p>
                <p className="mt-2 text-lg text-zinc-400">📍 {job.location}</p>
                <p className="mt-6 font-heading text-4xl text-gold">{formatSalaryRange(job.salaryMin, job.salaryMax)}</p>
                <p className="mt-5 min-h-20 text-lg leading-relaxed text-zinc-300">{job.description}</p>
                <button onClick={() => goToJob(job.id)} className="mt-8 w-full rounded-xl bg-gold py-4 text-lg font-semibold tracking-[0.08em] text-noir transition hover:-translate-y-1">
                  VIEW DETAILS
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="section-wrapper border-b border-gold/30 py-16 text-center">
        <h2 className="font-heading text-6xl md:text-7xl">Ready to Elevate Your Career?</h2>
        <p className="mx-auto mt-6 max-w-3xl text-2xl text-zinc-300">
          Join thousands of ambitious professionals and get instant access to exclusive opportunities.
        </p>
        <Link to="/auth" className="mt-8 inline-block rounded-xl border border-white bg-gold px-14 py-5 text-xl font-semibold tracking-[0.1em] text-noir shadow-glow">
          REGISTER NOW
        </Link>
      </div>

      <footer className="bg-charcoal/80 py-14">
        <div className="section-wrapper grid gap-10 md:grid-cols-4">
          <div>
            <p className="font-heading text-6xl text-gold">J</p>
            <p className="mt-4 text-zinc-300">Connecting exceptional student talent with elite opportunities.</p>
          </div>
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.18em] text-gold">Platform</p>
            <ul className="space-y-3 text-zinc-300"><li>Browse Jobs</li><li>For Companies</li><li>Membership</li></ul>
          </div>
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.18em] text-gold">Company</p>
            <ul className="space-y-3 text-zinc-300"><li>About Us</li><li>Our Story</li><li>Careers</li></ul>
          </div>
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.18em] text-gold">Support</p>
            <ul className="space-y-3 text-zinc-300"><li>Help Center</li><li>Guidelines</li><li>Privacy</li></ul>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default HomePage;
