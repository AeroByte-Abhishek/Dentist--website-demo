const StaticPage = ({ title, body }) => (
  <section className="section-wrapper max-w-3xl">
    <div className="glass rounded-2xl p-6">
      <h1 className="mb-4 font-heading text-4xl">{title}</h1>
      <p className="leading-relaxed text-zinc-300">{body}</p>
    </div>
  </section>
);

export default StaticPage;
