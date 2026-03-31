import { cn } from '../../utils/helpers';

const GlassCard = ({ children, className = '' }) => (
  <article className={cn('glass rounded-2xl p-4 shadow-card', className)}>{children}</article>
);

export default GlassCard;
