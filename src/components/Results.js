import React from 'react';
import { Heart, ArrowLeft, BarChart3, Shield, Target, AlertTriangle, Activity, Bell, Calendar, User, Zap } from 'lucide-react';

const Results = ({ formData, riskScore, setCurrentView, getRiskLevel }) => {
  const riskInfo = getRiskLevel(riskScore);
  const riskPercentage = Math.round(riskScore * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/80 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                  HealthPredict AI
                </h1>
                <p className="text-slate-400 text-sm">Risk Assessment Results</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => setCurrentView('questionnaire')}
                className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-teal-400 transition-colors duration-300"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Assessment
              </button>
              <button 
                onClick={() => setCurrentView('dashboard')}
                className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-teal-400 transition-colors duration-300"
              >
                <BarChart3 className="w-4 h-4" />
                Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Risk Score */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
            Your Health Risk Assessment
          </h2>
          <p className="text-xl text-slate-400">
            Based on your inputs, here's your personalized risk profile
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Gauge Card */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 text-center">
              <div className="mb-6">
                <div className="relative w-48 h-48 mx-auto">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#334155" strokeWidth="8" />
                    <circle
                      cx="50" cy="50" r="45" fill="none"
                      stroke={riskInfo.level === 'Low' ? '#10B981' : riskInfo.level === 'Moderate' ? '#F59E0B' : '#EF4444'}
                      strokeWidth="8" strokeDasharray={`${riskPercentage * 2.83} 283`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-4xl font-bold text-white mb-1">{riskPercentage}%</div>
                    <div className={`text-lg font-medium ${riskInfo.color}`}>{riskInfo.level} Risk</div>
                  </div>
                </div>
              </div>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${riskInfo.bg} ${riskInfo.color} font-medium`}>
                {riskInfo.level === 'Low' ? <Shield className="w-5 h-5" /> : 
                 riskInfo.level === 'Moderate' ? <Target className="w-5 h-5" /> : 
                 <AlertTriangle className="w-5 h-5" />}
                {riskInfo.level} Risk Level
              </div>
            </div>
          </div>

          {/* Risk Factor Analysis */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-6 text-teal-400">Risk Factor Analysis</h3>
              <div className="space-y-4">
                {[
                  { factor: 'Age', impact: formData.age > 50 ? 'High' : 'Low', value: `${formData.age} years`, color: formData.age > 50 ? 'red' : 'emerald' },
                  { factor: 'Diabetes', impact: formData.diabetes ? 'High' : 'None', value: formData.diabetes ? 'Present' : 'Not Present', color: formData.diabetes ? 'red' : 'emerald' },
                  { factor: 'Hypertension', impact: formData.hypertension ? 'Moderate' : 'None', value: formData.hypertension ? 'Present' : 'Not Present', color: formData.hypertension ? 'amber' : 'emerald' },
                  { factor: 'Smoking', impact: formData.smoking === 'current' ? 'High' : formData.smoking === 'former' ? 'Low' : 'None', value: formData.smoking, color: formData.smoking === 'current' ? 'red' : formData.smoking === 'former' ? 'amber' : 'emerald' },
                  { factor: 'Exercise', impact: formData.exercise < 3 ? 'Moderate' : 'Protective', value: `${formData.exercise} days/week`, color: formData.exercise < 3 ? 'amber' : 'emerald' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg flex items-center justify-center">
                        <Activity className="w-6 h-6 text-slate-300" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-200">{item.factor}</div>
                        <div className="text-slate-400 text-sm">{item.value}</div>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      item.color === 'red' ? 'bg-red-500/20 text-red-400' : 
                      item.color === 'amber' ? 'bg-amber-500/20 text-amber-400' : 
                      'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {item.impact}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
          <h3 className="text-2xl font-semibold mb-6 text-emerald-400">Personalized Recommendations</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {riskInfo.level !== 'Low' && (
              <>
                <div className="p-6 bg-gradient-to-br from-teal-500/10 to-emerald-600/10 border border-teal-500/20 rounded-xl">
                  <h4 className="font-semibold text-slate-200 mb-2">Cardiovascular Health</h4>
                  <p className="text-slate-400 text-sm">Focus on heart-healthy changes.</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-emerald-500/10 to-green-600/10 border border-emerald-500/20 rounded-xl">
                  <h4 className="font-semibold text-slate-200 mb-2">Lifestyle Optimization</h4>
                  <p className="text-slate-400 text-sm">Enhance habits to reduce risks.</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-amber-500/10 to-orange-600/10 border border-amber-500/20 rounded-xl">
                  <h4 className="font-semibold text-slate-200 mb-2">Preventive Care</h4>
                  <p className="text-slate-400 text-sm">Schedule regular check-ups.</p>
                </div>
              </>
            )}
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-xl border border-slate-600/50">
            <div className="flex items-center gap-4 mb-4">
              <Bell className="w-6 h-6 text-white" />
              <div>
                <h4 className="font-semibold text-slate-200">Next Steps</h4>
                <p className="text-slate-400 text-sm">Recommended actions based on risk</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <button className="flex items-center gap-3 p-4 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 rounded-lg transition">
                <Calendar className="w-5 h-5 text-teal-400" />
                Schedule Check-up
              </button>
              <button className="flex items-center gap-3 p-4 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg transition">
                <Zap className="w-5 h-5 text-emerald-400" />
                Start Health Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
