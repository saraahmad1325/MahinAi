import { useEffect, useState } from 'react';
import { api } from '../api/client';

export const AdminPage = () => {
  const [stats, setStats] = useState<{ users: number; chats: number }>({ users: 0, chats: 0 });

  useEffect(() => {
    api.get('/api/admin/dashboard').then((res) => setStats(res.data.stats));
  }, []);

  return (
    <section className="card">
      <h2>Admin dashboard</h2>
      <div className="stats">
        <p>Total users: {stats.users}</p>
        <p>Total chats: {stats.chats}</p>
      </div>
    </section>
  );
};
