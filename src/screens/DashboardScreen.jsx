import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Search, Filter, Download, Printer, X, Eye, ArrowUpRight, AlertTriangle, TrendingUp, Clock, CheckCircle2 } from 'lucide-react';

export default function DashboardScreen() {
  const [expandedDepts, setExpandedDepts] = useState({ 'Urban Development': true, 'Finance': true });
  const [search, setSearch] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);

  const metrics = [
    { label: 'Total Pending', value: '142', sub: 'across all depts', icon: Clock, color: 'text-navy', iconBg: 'bg-navy-light' },
    { label: 'Overdue', value: '18', sub: 'need immediate action', icon: AlertTriangle, color: 'text-danger', iconBg: 'bg-danger-bg' },
    { label: 'Due This Week', value: '34', sub: 'urgent deadlines', icon: TrendingUp, color: 'text-warning', iconBg: 'bg-warning-bg' },
    { label: 'Verified (Month)', value: '456', sub: 'successfully processed', icon: CheckCircle2, color: 'text-verified', iconBg: 'bg-verified-bg' },
  ];

  const data = {
    'Urban Development': [
      { id: 'WP-1044-2023', date: 'Oct 12, 2023', action: 'Consider representation and pass orders', deadline: '2023-11-09', priority: 'HIGH', status: 'OVERDUE', verifier: 'Vikram Singh' },
      { id: 'CA-882-2023', date: 'Sep 20, 2023', action: 'Submit compliance report to court', deadline: '2023-10-30', priority: 'MEDIUM', status: 'URGENT', verifier: 'Anita Desai' },
      { id: 'WP-102-2023', date: 'Oct 01, 2023', action: 'File affidavit regarding land acquisition', deadline: '2023-11-15', priority: 'LOW', status: 'ON TRACK', verifier: 'Vikram Singh' },
    ],
    'Finance': [
      { id: 'WA-554-2022', date: 'Aug 15, 2023', action: 'Pay arrears with 6% interest', deadline: '2023-11-01', priority: 'HIGH', status: 'URGENT', verifier: 'Suresh Patil' },
      { id: 'WP-998-2023', date: 'Oct 05, 2023', action: 'Release pending funds to municipality', deadline: '2023-12-05', priority: 'MEDIUM', status: 'ON TRACK', verifier: 'Rajesh Kumar' },
    ]
  };

  const getPriorityBadge = (p) => {
    if (p === 'HIGH') return <span className="badge text-[10px] bg-danger-bg text-danger font-bold px-2 py-0.5">{p}</span>;
    if (p === 'MEDIUM') return <span className="badge text-[10px] bg-warning-bg text-warning px-2 py-0.5">{p}</span>;
    return <span className="badge text-[10px] bg-warm-panel text-muted px-2 py-0.5">{p}</span>;
  };

  const getStatusBadge = (s) => {
    const base = "badge px-2.5 py-1 rounded-[4px] font-medium text-[10px] flex items-center gap-1.5 w-max";
    if (s === 'OVERDUE') return <span className={`${base} bg-danger-bg text-danger`}><span className="w-1.5 h-1.5 rounded-full bg-danger" /> {s}</span>;
    if (s === 'URGENT') return <span className={`${base} bg-warning-bg text-warning`}><span className="w-1.5 h-1.5 rounded-full bg-warning" /> {s}</span>;
    if (s === 'ON TRACK') return <span className={`${base} bg-info-bg text-info`}><span className="w-1.5 h-1.5 rounded-full bg-info" /> {s}</span>;
    return <span className={`${base} bg-warm-panel text-muted`}>{s}</span>;
  };

  const toggleDept = (dept) => setExpandedDepts(prev => ({ ...prev, [dept]: !prev[dept] }));

  return (
    <div className="p-8 max-w-[1280px] mx-auto w-full animate-fadeUp">
      
      {/* Header Row */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-[28px] font-serif text-navy mb-1 tracking-tight">Action Dashboard</h1>
          <p className="text-[14px] text-muted">
            As of {new Date().toLocaleDateString('en-IN', {day:'numeric', month:'short', year:'numeric'})} · <strong className="text-nearBlack">1,204</strong> verified judgments
          </p>
        </div>
        <div className="flex gap-2">
          <button className="btn-ghost text-navy h-9 px-3 gap-1.5 text-[13px]"><Printer className="w-4 h-4" /> Print</button>
          <button className="btn-secondary h-9 text-[13px] gap-1.5"><Download className="w-3.5 h-3.5" /> Export CSV</button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-8 stagger-children">
        {metrics.map((m, i) => (
          <div key={i} className="card card-hover flex items-start gap-4 !p-5">
            <div className={`w-10 h-10 rounded-[8px] ${m.iconBg} flex items-center justify-center shrink-0`}>
              <m.icon className={`w-5 h-5 ${m.color}`} strokeWidth={1.8} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] text-muted font-medium uppercase tracking-wider mb-1">{m.label}</div>
              <div className={`text-[26px] font-bold leading-none ${m.color} tracking-tight`}>{m.value}</div>
              <div className="text-[11px] text-muted mt-1.5">{m.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Search & Active Filters */}
      <div className="sticky top-0 z-10 bg-paper py-3 mb-6 border-b border-warm-border flex items-center justify-between">
        <div className="relative w-[320px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input 
            type="text" placeholder="Search by case number or department..." 
            className="input-field w-full pl-9 h-9 text-[13px]"
            value={search} onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary h-8 text-[12px] gap-1.5">
            <Filter className="w-3 h-3" /> Filter <ChevronDown className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Tables */}
      <div className="space-y-6 pb-12">
        {Object.entries(data).map(([dept, rows]) => (
          <div key={dept} className="bg-white border border-warm-border rounded-[8px] overflow-hidden">
            <div 
              className="px-5 py-4 bg-warm-panel/60 border-b border-warm-border flex justify-between items-center cursor-pointer hover:bg-warm-panel transition-colors"
              onClick={() => toggleDept(dept)}
            >
              <div className="flex items-center gap-3">
                <h2 className="text-[18px] font-serif text-navy">{dept}</h2>
                <span className="badge bg-white border border-warm-border text-muted text-[10px]">{rows.length} actions</span>
              </div>
              <ChevronDown className={`w-5 h-5 text-muted transition-transform duration-200 ${expandedDepts[dept] ? 'rotate-180' : ''}`} />
            </div>

            {expandedDepts[dept] && (
              <div className="overflow-x-auto animate-slideDown">
                <table className="w-full text-left">
                  <thead className="bg-paper/80 border-b-2 border-warm-border">
                    <tr>
                      <th className="px-5 py-3 text-[11px] font-medium text-muted uppercase tracking-wider w-[130px]">Case No</th>
                      <th className="px-5 py-3 text-[11px] font-medium text-muted uppercase tracking-wider w-[110px]">Order Date</th>
                      <th className="px-5 py-3 text-[11px] font-medium text-muted uppercase tracking-wider">Action Required</th>
                      <th className="px-5 py-3 text-[11px] font-medium text-muted uppercase tracking-wider text-right w-[110px]">Deadline</th>
                      <th className="px-5 py-3 text-[11px] font-medium text-muted uppercase tracking-wider w-[90px]">Priority</th>
                      <th className="px-5 py-3 text-[11px] font-medium text-muted uppercase tracking-wider w-[120px]">Status</th>
                      <th className="px-5 py-3 text-[11px] font-medium text-muted uppercase tracking-wider w-[110px]">Verified By</th>
                      <th className="px-5 py-3 w-14"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <tr 
                        key={row.id} 
                        className={`border-b border-warm-border/60 last:border-0 transition-colors cursor-pointer ${
                          row.status === 'OVERDUE' ? 'bg-[#FFF8F8] hover:bg-[#FFF1F1]' : 'hover:bg-paper/80'
                        }`}
                        onClick={() => setSelectedRow(selectedRow === row.id ? null : row.id)}
                      >
                        <td className="px-5 py-3.5">
                          <Link to={`/verify/${row.id}`} className="text-[13px] font-mono text-navy font-medium hover:text-saffron transition-colors" onClick={e => e.stopPropagation()}>
                            {row.id}
                          </Link>
                        </td>
                        <td className="px-5 py-3.5 text-[13px] text-nearBlack">{row.date}</td>
                        <td className="px-5 py-3.5 text-[13px] text-nearBlack">{row.action}</td>
                        <td className={`px-5 py-3.5 text-[13px] text-right font-medium ${row.status === 'OVERDUE' ? 'text-danger' : row.status === 'URGENT' ? 'text-warning' : 'text-nearBlack'}`}>
                          {row.deadline}
                        </td>
                        <td className="px-5 py-3.5">{getPriorityBadge(row.priority)}</td>
                        <td className="px-5 py-3.5">{getStatusBadge(row.status)}</td>
                        <td className="px-5 py-3.5 text-[12px] text-muted">{row.verifier}</td>
                        <td className="px-5 py-3.5">
                          <Link to={`/verify/${row.id}`} className="text-muted hover:text-navy transition-colors" onClick={e => e.stopPropagation()}>
                            <Eye className="w-4 h-4" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
