import React from 'react';
import { ChevronRight, TrendingUp } from 'lucide-react';

const getRiskLevel = (score) => {
  if (score < 0.25) return { level: 'Low', color: 'text-emerald-400', bg: 'bg-emerald-500/20' };
  if (score < 0.5) return { level: 'Moderate', color: 'text-amber-400', bg: 'bg-amber-500/20' };
  if (score < 0.75) return { level: 'High', color: 'text-red-400', bg: 'bg-red-500/20' };
  return { level: 'Critical', color: 'text-red-500', bg: 'bg-red-500/30' };
};

const PatientCard = ({ patient, onClick }) => {
  const riskInfo = getRiskLevel(patient.risk);
  return (
    <div 
      onClick={() => onClick(patient)}
      className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:bg-slate-700/50 transition cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-slate-200 font-semibold text-lg">{patient.name}</h3>
          <p className="text-slate-400">Age: {patient.age}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${riskInfo.bg} ${riskInfo.color}`}>
          {riskInfo.level}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-2xl font-bold text-teal-400">{Math.round(patient.risk * 100)}%</div>
          <div className={`flex items-center gap-1 ${patient.trend === 'increasing' ? 'text-red-400' : patient.trend === 'decreasing' ? 'text-emerald-400' : 'text-amber-400'}`}>
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm capitalize">{patient.trend}</span>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-400" />
      </div>
    </div>
  );
};

export default PatientCard;
