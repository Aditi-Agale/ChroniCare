// src/App.js
import React, { useState } from 'react';
import Questionnaire from './components/Questionnaire';
import Results from './components/Results';
import Dashboard from './components/Dashboard';

const App = () => {
  const [currentView, setCurrentView] = useState('questionnaire'); // questionnaire | results | dashboard
  const [dashboardView, setDashboardView] = useState('cohort');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [formData, setFormData] = useState({
    age: 45,
    sex: 'female',
    weight: 70,
    height: 165,
    diabetes: false,
    hypertension: true,
    smoking: 'never',
    alcohol: 'moderate',
    exercise: 3,
    sleep: 7,
  });
  const [riskScore, setRiskScore] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Sample patient & chart data
  const patientData = [
    { id: 1, name: 'Sarah Chen', age: 54, risk: 0.75, status: 'high', lastVisit: '2024-09-01', trend: 'increasing' },
    { id: 2, name: 'Michael Rodriguez', age: 42, risk: 0.35, status: 'moderate', lastVisit: '2024-09-03', trend: 'stable' },
    { id: 3, name: 'Emma Thompson', age: 67, risk: 0.85, status: 'critical', lastVisit: '2024-08-28', trend: 'increasing' },
    { id: 4, name: 'David Park', age: 38, risk: 0.15, status: 'low', lastVisit: '2024-09-05', trend: 'decreasing' },
    { id: 5, name: 'Lisa Anderson', age: 51, risk: 0.62, status: 'high', lastVisit: '2024-09-02', trend: 'stable' }
  ];

  const timelineData = [
    { date: 'Jan 2024', bp: 140, glucose: 95, weight: 72, risk: 0.45 },
    { date: 'Feb 2024', bp: 145, glucose: 98, weight: 73, risk: 0.52 },
    { date: 'Mar 2024', bp: 142, glucose: 102, weight: 74, risk: 0.58 },
    { date: 'Apr 2024', bp: 148, glucose: 105, weight: 75, risk: 0.65 },
    { date: 'May 2024', bp: 152, glucose: 108, weight: 76, risk: 0.72 },
    { date: 'Jun 2024', bp: 155, glucose: 112, weight: 77, risk: 0.75 }
  ];

  const riskDistribution = [
    { name: 'Low Risk', value: 25, color: '#10B981' },
    { name: 'Moderate Risk', value: 35, color: '#F59E0B' },
    { name: 'High Risk', value: 30, color: '#EF4444' },
    { name: 'Critical Risk', value: 10, color: '#DC2626' }
  ];

  // Demo risk calculation
  const calculateRisk = () => {
    setIsAnimating(true);
    setTimeout(() => {
      let risk = 0.2;
      risk += formData.age > 50 ? 0.2 : 0;
      risk += formData.diabetes ? 0.25 : 0;
      risk += formData.hypertension ? 0.15 : 0;
      risk += formData.smoking === 'current' ? 0.3 : formData.smoking === 'former' ? 0.1 : 0;
      risk += formData.exercise < 3 ? 0.15 : 0;
      risk = Math.min(risk, 1);
      setRiskScore(risk);
      setCurrentView('results');
      setIsAnimating(false);
    }, 2000);
  };

  const getRiskLevel = (score) => {
    if (score < 0.25) return { level: 'Low', color: 'text-emerald-400', bg: 'bg-emerald-500/20' };
    if (score < 0.5) return { level: 'Moderate', color: 'text-amber-400', bg: 'bg-amber-500/20' };
    if (score < 0.75) return { level: 'High', color: 'text-red-400', bg: 'bg-red-500/20' };
    return { level: 'Critical', color: 'text-red-500', bg: 'bg-red-500/30' };
  };

  // Conditional rendering
  return (
    <>
      {currentView === 'questionnaire' && (
        <Questionnaire
          formData={formData}
          setFormData={setFormData}
          calculateRisk={calculateRisk}
          isAnimating={isAnimating}
          setCurrentView={setCurrentView}
        />
      )}

      {currentView === 'results' && (
        <Results
          formData={formData}
          riskScore={riskScore}
          setCurrentView={setCurrentView}
          getRiskLevel={getRiskLevel}
        />
      )}

      {currentView === 'dashboard' && (
        <Dashboard
          dashboardView={dashboardView}
          setDashboardView={setDashboardView}
          patientData={patientData}
          riskDistribution={riskDistribution}
          selectedPatient={selectedPatient}
          setSelectedPatient={setSelectedPatient}
          getRiskLevel={getRiskLevel}
          timelineData={timelineData}
          setCurrentView={setCurrentView}
        />
      )}
    </>
  );
};

export default App;
