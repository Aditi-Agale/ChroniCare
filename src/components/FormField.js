import React from 'react';
import { Info } from 'lucide-react';

const FormField = ({ label, children, tooltip }) => (
  <div className="mb-6">
    <div className="flex items-center gap-2 mb-3">
      <label className="text-slate-200 font-medium">{label}</label>
      {tooltip && (
        <div className="group relative">
          <Info className="w-4 h-4 text-slate-400 cursor-help" />
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 text-slate-200 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
            {tooltip}
          </div>
        </div>
      )}
    </div>
    {children}
  </div>
);

export default FormField;
