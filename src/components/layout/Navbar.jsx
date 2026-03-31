import { Link, NavLink } from 'react-router-dom';
import { NAV_LINKS } from '../../utils/constants';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const { unreadCount } = useNotifications();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-noir/80 backdrop-blur-xl">
      <div className="section-wrapper flex h-16 items-center justify-between">
        <Link to="/" className="font-heading text-2xl text-gold">J</Link>
        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.slice(0, 5).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm transition ${isActive ? 'text-gold' : 'text-zinc-300 hover:text-white'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <span className="rounded-full bg-gold/20 px-2 py-1 text-xs text-gold">{unreadCount} new</span>
          {isAuthenticated ? (
            <button onClick={logout} className="rounded-xl border border-gold/40 px-4 py-2 text-sm text-gold hover:bg-gold/10">Logout</button>
          ) : (
            <Link to="/auth" className="rounded-xl bg-gold px-4 py-2 text-sm font-medium text-noir">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
