import { Bell, ChevronRight } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function TopBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showNotifs, setShowNotifs] = useState(false);
  
  const getBreadcrumb = () => {
    const path = location.pathname;
    if (path.startsWith('/upload')) return { label: 'Upload Judgment', parent: null };
    if (path.startsWith('/review')) return { label: 'AI Extraction Review', parent: { label: 'Cases', path: '/cases' } };
    if (path.startsWith('/verify')) return { label: 'Human Verification', parent: { label: 'Cases', path: '/cases' } };
    if (path.startsWith('/dashboard')) return { label: 'Action Dashboard', parent: null };
    if (path.startsWith('/cases')) return { label: 'All Cases', parent: null };
    if (path.startsWith('/pending')) return { label: 'Pending Review', parent: null };
    if (path.startsWith('/reports')) return { label: 'Reports', parent: null };
    if (path.startsWith('/settings') || path.startsWith('/profile')) return { label: 'Settings & Profile', parent: null };
    return { label: 'Home', parent: null };
  };

  const crumb = getBreadcrumb();

  return (
    <header className="h-[56px] bg-white border-b border-warm-border flex items-center justify-between px-6 shrink-0 sticky top-0 z-20">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-[13px]">
        <Link to="/dashboard" className="text-muted hover:text-navy transition-colors">Home</Link>
        {crumb.parent && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-muted/50 mx-1.5" />
            <Link to={crumb.parent.path} className="text-muted hover:text-navy transition-colors">{crumb.parent.label}</Link>
          </>
        )}
        <ChevronRight className="w-3.5 h-3.5 text-muted/50 mx-1.5" />
        <span className="text-nearBlack font-medium">{crumb.label}</span>
      </nav>
      
      <div className="flex items-center gap-3">
        {/* Trust badge on dashboard */}
        {location.pathname.startsWith('/dashboard') && (
          <div className="flex items-center gap-1.5 mr-3 bg-verified-bg/60 px-3 py-1.5 rounded-full">
            <div className="w-2 h-2 rounded-full bg-verified"></div>
            <span className="text-[11px] font-medium text-verified tracking-wide">Showing verified records only</span>
          </div>
        )}

        {/* Auto-save indicator for review/verify screens */}
        {(location.pathname.startsWith('/review') || location.pathname.startsWith('/verify')) && (
          <span className="text-[11px] text-muted mr-2">Last saved 12s ago</span>
        )}

        {/* Notifications */}
        <div className="relative">
          <button 
            className="relative p-2 text-muted hover:text-nearBlack hover:bg-paper rounded-[6px] transition-all"
            onClick={() => setShowNotifs(!showNotifs)}
          >
            <Bell className="w-[18px] h-[18px]" strokeWidth={1.5} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-saffron rounded-full border border-white"></span>
          </button>

          {showNotifs && (
            <div className="absolute right-0 top-full mt-2 w-[320px] bg-white border border-warm-border rounded-[8px] shadow-lg overflow-hidden animate-slideDown z-50">
              <div className="px-4 py-3 border-b border-warm-border bg-paper">
                <span className="text-[13px] font-medium text-nearBlack">Notifications</span>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {[
                  { title: 'Case WP-882-2023 verified', time: '2 hours ago', type: 'success' },
                  { title: 'Deadline approaching: CA-102-2023', time: '5 hours ago', type: 'warning' },
                  { title: 'New judgment uploaded', time: '1 day ago', type: 'info' },
                ].map((n, i) => (
                  <div key={i} className="px-4 py-3 border-b border-warm-border/50 hover:bg-paper transition-colors cursor-pointer">
                    <div className="flex items-start gap-2.5">
                      <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                        n.type === 'success' ? 'bg-verified' : n.type === 'warning' ? 'bg-warning' : 'bg-info'
                      }`} />
                      <div>
                        <div className="text-[13px] text-nearBlack">{n.title}</div>
                        <div className="text-[11px] text-muted mt-0.5">{n.time}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2.5 bg-paper border-t border-warm-border text-center">
                <button className="text-[12px] text-navy font-medium hover:underline">View all notifications</button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <button 
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2.5 pl-3 border-l border-warm-border hover:bg-paper rounded-r-[6px] pr-2 py-1.5 transition-colors cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4A7AA5] to-[#2D5F8A] text-white flex items-center justify-center font-medium text-[11px] border border-navy/20">
            RK
          </div>
          <div className="text-left hidden lg:block">
            <div className="text-[13px] font-medium text-nearBlack leading-tight">Rajesh Kumar</div>
            <div className="text-[10px] text-muted leading-tight">Urban Development</div>
          </div>
        </button>
      </div>

      {/* Click-away overlay for notifications */}
      {showNotifs && <div className="fixed inset-0 z-40" onClick={() => setShowNotifs(false)} />}
    </header>
  );
}
