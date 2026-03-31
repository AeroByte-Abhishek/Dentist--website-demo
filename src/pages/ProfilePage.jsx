import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();
  const [prefs, setPrefs] = useState({ email: true, push: true, product: false });

  return (
    <section className="section-wrapper max-w-3xl space-y-6">
      <h1 className="font-heading text-4xl">Profile</h1>
      <div className="glass rounded-2xl p-5">
        <p className="text-zinc-400">Name</p>
        <p className="mb-3 text-lg">{user?.name || 'Guest'}</p>
        <p className="text-zinc-400">Email</p>
        <p>{user?.email || 'Not available'}</p>
      </div>

      <div className="glass rounded-2xl p-5">
        <h2 className="mb-3 font-heading text-2xl">Notification Preferences</h2>
        {Object.keys(prefs).map((key) => (
          <label key={key} className="mb-2 flex items-center justify-between">
            <span className="capitalize">{key} updates</span>
            <input type="checkbox" checked={prefs[key]} onChange={() => setPrefs((p) => ({ ...p, [key]: !p[key] }))} />
          </label>
        ))}
      </div>
    </section>
  );
};

export default ProfilePage;
