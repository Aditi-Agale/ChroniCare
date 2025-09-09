// src/App.js
import React, { useState } from 'react';
import Questionnaire from './components/Questionnaire';
import Results from './components/Results';
import Dashboard from './components/Dashboard';

const App = () => {
  const [currentView, setCurrentView] = useState('questionnaire'); // questionnaire | results | dashboard
  const [dashboardView, setDashboardView] = useState('cohort');
  const [selectedPatient, setSelectedPatient] = useState(null);
  
  // Comprehensive form data with all static and dynamic inputs
  const [formData, setFormData] = useState({
    // Static inputs
    age: '',
    sex: '',
    height_cm: '',
    comorbidity_Diabetes: false,
    comorbidity_Hypertension: false,
    comorbidity_CHF: false,
    comorbidity_CKD: false,
    comorbidity_COPD: false,
    smoking_status: '',
    
    // Dynamic inputs
    weight_kg: '',
    systolic_bp: '',
    diastolic_bp: '',
    heart_rate: '',
    respiratory_rate: '',
    spo2: '',
    body_temp_f: '',
    fasting_glucose: '',
    random_glucose: '',
    hba1c: '',
    creatinine: '',
    eGFR: '',
    missed_doses_last_7d: '',
    refill_gap_days: '',
    adherence_score: '',
    active_medication_classes: '',
    steps_count: '',
    sleep_duration: '',
    stress_level: '',
    dyspnea: false,
    chest_pain: false,
    edema: false,
    weight_gain_3d: '',
    abnormal_flags_today: '',
    recent_abnormal_count: '',
    severe_trigger: false,
    care_team_contact_flag_last_14d: false,
    time_since_last_hba1c: '',
    time_since_last_creatinine: ''
  });
  
  const [riskScore, setRiskScore] = useState(null);
  const [derivedValues, setDerivedValues] = useState({});
  const [isAnimating, setIsAnimating] = useState(false);

  // Sample patient & chart data (keeping existing data for dashboard)
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

  // Calculate derived values
  const calculateDerivedValues = (data) => {
    const derived = {};
    
    // BMI calculation
    if (data.weight_kg && data.height_cm) {
      const heightM = parseFloat(data.height_cm) / 100;
      derived.bmi = (parseFloat(data.weight_kg) / (heightM * heightM)).toFixed(1);
    }
    
    // Charlson Comorbidity Index (simplified calculation)
    let charlsonIndex = 0;
    if (data.comorbidity_Diabetes) charlsonIndex += 1;
    if (data.comorbidity_Hypertension) charlsonIndex += 1;
    if (data.comorbidity_CHF) charlsonIndex += 2;
    if (data.comorbidity_CKD) charlsonIndex += 2;
    if (data.comorbidity_COPD) charlsonIndex += 1;
    derived.charlson_comorbidity_index = charlsonIndex;
    
    // Fever flag (assuming temp > 100.4°F is fever)
    if (data.body_temp_f) {
      derived.fever = parseFloat(data.body_temp_f) > 100.4;
    }
    
    // Risk score calculation (simplified for demo)
    let riskScore = 0.1; // Base risk
    
    // Age factor
    if (data.age) {
      const age = parseInt(data.age);
      if (age > 65) riskScore += 0.3;
      else if (age > 50) riskScore += 0.2;
      else if (age > 35) riskScore += 0.1;
    }
    
    // Comorbidity factors
    if (data.comorbidity_Diabetes) riskScore += 0.25;
    if (data.comorbidity_Hypertension) riskScore += 0.15;
    if (data.comorbidity_CHF) riskScore += 0.35;
    if (data.comorbidity_CKD) riskScore += 0.3;
    if (data.comorbidity_COPD) riskScore += 0.2;
    
    // Vital signs factors
    if (data.systolic_bp && parseInt(data.systolic_bp) > 140) riskScore += 0.1;
    if (data.heart_rate && parseInt(data.heart_rate) > 100) riskScore += 0.05;
    if (data.spo2 && parseInt(data.spo2) < 95) riskScore += 0.2;
    
    // Lab values factors
    if (data.hba1c && parseFloat(data.hba1c) > 7) riskScore += 0.15;
    if (data.creatinine && parseFloat(data.creatinine) > 1.5) riskScore += 0.1;
    
    // Lifestyle factors
    if (data.smoking_status === 'current') riskScore += 0.25;
    else if (data.smoking_status === 'former') riskScore += 0.1;
    
    if (data.adherence_score && parseFloat(data.adherence_score) < 0.8) riskScore += 0.1;
    
    // Symptoms
    if (data.dyspnea) riskScore += 0.15;
    if (data.chest_pain) riskScore += 0.1;
    if (data.edema) riskScore += 0.1;
    if (data.severe_trigger) riskScore += 0.2;
    
    // Cap at 1.0
    derived.risk_score_raw = Math.min(riskScore, 1.0).toFixed(3);
    
    // Deterioration probability (hardcoded to 42% as requested)
    derived.deterioration_probability = 0.42;
    derived.deterioration_probability_percentage = 42;
    
    return derived;
  };

  // Process form and calculate results
  const calculateRisk = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const derived = calculateDerivedValues(formData);
      setDerivedValues(derived);
      setRiskScore(derived.deterioration_probability);
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
          derivedValues={derivedValues}
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