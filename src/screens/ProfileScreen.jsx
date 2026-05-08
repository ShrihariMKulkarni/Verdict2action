import { User, Mail, Building2, Shield, Clock, Key } from 'lucide-react';

export default function ProfileScreen() {
  return (
    <div className="p-8 max-w-[720px] mx-auto w-full animate-fadeUp">
      <h1 className="text-[28px] font-serif text-navy mb-1 tracking-tight">Settings & Profile</h1>
      <p className="text-[14px] text-muted mb-8">Manage your account information and preferences.</p>

      {/* Profile Card */}
      <div className="card mb-6">
        <div className="flex items-center gap-5 mb-6 pb-6 border-b border-warm-border">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#4A7AA5] to-[#2D5F8A] text-white flex items-center justify-center font-medium text-[22px] border-2 border-navy/15 shrink-0">
            RK
          </div>
          <div>
            <h2 className="text-[20px] font-serif text-navy">Rajesh Kumar</h2>
            <p className="text-[13px] text-muted mt-0.5">Legal Officer · Urban Development Department</p>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="badge-approved text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-verified" /> Active
              </span>
              <span className="badge text-[10px] bg-navy-light text-navy">legal_officer</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-5">
          {[
            { icon: User, label: 'Full Name', value: 'Rajesh Kumar' },
            { icon: Mail, label: 'Email', value: 'rajesh.kumar@karnataka.gov.in' },
            { icon: Building2, label: 'Department', value: 'Urban Development Dept' },
            { icon: Shield, label: 'Role', value: 'Legal Officer' },
            { icon: Clock, label: 'Last Login', value: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) },
            { icon: Key, label: 'Session', value: 'Active since 2 hours ago' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-[6px] bg-paper flex items-center justify-center shrink-0 mt-0.5">
                <Icon className="w-4 h-4 text-muted" strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-[11px] text-muted uppercase tracking-wider font-medium">{label}</div>
                <div className="text-[14px] text-nearBlack mt-0.5">{value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Access Permissions */}
      <div className="card mb-6">
        <h3 className="text-[16px] font-serif text-navy mb-4">Access Permissions</h3>
        <div className="space-y-2.5">
          {[
            { screen: 'Upload Judgment (S1)', access: true },
            { screen: 'AI Extraction Review (S2)', access: true },
            { screen: 'Human Verification (S3)', access: true },
            { screen: 'Action Dashboard (S4)', access: false },
            { screen: 'User Management', access: false },
          ].map(({ screen, access }) => (
            <div key={screen} className="flex items-center justify-between py-2 px-3 rounded-[4px] hover:bg-paper transition-colors">
              <span className="text-[13px] text-nearBlack">{screen}</span>
              {access ? (
                <span className="text-[11px] font-medium text-verified bg-verified-bg px-2.5 py-1 rounded-full">Granted</span>
              ) : (
                <span className="text-[11px] font-medium text-muted bg-warm-panel px-2.5 py-1 rounded-full">Not Assigned</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Session Info */}
      <div className="card bg-paper border-warm-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[14px] font-medium text-nearBlack">Session & Security</h3>
            <p className="text-[12px] text-muted mt-1">Your session will auto-expire after 30 minutes of inactivity.</p>
          </div>
          <button className="btn-destructive h-9 text-[13px]" onClick={() => alert('Logged out (demo)')}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
