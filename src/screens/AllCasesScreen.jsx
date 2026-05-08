import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ChevronDown, Eye, ArrowUpDown, X } from 'lucide-react';

const allCases = [
  { id: 'WP-1044-2023', court: 'HC Karnataka', dept: 'Urban Development', date: 'Oct 12, 2023', status: 'verified', priority: 'HIGH', verifier: 'Vikram Singh' },
  { id: 'CA-882-2023', court: 'HC Karnataka', dept: 'Revenue Dept', date: 'Sep 20, 2023', status: 'verified', priority: 'MEDIUM', verifier: 'Anita Desai' },
  { id: 'WP-102-2023', court: 'HC Karnataka', dept: 'Urban Development', date: 'Oct 01, 2023', status: 'pending', priority: 'LOW', verifier: '-' },
  { id: 'WA-554-2022', court: 'Supreme Court', dept: 'Finance Dept', date: 'Aug 15, 2023', status: 'verified', priority: 'HIGH', verifier: 'Suresh Patil' },
  { id: 'WP-998-2023', court: 'HC Karnataka', dept: 'Law Dept', date: 'Oct 05, 2023', status: 'extracted', priority: 'MEDIUM', verifier: '-' },
  { id: 'CA-102-2023', court: 'HC Karnataka', dept: 'Urban Development', date: 'Oct 11, 2023', status: 'pending', priority: 'MEDIUM', verifier: '-' },
  { id: 'WP-915-2023', court: 'HC Bombay', dept: 'Home Dept', date: 'Oct 10, 2023', status: 'verified', priority: 'LOW', verifier: 'Rajesh Kumar' },
  { id: 'WP-441-2023', court: 'HC Karnataka', dept: 'Law Dept', date: 'Oct 08, 2023', status: 'pending', priority: 'HIGH', verifier: '-' },
  { id: 'WP-330-2023', court: 'Supreme Court', dept: 'Finance Dept', date: 'Sep 28, 2023', status: 'verified', priority: 'MEDIUM', verifier: 'Vikram Singh' },
  { id: 'CA-200-2023', court: 'HC Karnataka', dept: 'Revenue Dept', date: 'Sep 15, 2023', status: 'extracted', priority: 'LOW', verifier: '-' },
];

