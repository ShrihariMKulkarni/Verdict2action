import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function Layout() {
  const location = useLocation();
  // Upload page gets no sidebar for a cleaner focused experience
  const noSidebar = location.pathname.startsWith('/upload');

  return (
    <div className="flex h-screen w-full bg-paper overflow-hidden">
      {!noSidebar && <Sidebar />}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <TopBar />
        <main className="flex-1 overflow-auto w-full relative">
          <div className="animate-fadeIn">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
