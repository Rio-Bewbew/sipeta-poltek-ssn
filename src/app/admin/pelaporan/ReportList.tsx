"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Report = {
  id: string;
  subject: string;
  description: string;
  location: string | null;
  dateOccurred: string | null;
  isRead: boolean;
  createdAt: Date;
};

export default function ReportList({ initialReports }: { initialReports: Report[] }) {
  const [reports, setReports] = useState(initialReports);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleReadStatus = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/admin/pelaporan/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: !currentStatus }),
      });
      if (res.ok) {
        setReports(reports.map(r => r.id === id ? { ...r, isRead: !currentStatus } : r));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteReport = async (id: string) => {
    if (!confirm("Yakin ingin menghapus laporan ini secara permanen?")) return;
    try {
      const res = await fetch(`/api/admin/pelaporan/${id}`, { method: "DELETE" });
      if (res.ok) {
        setReports(reports.filter(r => r.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (reports.length === 0) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl opacity-50">📭</span>
        </div>
        <p className="text-white/50">Belum ada laporan anonim yang masuk.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reports.map((report) => (
        <div 
          key={report.id} 
          className={`bg-white/5 border rounded-2xl overflow-hidden transition-all duration-300 ${report.isRead ? 'border-white/10 opacity-70' : 'border-emas/40 shadow-[0_0_15px_rgba(234,179,8,0.1)]'}`}
        >
          <div 
            className="p-6 cursor-pointer flex items-center justify-between gap-4"
            onClick={() => {
              setExpandedId(expandedId === report.id ? null : report.id);
              if (!report.isRead) toggleReadStatus(report.id, false);
            }}
          >
            <div className="flex items-center gap-4 flex-1">
              {!report.isRead && (
                <div className="w-2 h-2 rounded-full bg-emas animate-pulse flex-shrink-0"></div>
              )}
              <div className="flex-1">
                <h3 className={`font-semibold text-lg ${report.isRead ? 'text-white/80' : 'text-white'}`}>
                  {report.subject}
                </h3>
                <p className="text-sm text-white/40 mt-1">
                  Dikirim pada {new Date(report.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute:'2-digit' })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className={`text-xs px-2 py-1 rounded font-medium ${report.isRead ? 'bg-white/10 text-white/50' : 'bg-emas/20 text-emas'}`}>
                {report.isRead ? 'Sudah Dibaca' : 'Baru'}
              </span>
              <svg className={`w-5 h-5 text-white/40 transition-transform ${expandedId === report.id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <AnimatePresence>
            {expandedId === report.id && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-white/5 bg-black/20"
              >
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                      <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Lokasi Kejadian</p>
                      <p className="text-white/90 font-medium">{report.location || '-'}</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                      <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Waktu Kejadian</p>
                      <p className="text-white/90 font-medium">{report.dateOccurred || '-'}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Kronologi Lengkap</p>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                      <p className="text-white/80 whitespace-pre-wrap text-sm leading-relaxed">{report.description}</p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleReadStatus(report.id, report.isRead); }}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      Tandai {report.isRead ? 'Belum Dibaca' : 'Sudah Dibaca'}
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); deleteReport(report.id); }}
                      className="px-4 py-2 bg-bahaya/10 hover:bg-bahaya/20 text-bahaya rounded-lg text-sm font-medium transition-colors border border-bahaya/20 hover:border-bahaya/40"
                    >
                      Hapus Laporan
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