export default function AllCasesScreen({ filterStatus }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState(filterStatus === 'pending' ? 'pending' : 'all');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const filtered = allCases.filter(c => {
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    if (search && !c.id.toLowerCase().includes(search.toLowerCase()) && !c.dept.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const getStatusBadge = (s) => {
    if (s === 'verified') return <span className="badge-approved text-[10px]"><span className="w-1.5 h-1.5 rounded-full bg-verified" /> Verified</span>;
    if (s === 'pending') return <span className="badge-pending text-[10px]"><span className="w-1.5 h-1.5 rounded-full bg-warning" /> Pending Review</span>;
    if (s === 'extracted') return <span className="badge-ontrack text-[10px]"><span className="w-1.5 h-1.5 rounded-full bg-info" /> Extracted</span>;
    return <span className="badge text-[10px] bg-warm-panel text-muted">{s}</span>;
  };

  const getPriorityBadge = (p) => {
    if (p === 'HIGH') return <span className="badge text-[10px] bg-danger-bg text-danger font-bold">{p}</span>;
    if (p === 'MEDIUM') return <span className="badge text-[10px] bg-warning-bg text-warning">{p}</span>;
    return <span className="badge text-[10px] bg-warm-panel text-muted">{p}</span>;
  };

  return (
    <div className="p-8 max-w-[1280px] mx-auto w-full animate-fadeUp">
      {/* Header */}
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-[28px] font-serif text-navy mb-1 tracking-tight">
            {filterStatus === 'pending' ? 'Pending Review' : 'All Cases'}
          </h1>
          <p className="text-[14px] text-muted">{filtered.length} cases found</p>
        </div>
        <Link to="/upload" className="btn-primary gap-2 text-[13px]">
          Upload New Judgment
        </Link>
      </div>

      {/* Filters bar */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-warm-border">
        <div className="relative flex-1 max-w-[360px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input 
            type="text"
            placeholder="Search by case number or department..."
            className="input-field w-full pl-9 h-9 text-[13px]"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="relative">
          <button 
            className="btn-secondary h-9 text-[13px] gap-2"
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
          >
            <Filter className="w-3.5 h-3.5" />
            Status: {statusFilter === 'all' ? 'All' : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
            <ChevronDown className="w-3 h-3" />
          </button>
          {showFilterDropdown && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setShowFilterDropdown(false)} />
              <div className="absolute top-full mt-1 left-0 w-[180px] bg-white border border-warm-border rounded-[6px] shadow-lg z-40 py-1 animate-slideDown">
                {['all', 'verified', 'pending', 'extracted'].map(s => (
                  <button 
                    key={s} 
                    className={`w-full text-left px-4 py-2 text-[13px] hover:bg-paper transition-colors ${statusFilter === s ? 'font-medium text-navy bg-navy-light/50' : 'text-nearBlack'}`}
                    onClick={() => { setStatusFilter(s); setShowFilterDropdown(false); }}
                  >
                    {s === 'all' ? 'All Statuses' : s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {statusFilter !== 'all' && (
          <button 
            className="flex items-center gap-1 text-[12px] text-navy font-medium hover:text-saffron transition-colors"
            onClick={() => setStatusFilter('all')}
          >
            <X className="w-3 h-3" /> Clear filter
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white border border-warm-border rounded-[8px] overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-warm-panel/60 border-b-2 border-warm-border">
            <tr>
              <th className="px-5 py-3 text-[11px] font-medium text-muted uppercase tracking-wider">
                <span className="flex items-center gap-1 cursor-pointer hover:text-nearBlack"><ArrowUpDown className="w-3 h-3" /> Case No</span>
              </th>
              <th className="px-5 py-3 text-[11px] font-medium text-muted uppercase tracking-wider">Court</th>
              <th className="px-5 py-3 text-[11px] font-medium text-muted uppercase tracking-wider">Department</th>
              <th className="px-5 py-3 text-[11px] font-medium text-muted uppercase tracking-wider text-right">
                <span className="flex items-center gap-1 justify-end cursor-pointer hover:text-nearBlack"><ArrowUpDown className="w-3 h-3" /> Date</span>
              </th>
              <th className="px-5 py-3 text-[11px] font-medium text-muted uppercase tracking-wider">Priority</th>
              <th className="px-5 py-3 text-[11px] font-medium text-muted uppercase tracking-wider">Status</th>
              <th className="px-5 py-3 text-[11px] font-medium text-muted uppercase tracking-wider">Verified By</th>
              <th className="px-5 py-3 w-16"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.id} className="border-b border-warm-border/60 hover:bg-paper/80 transition-colors last:border-0">
                <td className="px-5 py-3.5 text-[13px] font-mono text-navy font-medium">{row.id}</td>
                <td className="px-5 py-3.5 text-[13px] text-nearBlack">{row.court}</td>
                <td className="px-5 py-3.5 text-[13px] text-nearBlack">{row.dept}</td>
                <td className="px-5 py-3.5 text-[13px] text-muted text-right">{row.date}</td>
                <td className="px-5 py-3.5">{getPriorityBadge(row.priority)}</td>
                <td className="px-5 py-3.5">{getStatusBadge(row.status)}</td>
                <td className="px-5 py-3.5 text-[12px] text-muted">{row.verifier}</td>
                <td className="px-5 py-3.5 text-right">
                  <Link 
                    to={row.status === 'verified' ? `/verify/${row.id}` : `/review/${row.id}`}
                    className="inline-flex items-center gap-1 text-[12px] text-navy font-medium hover:text-saffron transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" /> View
                  </Link>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="px-5 py-12 text-center text-[14px] text-muted">
                  No cases match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4 text-[12px] text-muted">
        <span>Showing {filtered.length} of {allCases.length} cases</span>
        <span>Page 1 of 1</span>
      </div>
    </div>
  );
}
