import React, { useState } from 'react';
import Questionnaire from './Questionnaire';
import Results from './Results';
import Dashboard from './Dashboard';

const HealthcarePredictionPlatform = () => {
  const [currentView, setCurrentView] = useState('questionnaire'); // questionnaire, results, dashboard
  const [dashboardView, setDashboardView] = useState('cohort'); // cohort, patient
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
        />
      )}

      {currentView === 'dashboard' && (
        <Dashboard 
          dashboardView={dashboardView} 
          setDashboardView={setDashboardView} 
          selectedPatient={selectedPatient} 
          setSelectedPatient={setSelectedPatient}
          setCurrentView={setCurrentView}
        />
      )}
    </>
  );
};

export default HealthcarePredictionPlatform;
