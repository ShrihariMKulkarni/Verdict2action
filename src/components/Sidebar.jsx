import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Upload, FileText, LayoutDashboard, FileBarChart, Settings, LogOut, Scale, ChevronRight } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Upload Judgment', path: '/upload', icon: Upload },
    { name: 'Pending Review', path: '/pending', icon: FileText, badge: 3 },
    { name: 'All Cases', path: '/cases', icon: LayoutDashboard },
    { name: 'Reports', path: '/reports', icon: FileBarChart },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-[240px] bg-navy flex flex-col h-screen shrink-0 sticky top-0 z-30">
      {/* Logo */}
      <Link to="/dashboard" className="p-5 pb-4 border-b border-white/8 block group">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[6px] bg-saffron/90 flex items-center justify-center">
            <Scale className="w-4.5 h-4.5 text-white" strokeWidth={2} />
          </div>
          <div>
            <h1 className="font-serif text-[17px] text-white leading-tight tracking-tight group-hover:text-white/90 transition-colors">Verdict2Action</h1>
            <p className="text-[10px] text-[#7EA8CB] tracking-widest uppercase mt-px">CCMS Integration</p>
          </div>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-0.5">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.path === '/dashboard' && location.pathname === '/');
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`group flex items-center h-10 px-3 text-[13.5px] font-sans rounded-[6px] transition-all duration-150 relative ${
                isActive 
                  ? 'bg-white/12 text-white font-medium' 
                  : 'text-white/65 hover:bg-white/6 hover:text-white/90'
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-[25%] bottom-[25%] w-[3px] rounded-r-full bg-saffron" />
              )}
              <item.icon className="w-[17px] h-[17px] mr-3 shrink-0" strokeWidth={1.6} />
              <span className="flex-1">{item.name}</span>
              {item.badge && (
                <span className="bg-saffron text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {item.badge}
                </span>
              )}
              {isActive && (
                <ChevronRight className="w-3.5 h-3.5 text-white/40 ml-1" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 pt-3 border-t border-white/8">
        <button 
          onClick={() => navigate('/profile')} 
          className="flex items-center gap-3 w-full px-2 py-2 rounded-[6px] hover:bg-white/6 transition-colors cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4A7AA5] to-[#2D5F8A] text-white flex items-center justify-center font-medium text-[12px] border border-white/15">
            RK
          </div>
          <div className="flex-1 text-left">
            <div className="text-[13px] font-medium text-white group-hover:text-white/90 transition-colors">Rajesh Kumar</div>
            <div className="text-[10px] text-[#7EA8CB] leading-tight">Urban Development Dept</div>
          </div>
        </button>
        <button 
          className="flex items-center text-[12px] text-white/50 hover:text-white/80 transition-colors mt-2 pl-2 gap-2"
          onClick={() => alert('Logged out (demo)')}
        >
          <LogOut className="w-[14px] h-[14px]" strokeWidth={1.5} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
