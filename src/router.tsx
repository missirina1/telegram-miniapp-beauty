import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import MasterLayout from './layouts/MasterLayout';
import ClientLayout from './layouts/ClientLayout';

import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import RoleSelectionPage from './pages/RoleSelectionPage/SelectionPage';

import HomeMaster from './pages/master/MasterHome/HomeMaster';
import MasterProfile from './pages/master/MasterProfile/MasterProfile';
import MasterAppointments from './pages/master/MasterAppointments/MasterAppointments';
import MasterSchedule from './pages/master/MasterSchedule/MasterShedule';
import ProfileSettings from './pages/master/ProfileSettings/ProfileSettings';

import HomeClient from './pages/client/ClientHome/HomeClient';
import ClientServices from './pages/client/ClientServices/ClientServices';
import ClientCaledar from './pages/client/ClientCalendar/ClientCalendar';
import ClientBooking from './pages/client/ClientBooking/ClientBooking';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RoleSelectionPage />,
  },
  {
    path: '/master',
    element: <MasterLayout />,
    children: [
      { path: 'home', element: <HomeMaster /> },
      { path: 'schedule', element: <MasterSchedule /> },
      { path: 'appointments', element: <MasterAppointments /> },
      { path: 'profile', element: <MasterProfile /> },
      { path: 'profile-settings', element: <ProfileSettings /> },
    ],
  },

  {
    path: '/client',
    element: <ClientLayout />,
    children: [
      { path: 'home', element: <HomeClient /> },
      { path: 'services', element: <ClientServices /> },
      { path: 'calendar', element: <ClientCaledar /> },
      { path: 'booking', element: <ClientBooking /> },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />, // или свой компонент "Страница не найдена"
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
