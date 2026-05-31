import { useState } from 'react';
import type { FormEvent } from 'react';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

export const ProfilePage = () => {
  const { user } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName ?? '');
  const [bio, setBio] = useState(user?.bio ?? '');
  const [theme, setTheme] = useState<'light' | 'dark'>(user?.settings?.theme ?? 'light');

  const updateProfile = async (e: FormEvent) => {
    e.preventDefault();
    await api.put('/api/users/me', { fullName, bio });
    await api.put('/api/users/settings', { theme });
    alert('Profile updated');
  };

  return (
    <section className="card">
      <h2>Profile & Settings</h2>
      <form onSubmit={updateProfile}>
        <label>
          Full name
          <input value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </label>
        <label>
          Bio
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
        </label>
        <label>
          Theme
          <select value={theme} onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
        <button type="submit">Save</button>
      </form>
    </section>
  );
};
