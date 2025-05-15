import { Outlet, useLocation, Link } from 'react-router-dom';
import { Home, Calendar, List, User } from 'lucide-react';

export default function ClientLayout() {
  const location = useLocation();
  const current = location.pathname; // Получаем текущий путь

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Outlet />
      </div>
      <nav className="flex justify-around border-t bg-white py-2">
        <Link
          to="/client/home"
          className={current.includes('home') ? 'text-blue-600' : ''}
        >
          <Home size={24} />
        </Link>

        <Link
          to="/client/booking"
          className={current.includes('booking') ? 'text-blue-600' : ''}
        >
          <Calendar size={24} />
        </Link>

        <Link
          to="/client/calendar"
          className={current.includes('calendar') ? 'text-blue-600' : ''}
        >
          <List size={24} />
        </Link>

        <Link
          to="/client/services"
          className={current.includes('services') ? 'text-blue-600' : ''}
        >
          <User size={24} />
        </Link>
      </nav>
    </div>
  );
}
