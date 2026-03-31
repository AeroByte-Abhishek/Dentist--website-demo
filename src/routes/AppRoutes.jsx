import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import ProtectedRoute from './ProtectedRoute';

const HomePage = lazy(() => import('../pages/HomePage'));
const JobsPage = lazy(() => import('../pages/JobsPage'));
const AuthPage = lazy(() => import('../pages/AuthPage'));
const SavedJobsPage = lazy(() => import('../pages/SavedJobsPage'));
const NotificationsPage = lazy(() => import('../pages/NotificationsPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));
const StaticPage = lazy(() => import('../pages/StaticPage'));

const AppRoutes = () => (
  <Suspense fallback={<div className="section-wrapper py-12 text-zinc-300">Loading premium experience...</div>}>
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/about" element={<StaticPage title="About J" body="J is a student-first premium job portal helping talent launch exceptional careers." />} />
        <Route path="/contact" element={<StaticPage title="Contact" body="Reach us at support@jportal.app for partnerships, support, and hiring queries." />} />
        <Route path="/how-it-works" element={<StaticPage title="How It Works" body="Set preferences, discover curated listings, save jobs, and apply directly with one tap." />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/:jobId" element={<JobsPage />} />
          <Route path="/saved" element={<SavedJobsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Route>
    </Routes>
  </Suspense>
);

export default AppRoutes;
