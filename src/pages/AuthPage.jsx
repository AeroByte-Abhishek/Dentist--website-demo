import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    // REMOVE AFTER BACKEND INTEGRATION: replace with real auth APIs.
    login({ name, email });
    navigate('/jobs');
  };

  return (
    <section className="section-wrapper flex justify-center">
      <form onSubmit={onSubmit} className="glass w-full max-w-md rounded-3xl p-6">
        <h1 className="mb-6 font-heading text-3xl">Welcome to J</h1>
        <div className="space-y-4">
          <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3" />
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3" />
        </div>
        <button className="mt-6 w-full rounded-xl bg-gold px-4 py-3 font-semibold text-noir">Login</button>
      </form>
    </section>
  );
};

export default AuthPage;
