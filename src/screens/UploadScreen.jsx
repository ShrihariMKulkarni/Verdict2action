import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FileUp, X, ChevronDown, CheckCircle2, Loader2, AlertTriangle, FileText, ArrowRight, Clock, Eye } from 'lucide-react';

export default function UploadScreen() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [file, setFile] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStep, setProcessStep] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [metadata, setMetadata] = useState({
    caseNumber: 'WP-1044-2023',
    department: 'Urban Development Dept',
    dateReceived: new Date().toISOString().split('T')[0]
  });
  const [recentExpanded, setRecentExpanded] = useState(true);

  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsHovering(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleProcess = () => {
    if (!file) return;
    setIsProcessing(true);
    setProcessStep(1);
    let time = 0;
    
    const interval = setInterval(() => {
      time += 1;
      setElapsedTime(time);
      if (time === 3) setProcessStep(2);
      else if (time === 6) setProcessStep(3);
      else if (time === 9) {
        clearInterval(interval);
        setProcessStep(4);
        setTimeout(() => navigate('/review/WP-1044-2023'), 800);
      }
    }, 1000);
  };

  const recentCases = [
    { id: 'WP-882-2023', dept: 'Revenue Dept', date: 'Oct 12, 2023', status: 'verified' },
    { id: 'CA-102-2023', dept: 'Urban Development', date: 'Oct 11, 2023', status: 'pending' },
    { id: 'WP-915-2023', dept: 'Home Dept', date: 'Oct 10, 2023', status: 'verified' },
    { id: 'WA-554-2022', dept: 'Finance Dept', date: 'Oct 09, 2023', status: 'verified' },
    { id: 'WP-441-2023', dept: 'Law Dept', date: 'Oct 08, 2023', status: 'pending' },
  ];

  return (
    <div className="w-full max-w-[660px] mx-auto pt-10 pb-24 px-6 animate-fadeUp">
      
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-[28px] font-serif text-navy mb-1.5 tracking-tight">Upload Court Judgment</h1>
        <p className="text-[14px] text-muted leading-relaxed">
          AI will extract case details, identify directions, and generate a compliance action plan.
        </p>
      </div>

      <div className="space-y-6">
        {/* Upload Zone */}
        <div 
          className={`relative rounded-[8px] border-2 transition-all duration-200 flex flex-col items-center justify-center cursor-pointer ${
            file 
              ? 'border-navy bg-navy-light/30 border-solid h-[120px]' 
              : isHovering 
                ? 'border-navy bg-navy-light border-dashed h-[200px]' 
                : 'border-warm-border hover:border-navy/40 bg-white border-dashed h-[200px]'
          }`}
          onDragOver={(e) => { e.preventDefault(); setIsHovering(true); }}
          onDragLeave={() => setIsHovering(false)}
          onDrop={handleFileDrop}
          onClick={() => !file && fileInputRef.current?.click()}
        >
          <input 
            type="file" ref={fileInputRef} className="hidden" accept=".pdf"
            onChange={(e) => e.target.files?.[0] && setFile(e.target.files[0])}
          />
          
          {file ? (
            <div className="w-full h-full flex items-center px-6 relative">
              <button 
                className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center text-muted hover:text-danger hover:bg-danger-bg rounded-full transition-all"
                onClick={(e) => { e.stopPropagation(); setFile(null); setIsProcessing(false); setProcessStep(0); }}
              >
                <X className="w-4 h-4" />
              </button>
              <div className="w-12 h-12 rounded-[8px] bg-navy/8 flex items-center justify-center mr-4 shrink-0">
                <FileText className="w-6 h-6 text-navy" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-medium text-nearBlack truncate">{file.name}</div>
                <div className="text-[12px] text-muted mt-0.5">
                  {(file.size / (1024 * 1024)).toFixed(1)} MB · PDF document
                </div>
              </div>
              <span className="flex items-center gap-1.5 text-[12px] text-verified font-medium bg-verified-bg px-3 py-1.5 rounded-full shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5" /> Ready to process
              </span>
            </div>
          ) : (
            <div className="text-center pointer-events-none px-6">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-navy/6 flex items-center justify-center">
                <FileUp className="w-7 h-7 text-navy" strokeWidth={1.5} />
              </div>
              <p className="text-[15px] font-medium text-navy mb-1.5">Drop judgment PDF here</p>
              <p className="text-[12px] text-muted">or click to browse · Accepts PDF · Max 25MB · Scanned PDFs supported via OCR</p>
            </div>
          )}
        </div>

        {/* Metadata Pre-fill */}
        {file && !isProcessing && (
          <div className="grid grid-cols-3 gap-4 animate-fadeUp">
            <div>
              <label className="input-label">Case Number</label>
              <input 
                type="text" className="input-field w-full font-mono text-[14px]" 
                value={metadata.caseNumber}
                onChange={(e) => setMetadata({...metadata, caseNumber: e.target.value})}
              />
            </div>
            <div>
              <label className="input-label">Department</label>
              <select 
                className="input-field w-full text-[14px] bg-white"
                value={metadata.department}
                onChange={(e) => setMetadata({...metadata, department: e.target.value})}
              >
                <option>Urban Development Dept</option>
                <option>Revenue Dept</option>
                <option>Home Dept</option>
                <option>Finance Dept</option>
                <option>Law Dept</option>
              </select>
            </div>
            <div>
              <label className="input-label">Date Received</label>
              <input 
                type="date" className="input-field w-full text-[14px]"
                value={metadata.dateReceived}
                onChange={(e) => setMetadata({...metadata, dateReceived: e.target.value})}
              />
            </div>
          </div>
        )}

        {/* Process Button */}
        {file && !isProcessing && (
          <button className="btn-primary w-full h-[48px] rounded-[8px] text-[15px] gap-2 animate-fadeUp" onClick={handleProcess}>
            Extract & Generate Action Plan <ArrowRight className="w-4 h-4" />
          </button>
        )}

        {/* Processing Steps */}
        {isProcessing && (
          <div className="card space-y-0 !p-0 overflow-hidden animate-fadeUp">
            {[
              { step: 1, label: 'Extracting text from PDF...' },
              { step: 2, label: 'Running AI analysis...' },
              { step: 3, label: 'Generating action plan...' },
            ].map(({ step, label }) => (
              <div key={step} className={`flex items-center gap-3 px-5 py-3.5 border-b border-warm-border/50 last:border-0 transition-colors ${processStep === step ? 'bg-navy-light/40' : ''}`}>
                {processStep > step ? (
                  <CheckCircle2 className="w-5 h-5 text-verified shrink-0" />
                ) : processStep === step ? (
                  <Loader2 className="w-5 h-5 text-navy animate-spin shrink-0" />
                ) : (
                  <div className="w-5 h-5 border-2 border-warm-border rounded-full shrink-0" />
                )}
                <span className={`text-[14px] flex-1 ${processStep > step ? 'text-muted' : processStep === step ? 'font-medium text-navy' : 'text-muted/60'}`}>
                  {label}
                </span>
                <span className="text-[12px] text-muted font-mono w-10 text-right">
                  {processStep === step ? `${elapsedTime}s` : processStep > step ? '✓' : ''}
                </span>
              </div>
            ))}

            {processStep === 1 && (
              <div className="bg-warning-bg/60 border-t border-warning/10 px-5 py-3 flex gap-2.5 items-start">
                <AlertTriangle className="w-4 h-4 text-warning mt-0.5 shrink-0" strokeWidth={2} />
                <span className="text-[12px] text-warning font-medium leading-relaxed">
                  Scanned PDF detected — running OCR. This may take 30–60 seconds.
                </span>
              </div>
            )}

            {processStep === 4 && (
              <div className="bg-verified-bg/60 px-5 py-3 flex items-center gap-2.5 border-t border-verified/10">
                <CheckCircle2 className="w-4.5 h-4.5 text-verified" />
                <span className="text-[13px] text-verified font-medium">Complete — redirecting to review...</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Recent Uploads */}
      <div className="mt-10 border border-warm-border rounded-[8px] bg-white overflow-hidden">
        <button 
          className="w-full px-5 py-3.5 flex items-center justify-between bg-warm-panel/60 hover:bg-warm-panel transition-colors"
          onClick={() => setRecentExpanded(!recentExpanded)}
        >
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted" />
            <span className="text-[14px] font-medium text-nearBlack">Recent uploads</span>
            <span className="text-[12px] text-muted font-normal">({recentCases.length})</span>
          </div>
          <ChevronDown className={`w-4 h-4 text-muted transition-transform duration-200 ${recentExpanded ? 'rotate-180' : ''}`} />
        </button>
        
        {recentExpanded && (
          <div className="animate-slideDown">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-warm-border bg-paper/50">
                  <th className="px-5 py-2.5 text-[11px] font-medium text-muted uppercase tracking-wider">Case No</th>
                  <th className="px-5 py-2.5 text-[11px] font-medium text-muted uppercase tracking-wider">Department</th>
                  <th className="px-5 py-2.5 text-[11px] font-medium text-muted uppercase tracking-wider text-right">Date</th>
                  <th className="px-5 py-2.5 text-[11px] font-medium text-muted uppercase tracking-wider">Status</th>
                  <th className="px-5 py-2.5 w-16"></th>
                </tr>
              </thead>
              <tbody>
                {recentCases.map((row) => (
                  <tr key={row.id} className="border-b border-warm-border/60 hover:bg-paper/80 transition-colors last:border-b-0">
                    <td className="px-5 py-3 text-[13px] font-mono text-navy font-medium">{row.id}</td>
                    <td className="px-5 py-3 text-[13px] text-nearBlack">{row.dept}</td>
                    <td className="px-5 py-3 text-[13px] text-muted text-right">{row.date}</td>
                    <td className="px-5 py-3">
                      {row.status === 'verified' ? (
                        <span className="badge-approved text-[10px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-verified"></span> Verified
                        </span>
                      ) : (
                        <span className="badge-pending text-[10px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-warning"></span> Pending
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <Link 
                        to={row.status === 'verified' ? `/verify/${row.id}` : `/review/${row.id}`}
                        className="inline-flex items-center gap-1 text-[12px] text-navy font-medium hover:text-saffron transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" /> View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-5 py-3 border-t border-warm-border bg-paper/30 text-center">
              <Link to="/cases" className="text-[12px] text-navy font-medium hover:text-saffron transition-colors">
                View all cases →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
