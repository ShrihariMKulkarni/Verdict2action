import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ChevronDown, ExternalLink, AlertTriangle, CheckCircle2, AlertCircle, FileText } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function VerifyScreen() {
  const navigate = useNavigate();
  const { caseId } = useParams();
  const [contextExpanded, setContextExpanded] = useState(true);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [conflicts, setConflicts] = useState([
    { id: 'C1', target: 'A2', type: 'DATE CONFLICT', msg: 'Human-set deadline (2023-01-01) is in the past.' }
  ]);

  const [actions, setActions] = useState([
    {
      id: 'A1', type: 'comply', priority: 'HIGH', ref: 'D1',
      desc: 'Consider the representation of the petitioner dated 14.05.2023 and pass appropriate orders.',
      dept: 'Urban Development Dept', deadline: '2023-11-09', inferred: true,
      needsReview: false, status: 'pending'
    },
    {
      id: 'A2', type: 'pay', priority: 'MEDIUM', ref: 'D2',
      desc: 'Pay the arrears as calculated up to the date of order.',
      dept: 'Finance Dept', deadline: '2023-01-01', inferred: false,
      needsReview: true, reviewReason: 'Amount unspecified in judgment, please verify.', status: 'pending'
    }
  ]);

  const handleApprove = (id) => {
    setActions(actions.map(a => a.id === id ? { ...a, status: 'approved' } : a));
  };

  const handleApproveAll = () => {
    setActions(actions.map(a => (a.needsReview && a.status === 'pending') ? a : { ...a, status: 'approved' }));
  };

  const pendingCount = actions.filter(a => a.status === 'pending').length;
  const approvedCount = actions.filter(a => a.status === 'approved').length;
  const canSubmit = pendingCount === 0;

  const handleSubmit = () => {
    toast.success('Action plan verified and submitted successfully', {
      style: { borderRadius: '4px', border: '1px solid #166534', background: '#DCFCE7', color: '#166534', fontSize: '13px', fontWeight: 500 },
    });
    setTimeout(() => navigate('/dashboard'), 1500);
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'comply': return 'bg-verified-bg text-verified';
      case 'appeal': return 'bg-navy-light text-navy';
      case 'pay': return 'bg-warning-bg text-warning';
      case 'file_affidavit': return 'bg-info-bg text-info';
      default: return 'bg-warm-panel text-muted';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'HIGH': return 'bg-danger-bg text-danger';
      case 'MEDIUM': return 'bg-warning-bg text-warning';
      default: return 'bg-warm-panel text-muted';
    }
  };

  return (
    <div className="w-full max-w-[900px] mx-auto pb-36 relative h-full overflow-y-auto">
      <Toaster position="top-center" />
      
      {/* Case Context Banner */}
      <div className="sticky top-0 z-20 bg-paper pt-6 pb-4 px-2">
        <div className="bg-navy-light border border-[#B8CEDF] rounded-[8px] overflow-hidden animate-fadeUp">
          <div 
            className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-[#E0E8F2] transition-colors"
            onClick={() => setContextExpanded(!contextExpanded)}
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-[6px] bg-navy/10 flex items-center justify-center">
                <FileText className="w-4 h-4 text-navy" strokeWidth={1.5} />
              </div>
              <span className="font-mono text-[14px] font-medium text-navy">{caseId || 'WP-1044-2023'}</span>
              <span className="text-[13px] text-navy/70">High Court of Karnataka</span>
              <span className="text-[13px] text-navy/70">Order: Oct 12, 2023</span>
            </div>
            <div className="flex items-center gap-3">
              <Link 
                to={`/review/${caseId || 'WP-1044-2023'}`}
                className="flex items-center gap-1 text-[12px] text-info hover:underline font-medium"
                onClick={e => e.stopPropagation()}
              >
                <ExternalLink className="w-3.5 h-3.5" /> View original PDF
              </Link>
              <ChevronDown className={`w-4 h-4 text-navy transition-transform duration-200 ${contextExpanded ? 'rotate-180' : ''}`} />
            </div>
          </div>
          {contextExpanded && (
            <div className="px-4 py-3 pt-2 border-t border-[#B8CEDF]/40 flex gap-10 text-[13px] text-navy/70 animate-slideDown">
              <div><span className="font-medium text-navy mr-1">Disposal:</span>Allowed</div>
              <div><span className="font-medium text-navy mr-1">Uploaded by:</span>Rajesh Kumar on Oct 14, 2023</div>
              <div><span className="font-medium text-navy mr-1">Status:</span><span className="badge-pending text-[9px] ml-1"><span className="w-1 h-1 rounded-full bg-warning" /> Under Review</span></div>
            </div>
          )}
        </div>
      </div>

      <div className="px-2">
        {/* Conflict Alerts */}
        {conflicts.length > 0 && (
          <div className="mb-6 space-y-2 mt-2 animate-fadeUp">
            {conflicts.map(c => (
              <div key={c.id} className="bg-danger-bg/80 border-l-4 border-danger p-3.5 flex items-start gap-3 rounded-r-[6px]">
                <AlertCircle className="w-5 h-5 text-danger shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="text-[13px] text-nearBlack leading-relaxed">
                    <strong className="text-danger">{c.type}</strong> on {c.target}: {c.msg}
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button className="text-[12px] text-muted hover:text-nearBlack font-medium transition-colors" onClick={() => setConflicts(conflicts.filter(x => x.id !== c.id))}>Dismiss</button>
                  <button className="text-[12px] text-navy font-medium hover:underline">Fix now</button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mb-6 mt-4 animate-fadeUp">
          <h2 className="text-[22px] font-serif text-navy">AI-Generated Action Plan</h2>
          <p className="text-[13px] text-muted mt-1 flex items-center gap-2">
            Generated at Oct 14, 2023 10:42 AM IST
            <span className="badge bg-navy-light text-navy text-[9px] normal-case">AI-generated</span>
          </p>
        </div>

        {/* Actions List */}
        <div className="space-y-4 mb-8 stagger-children">
          {actions.map(action => (
            <div 
              key={action.id} 
              className={`card relative overflow-hidden transition-all duration-300 ${
                action.status === 'approved' 
                  ? 'border-verified bg-verified-bg/10' 
                  : action.needsReview 
                    ? 'border-l-4 border-l-warning' 
                    : ''
              }`}
            >
              {action.status === 'approved' && (
                <div className="absolute top-4 right-4 text-verified flex items-center gap-1.5 text-[12px] font-medium bg-verified-bg px-2.5 py-1 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Approved
                </div>
              )}
              
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-navy text-white text-[12px] font-medium px-2.5 py-0.5 rounded-[4px]">{action.id}</span>
                <span className={`badge ${getTypeColor(action.type)} text-[10px]`}>{action.type}</span>
                <span className={`badge ${getPriorityColor(action.priority)} text-[10px]`}>{action.priority}</span>
                <Link to={`/review/${caseId || 'WP-1044-2023'}`} className="text-[12px] text-info font-medium ml-2 hover:underline flex items-center gap-1">
                  ▸ {action.ref}
                </Link>
              </div>

              {action.needsReview && (
                <div className="bg-warning-bg/70 text-warning text-[12px] p-2.5 rounded-[4px] mb-3 flex items-start gap-2 font-medium">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  {action.reviewReason}
                </div>
              )}

              <p className="text-[14px] text-nearBlack mb-4 leading-relaxed max-w-[85%]">{action.desc}</p>

              <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="input-label">Responsible Dept</label>
                  <select className="input-field w-full text-[13px] h-9" defaultValue={action.dept}>
                    <option>Urban Development Dept</option>
                    <option>Finance Dept</option>
                    <option>Law Dept</option>
                    <option>Revenue Dept</option>
                    <option>Home Dept</option>
                  </select>
                </div>
                <div>
                  <label className="input-label">Deadline</label>
                  <div className="flex items-center gap-2">
                    <input type="date" className="input-field w-full text-[13px] h-9" defaultValue={action.deadline} />
                    {action.inferred && (
                      <span className="text-[10px] font-medium bg-warm-panel text-muted border border-warm-border px-2 py-1 rounded-full shrink-0 cursor-help whitespace-nowrap" title="No explicit deadline found in judgment. Karnataka Govt default applied.">
                        inferred
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {action.status !== 'approved' && (
                <div className="flex gap-3 pt-4 border-t border-warm-border/60">
                  <button className="btn h-8 bg-verified text-white text-[13px] hover:bg-[#104e28] px-4 rounded-[4px] transition-colors" onClick={() => handleApprove(action.id)}>
                    Approve this item ✓
                  </button>
                  <button className="btn-secondary h-8 text-[12px] px-3">Edit</button>
                  <button className="btn-ghost text-danger h-8 text-[12px] px-3 hover:!text-danger">Remove</button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Appeal Window Card */}
        <div className="card border-l-4 border-l-navy mb-8 animate-fadeUp">
          <h3 className="text-[18px] font-serif text-navy mb-4">Appeal Consideration Window</h3>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <div className="text-[11px] text-muted uppercase tracking-wider font-medium mb-1">Applicable</div>
              <div className="text-[14px] font-medium text-nearBlack">Yes</div>
            </div>
            <div>
              <div className="text-[11px] text-muted uppercase tracking-wider font-medium mb-1">Forum</div>
              <div className="text-[14px] font-medium text-nearBlack">Division Bench</div>
            </div>
            <div>
              <div className="text-[11px] text-muted uppercase tracking-wider font-medium mb-1">Deadline</div>
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-medium text-nearBlack">Jan 10, 2024</span>
                <span className="flex items-center gap-1.5 text-[11px] font-medium text-danger bg-danger-bg px-2.5 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-danger animate-pulse" /> 88 days left
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions & Submit Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-warm-border z-30 w-full flex justify-center">
        <div className="w-[calc(100%-240px)] ml-[240px] max-w-[900px] px-6">
          
          <div className="py-2.5 text-center border-b border-warm-border/50">
            <span className="text-[12px] text-muted">
              Reviewing as: <strong className="text-nearBlack font-medium">Vikram Singh</strong> · Joint Secretary · Urban Development 
              <button className="text-info ml-2 hover:underline font-medium">Change reviewer</button>
            </span>
          </div>

          <div className="h-16 flex items-center justify-between">
            <div className="w-[200px]">
              <div className="text-[12px] font-medium text-nearBlack mb-1.5">{approvedCount} of {actions.length} items approved</div>
              <div className="w-full h-2 bg-warm-panel rounded-full overflow-hidden">
                <div className="h-full bg-navy rounded-full transition-all duration-500 ease-out" style={{ width: `${(approvedCount / actions.length) * 100}%` }} />
              </div>
            </div>

            <div className="flex gap-3 relative">
              <button 
                className="btn-secondary h-9 text-[13px]" 
                onClick={handleApproveAll}
                disabled={pendingCount === 0}
              >
                Approve All Remaining
              </button>
              <button 
                className="btn-primary h-9 text-[13px]" 
                disabled={!canSubmit}
                onClick={() => setShowSubmitConfirm(true)}
              >
                Submit Verified Record →
              </button>

              {showSubmitConfirm && (
                <div className="absolute bottom-full mb-3 right-0 w-[400px] bg-white border border-warm-border rounded-[8px] shadow-xl p-5 animate-slideDown">
                  <p className="text-[14px] text-nearBlack leading-relaxed mb-4">
                    You are about to submit this verified record as <strong>Vikram Singh</strong> on <strong>{new Date().toLocaleDateString('en-IN', {day:'numeric', month:'short', year:'numeric'})}</strong>.
                  </p>
                  <p className="text-[12px] text-muted mb-5">This action will be logged in the audit trail and cannot be undone.</p>
                  <div className="flex justify-end gap-3">
                    <button className="btn-secondary h-9 text-[13px]" onClick={() => setShowSubmitConfirm(false)}>Cancel</button>
                    <button className="btn-primary h-9 text-[13px]" onClick={handleSubmit}>Confirm & Submit →</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
