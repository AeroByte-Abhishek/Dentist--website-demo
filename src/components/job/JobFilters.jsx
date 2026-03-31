const JobFilters = ({ filters, onChange, onSearch }) => (
  <div className="glass mb-6 rounded-2xl p-4">
    <div className="grid gap-3 md:grid-cols-4">
      <input
        value={filters.keyword}
        onChange={(e) => onChange('keyword', e.target.value)}
        placeholder="Role or keyword"
        className="rounded-xl border border-white/10 bg-black/20 px-4 py-3"
      />
      <input
        value={filters.location}
        onChange={(e) => onChange('location', e.target.value)}
        placeholder="Location"
        className="rounded-xl border border-white/10 bg-black/20 px-4 py-3"
      />
      <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-4 py-3">
        <input type="checkbox" checked={filters.remote} onChange={(e) => onChange('remote', e.target.checked)} />
        Remote
      </label>
      <button onClick={onSearch} className="rounded-xl bg-gold px-4 py-3 font-medium text-noir transition hover:translate-y-[-2px]">Search Jobs</button>
    </div>
    <div className="mt-3 flex gap-4">
      {['fresher', 'internship'].map((key) => (
        <label key={key} className="flex items-center gap-2 text-sm text-zinc-300">
          <input type="checkbox" checked={filters[key]} onChange={(e) => onChange(key, e.target.checked)} />
          {key}
        </label>
      ))}
    </div>
  </div>
);

export default JobFilters;
