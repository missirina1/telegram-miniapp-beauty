import { Outlet, useLocation, Link } from 'react-router-dom';
import { Home, Calendar, List, User } from 'lucide-react';

export default function MasterLayout() {
  const location = useLocation();
  const current = location.pathname; // Получаем текущий путь

  const isActive = (path: string) => current.includes(path);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow bg-[#f8f5f2] text-[#4e342e]">
        <div className="w-full max-w-md mx-auto px-4 py-2">
          <Outlet />
        </div>
      </div>
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center bg-[#efebe9] border-t border-[#d7ccc8] w-full max-w-md px-4 py-2 py-2 shadow-inner">
        <Link
          to="/master/home"
          className={
            current.includes('home') ? 'flex flex-col items-center' : ''
          }
        >
          <Home
            size={24}
            className={`${
              isActive('home') ? 'text-[#6d4c41]' : 'text-[#a1887f]'
            } transition-colors`}
          />
        </Link>

        <Link
          to="/master/schedule"
          className={
            current.includes('schedule') ? 'flex flex-col items-center' : ''
          }
        >
          <Calendar
            size={24}
            className={`${
              isActive('schedule') ? 'text-[#6d4c41]' : 'text-[#a1887f]'
            } transition-colors`}
          />
        </Link>

        <Link
          to="/master/appointments"
          className={
            current.includes('appointments') ? 'flex flex-col items-center' : ''
          }
        >
          <List
            size={24}
            className={`${
              isActive('appointments') ? 'text-[#6d4c41]' : 'text-[#a1887f]'
            } transition-colors`}
          />
        </Link>

        <Link
          to="/master/profile"
          className={
            current.includes('profile') ? 'flex flex-col items-center' : ''
          }
        >
          <User
            size={24}
            className={`${
              isActive('profile') ? 'text-[#6d4c41]' : 'text-[#a1887f]'
            } transition-colors`}
          />
        </Link>
      </nav>
    </div>
  );
}
