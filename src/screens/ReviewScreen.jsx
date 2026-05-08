import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Pencil, Check, X, ChevronLeft, ChevronRight, AlertTriangle, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

export default function ReviewScreen() {
  const navigate = useNavigate();
  const { caseId } = useParams();
  const [activeHighlight, setActiveHighlight] = useState(null);
  const [allReviewed, setAllReviewed] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [currentPage, setCurrentPage] = useState(3);
  const [zoom, setZoom] = useState('100');
  
  const [caseDetails, setCaseDetails] = useState({
    caseNumber: caseId || 'WP-1044-2023',
    caseType: 'Writ Petition',
    court: 'High Court of Karnataka',
    bench: 'Single Judge',
    dateOfOrder: '2023-10-12',
    disposalType: 'Allowed'
  });

  const confidenceScore = 87;

  const fieldLabels = {
    caseNumber: 'Case Number',
    caseType: 'Case Type',
    court: 'Court',
    bench: 'Bench',
    dateOfOrder: 'Date of Order',
    disposalType: 'Disposal Type',
  };

  const fieldConfidence = {
    caseNumber: 'high', caseType: 'high', court: 'high',
    bench: 'medium', dateOfOrder: 'high', disposalType: 'high',
  };

  return (
    <div className="flex h-full w-full bg-paper">
      
      {/* LEFT PANEL: PDF VIEWER (55%) */}
      <div className="w-[55%] flex flex-col border-r border-warm-border bg-white h-full shrink-0">
        {/* Confidence Band */}
        <div className="h-2.5 w-full relative" style={{ background: 'linear-gradient(to right, #991B1B 0%, #92400E 40%, #166534 100%)' }}>
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-white group cursor-help z-10"
            style={{ left: `${confidenceScore}%` }}
          >
            <div className="absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-nearBlack text-white text-[11px] px-3 py-1.5 rounded-[4px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
              Overall extraction confidence: {confidenceScore}%
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-nearBlack rotate-45" />
            </div>
            <div className="absolute -top-0.5 -left-[5px] w-3 h-3.5 rounded-sm border-2 border-white bg-nearBlack" />
          </div>
        </div>

        {/* Confidence Label */}
        <div className="h-8 bg-paper/80 border-b border-warm-border flex items-center px-4">
          <span className="text-[11px] text-muted">
            Overall confidence: <strong className="text-verified">{confidenceScore}%</strong> — High
          </span>
        </div>

        {/* PDF Toolbar */}
        <div className="h-12 border-b border-warm-border flex items-center justify-between px-4 bg-white shrink-0">
          <div className="flex items-center gap-1.5">
            <button className="p-1.5 text-muted hover:text-nearBlack hover:bg-paper rounded transition-colors" onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5 px-2">
              <input 
                type="number" min="1" max="14"
                className="w-8 h-6 text-center text-[12px] font-medium border border-warm-border rounded bg-white focus:outline-none focus:border-navy"
                value={currentPage}
                onChange={(e) => setCurrentPage(Math.min(14, Math.max(1, parseInt(e.target.value) || 1)))}
              />
              <span className="text-[12px] text-muted">/ 14</span>
            </div>
            <button className="p-1.5 text-muted hover:text-nearBlack hover:bg-paper rounded transition-colors" onClick={() => setCurrentPage(Math.min(14, currentPage + 1))}>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-0.5 bg-paper rounded-[4px] border border-warm-border p-0.5">
            {['75', '100', '125'].map(z => (
              <button 
                key={z}
                className={`px-3 py-1 text-[12px] font-medium rounded-[3px] transition-colors ${zoom === z ? 'bg-white text-nearBlack shadow-sm border border-warm-border' : 'text-muted hover:text-nearBlack'}`}
                onClick={() => setZoom(z)}
              >
                {z}%
              </button>
            ))}
            <div className="w-px h-5 bg-warm-border mx-1" />
            <button 
              className={`px-3 py-1 text-[12px] font-medium rounded-[3px] transition-colors ${zoom === 'fit' ? 'bg-white text-nearBlack shadow-sm border border-warm-border' : 'text-muted hover:text-nearBlack'}`}
              onClick={() => setZoom('fit')}
            >
              Fit
            </button>
          </div>
        </div>

        {/* PDF Document Area (Mock) */}
        <div className="flex-1 overflow-auto bg-[#e8e6e1] p-6 flex justify-center">
          <div className="w-full max-w-[700px] bg-white shadow-sm border border-[#d0cec8] p-10 relative text-left min-h-[900px]">
            <div className="text-center mb-8 space-y-1">
              <p className="text-[11px] text-muted uppercase tracking-widest">Before</p>
              <h2 className="text-[17px] font-serif text-nearBlack">IN THE HIGH COURT OF KARNATAKA AT BENGALURU</h2>
              <p className="text-[12px] text-muted mt-2">DATED THIS THE 12TH DAY OF OCTOBER, 2023</p>
              <p className="text-[13px] font-medium text-nearBlack mt-2">W.P. No. 1044/2023 (GM-RES)</p>
            </div>
            
            <div className="space-y-5 text-[13.5px] leading-[1.8] text-justify text-nearBlack">
              <p>1. The petitioner, a government servant working under the Urban Development Department, has filed this writ petition seeking direction...</p>
              
              <p>2. Heard the learned counsel for the petitioner and the learned Government Advocate appearing for the State.</p>
              
              <div 
                className={`p-3 rounded-[4px] transition-all duration-200 cursor-default ${
                  activeHighlight === 'D1' ? 'bg-warning-bg/60 border-l-4 border-navy' : 'hover:bg-paper/50'
                }`}
                onMouseEnter={() => setActiveHighlight('D1')}
                onMouseLeave={() => setActiveHighlight(null)}
              >
                <p><strong>3.</strong> The respondent authorities are directed to consider the representation of the petitioner dated 14.05.2023 and pass appropriate orders in accordance with law, within the framework of the applicable rules and regulations.</p>
              </div>

              <div 
                className={`p-3 rounded-[4px] transition-all duration-200 cursor-default ${
                  activeHighlight === 'T1' ? 'bg-info-bg/60 border-l-4 border-navy' : 'hover:bg-paper/50'
                }`}
                onMouseEnter={() => setActiveHighlight('T1')}
                onMouseLeave={() => setActiveHighlight(null)}
              >
                <p><strong>4.</strong> The said exercise shall be completed within a period of <u>four weeks</u> from the date of receipt of a certified copy of this order.</p>
              </div>
              
              <p>5. Writ petition is accordingly disposed of. No costs.</p>
              
              <div className="pt-8 text-right text-[13px]">
                <p className="font-medium">Sd/-</p>
                <p>JUDGE</p>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="h-10 border-t border-warm-border bg-white flex items-center px-5 gap-5 shrink-0">
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-navy" /><span className="text-[11px] text-muted">Case details</span></div>
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-warning" /><span className="text-[11px] text-muted">Directions</span></div>
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-verified" /><span className="text-[11px] text-muted">Timelines</span></div>
        </div>
      </div>

      {/* RIGHT PANEL: EXTRACTED DATA (45%) */}
      <div className="w-[45%] flex flex-col h-full bg-paper relative">
        <div className="flex-1 overflow-auto p-6 pb-24 space-y-7">
          
          {/* Case Details Card */}
          <section className="animate-fadeUp">
            <h2 className="text-[16px] font-serif text-navy mb-3 flex items-center gap-2">
              Case Details
              <span className="text-[11px] font-sans font-normal text-muted bg-paper px-2 py-0.5 rounded-full border border-warm-border">AI-generated</span>
            </h2>
            <div className="card !p-0 overflow-hidden">
              {Object.entries(caseDetails).map(([key, value], idx) => (
                <div key={key} className={`group flex items-center justify-between px-5 py-3 hover:bg-paper/50 transition-colors ${idx < Object.entries(caseDetails).length - 1 ? 'border-b border-warm-border/50' : ''}`}>
                  <div className="flex-1">
                    <div className="text-[11px] text-muted uppercase tracking-wider font-medium mb-0.5">{fieldLabels[key]}</div>
                    {editingField === key ? (
                      <div className="flex items-center gap-1.5 mt-1">
                        <input 
                          type="text" className="input-field h-7 text-[13px] px-2 flex-1" 
                          value={value} 
                          onChange={(e) => setCaseDetails({...caseDetails, [key]: e.target.value})} 
                          autoFocus
                        />
                        <button className="p-1 text-verified hover:bg-verified-bg rounded transition-colors" onClick={() => setEditingField(null)}><Check className="w-3.5 h-3.5" /></button>
                        <button className="p-1 text-muted hover:bg-paper rounded transition-colors" onClick={() => setEditingField(null)}><X className="w-3.5 h-3.5" /></button>
                      </div>
                    ) : (
                      <span className={`text-[14px] text-nearBlack ${key === 'caseNumber' ? 'font-mono' : ''}`}>{value}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-4">
                    <div className={`w-2 h-2 rounded-full ${fieldConfidence[key] === 'high' ? 'bg-verified' : 'bg-warning'}`} title={`${fieldConfidence[key]} confidence`} />
                    {editingField !== key && (
                      <button 
                        className="p-1.5 text-muted hover:text-navy opacity-0 group-hover:opacity-100 hover:bg-navy-light rounded transition-all"
                        onClick={() => setEditingField(key)}
                      >
                        <Pencil className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Directions List */}
          <section className="animate-fadeUp" style={{ animationDelay: '0.05s' }}>
            <h2 className="text-[16px] font-serif text-navy mb-3">Directions / Orders</h2>
            <div className="space-y-3">
              <div 
                className={`card card-hover transition-all duration-200 ${activeHighlight === 'D1' ? 'border-navy !bg-navy-light/20' : ''}`}
                onMouseEnter={() => setActiveHighlight('D1')}
                onMouseLeave={() => setActiveHighlight(null)}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="bg-navy text-white text-[11px] font-medium px-2 py-0.5 rounded-[4px]">D1</span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-verified-bg text-verified px-2 py-0.5 rounded-full">92%</span>
                  </div>
                  <button className="text-[12px] text-info font-medium hover:underline">p. 3</button>
                </div>
                <p className="text-[14px] leading-[1.75] text-nearBlack">Consider the representation of the petitioner dated 14.05.2023 and pass appropriate orders in accordance with law.</p>
                <div className="flex gap-3 mt-3 pt-3 border-t border-warm-border/50">
                  <button className="text-[12px] font-medium text-muted hover:text-navy transition-colors">Edit</button>
                  <button className="text-[12px] font-medium text-muted hover:text-warning transition-colors">Flag for review</button>
                  <button className="text-[12px] font-medium text-muted hover:text-danger transition-colors">Remove</button>
                </div>
              </div>

              <div className="card border-l-4 border-l-warning">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="bg-navy text-white text-[11px] font-medium px-2 py-0.5 rounded-[4px]">D2</span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-warning-bg text-warning px-2 py-0.5 rounded-full">64%</span>
                  </div>
                  <button className="text-[12px] text-info font-medium hover:underline">p. 4</button>
                </div>
                <div className="bg-warning-bg/70 text-warning text-[11px] px-2.5 py-1.5 mb-2.5 rounded-[4px] flex items-center gap-1.5 w-max font-medium">
                  <AlertTriangle className="w-3 h-3" strokeWidth={2.5} />
                  Low confidence — verify manually
                </div>
                <p className="text-[14px] leading-[1.75] text-nearBlack">Pay the arrears within a reasonable timeframe not exceeding three months.</p>
                <div className="flex gap-3 mt-3 pt-3 border-t border-warm-border/50">
                  <button className="text-[12px] font-medium text-muted hover:text-navy transition-colors">Edit</button>
                  <button className="text-[12px] font-medium text-muted hover:text-warning transition-colors">Flag for review</button>
                  <button className="text-[12px] font-medium text-muted hover:text-danger transition-colors">Remove</button>
                </div>
              </div>
              
              <button className="btn-ghost text-[13px] w-full text-navy hover:!text-navy">+ Add direction manually</button>
            </div>
          </section>

          {/* Timelines */}
          <section className="animate-fadeUp" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-[16px] font-serif text-navy mb-3">Key Timelines</h2>
            <div className="card !p-0 overflow-hidden">
              <div 
                className={`flex justify-between items-center px-5 py-3.5 border-b border-warm-border/50 hover:bg-paper/50 cursor-pointer transition-colors ${activeHighlight === 'T1' ? 'bg-info-bg/20' : ''}`}
                onMouseEnter={() => setActiveHighlight('T1')}
                onMouseLeave={() => setActiveHighlight(null)}
              >
                <span className="text-[14px] text-nearBlack">Completion of exercise</span>
                <span className="text-[12px] font-medium bg-warm-panel text-nearBlack border border-warm-border px-2.5 py-1 rounded-full">4 weeks</span>
              </div>
              <div className="flex justify-between items-center px-5 py-3.5 hover:bg-paper/50 cursor-pointer transition-colors">
                <span className="text-[14px] text-nearBlack">Payment of arrears</span>
                <span className="text-[12px] font-medium bg-warm-panel text-nearBlack border border-warm-border px-2.5 py-1 rounded-full">3 months</span>
              </div>
            </div>
          </section>

          {/* Appeal Info */}
          <section className="animate-fadeUp" style={{ animationDelay: '0.15s' }}>
            <div className="card flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-[14px] font-medium text-nearBlack">Appeal mentioned?</span>
                <div className="flex bg-warm-panel rounded-[4px] p-0.5">
                  <button className="px-4 py-1.5 text-[12px] font-medium text-muted hover:bg-white rounded-[3px] transition-colors">Yes</button>
                  <button className="px-4 py-1.5 text-[12px] font-medium text-nearBlack bg-white shadow-sm rounded-[3px] border border-warm-border">No</button>
                </div>
              </div>
              <span className="text-[13px] text-muted">Limitation period: <strong className="text-nearBlack">90 days</strong></span>
            </div>
          </section>
        </div>

        {/* Action Strip */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-warm-border flex items-center justify-between px-6 py-4 z-10">
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input 
              type="checkbox" 
              className="w-4 h-4 rounded border-warm-border text-navy focus:ring-navy accent-[#1B3A5C]" 
              checked={allReviewed}
              onChange={(e) => setAllReviewed(e.target.checked)}
            />
            <span className="text-[13px] font-medium text-nearBlack">All fields reviewed</span>
          </label>
          <div className="flex gap-3">
            <button className="btn-secondary h-9 text-[13px]">Save Draft</button>
            <button 
              className="btn-primary h-9 text-[13px]" 
              disabled={!allReviewed}
              onClick={() => navigate(`/verify/${caseId || 'WP-1044-2023'}`)}
            >
              Proceed to Action Plan →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
