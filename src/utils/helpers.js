export const cn = (...classes) => classes.filter(Boolean).join(' ');

export const formatSalaryRange = (min, max) => {
  if (!min && !max) return 'Salary not disclosed';

  const format = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);

  if (min && max) return `${format(min)} — ${format(max)}`;
  return min ? `From ${format(min)}` : `Up to ${format(max)}`;
};
