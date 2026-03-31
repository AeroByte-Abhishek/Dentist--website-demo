import { NavLink } from 'react-router-dom';
import { NAV_LINKS } from '../../utils/constants';

const BottomNav = () => (
  <nav className="glass fixed bottom-3 left-1/2 z-50 flex w-[94%] -translate-x-1/2 items-center justify-between rounded-2xl px-3 py-2 md:hidden">
    {NAV_LINKS.map((item) => (
      <NavLink
        key={item.to}
        to={item.to}
        className={({ isActive }) =>
          `rounded-xl px-3 py-2 text-xs ${isActive ? 'bg-gold/20 text-gold' : 'text-zinc-300'}`
        }
      >
        {item.label}
      </NavLink>
    ))}
  </nav>
);

export default BottomNav;
