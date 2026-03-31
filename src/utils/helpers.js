export const cn = (...classes) => classes.filter(Boolean).join(' ');

export const formatBadge = (condition, text) => (condition ? text : null);
