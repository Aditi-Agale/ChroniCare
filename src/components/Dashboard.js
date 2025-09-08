import React from 'react';
import { Users, AlertTriangle, Target, TrendingUp, Search, Filter, Heart, User, X, Activity, Zap } from 'lucide-react';
import { ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import PatientCard from './PatientCard';

const Dashboard = ({ dashboardView, setDashboardView, patientData, riskDistribution, selectedPatient, setSelectedPatient, getRiskLevel, timelineData, setCurrentView }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/80 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">HealthPredict AI</h1>
              <p className="text-slate-400 text-sm">Clinical Dashboard</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setCurrentView('questionnaire')} className="px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-lg font-medium">New Assessment</button>
          </div>
        </div>
      </div>

      {dashboardView === 'cohort' ? (
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Stats */}
          <div className="grid lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-slate-800/30 p-6 rounded-xl">Total Patients: <span className="text-emerald-400 font-bold">127</span></div>
            <div className="bg-slate-800/30 p-6 rounded-xl">High Risk: <span className="text-red-400 font-bold">23</span></div>
            <div className="bg-slate-800/30 p-6 rounded-xl">Moderate Risk: <span className="text-amber-400 font-bold">45</span></div>
            <div className="bg-slate-800/30 p-6 rounded-xl">Prediction Accuracy: <span className="text-teal-400 font-bold">87%</span></div>
          </div>

          {/* Risk Distribution */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-slate-800/30 p-6 rounded-xl">
              <h3 className="text-xl mb-4">Risk Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie data={riskDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value">
                      {riskDistribution.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Patient List */}
            <div className="lg:col-span-2 bg-slate-800/30 p-6 rounded-xl">
              <h3 className="text-xl mb-6">Recent Patients</h3>
              <div className="space-y-4">
                {patientData.map((p) => (
                  <PatientCard key={p.id} patient={p} onClick={() => { setSelectedPatient(p); setDashboardView('patient'); }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Patient Detail
        <div className="max-w-7xl mx-auto px-6 py-8">
          {selectedPatient ? (
            <div className="bg-slate-800/30 p-6 rounded-xl">
              <h2 className="text-xl mb-4">{selectedPatient.name} (Age {selectedPatient.age})</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="bp" stroke="#06b6d4" />
                  <Line type="monotone" dataKey="glucose" stroke="#10b981" />
                  <Line type="monotone" dataKey="risk" stroke="#ef4444" />
                </LineChart>
              </ResponsiveContainer>
              <button onClick={() => setDashboardView('cohort')} className="mt-4 px-4 py-2 bg-red-500 rounded">Back</button>
            </div>
          ) : <p>No patient selected</p>}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
