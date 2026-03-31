import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import BottomNav from '../common/BottomNav';

const AppLayout = () => (
  <div className="min-h-screen pb-24 md:pb-6">
    <Navbar />
    <main className="py-8">
      <Outlet />
    </main>
    <BottomNav />
  </div>
);

export default AppLayout;
