import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Layout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="shell">
      <nav>
        <h1>Mahin AI</h1>
        <div className="nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/chat">Chat</Link>
          <Link to="/profile">Profile</Link>
          {user?.role === 'admin' && <Link to="/admin">Admin</Link>}
          <button onClick={logout}>Logout</button>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
