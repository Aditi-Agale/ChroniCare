// src/components/Questionnaire.js
import React from 'react';

const Questionnaire = ({ formData, setFormData, calculateRisk, isAnimating, setCurrentView }) => {
  
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (field, checked) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked
    }));
  };

  return (
    <div className="app-container">
      <div className="main-card">
        <div className="form-header">
          <h1>Health Assessment</h1>
          <p>Complete health deterioration risk evaluation</p>
        </div>
        
        <div className="form-content">
          {/* Static Information Section */}
          <div className="form-section">
            <div className="section-title">
              <div className="section-icon">1</div>
              Static Information
            </div>
            
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Age <span className="required">*</span></label>
                <div className="input-unit">
                  <input
                    type="number"
                    className="form-input"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    placeholder="Enter age"
                    min="1"
                    max="120"
                    required
                  />
                  <span className="unit-label">years</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Sex <span className="required">*</span></label>
                <select
                  className="form-select"
                  value={formData.sex}
                  onChange={(e) => handleInputChange('sex', e.target.value)}
                  required
                >
                  <option value="">Select sex</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Height <span className="required">*</span></label>
                <div className="input-unit">
                  <input
                    type="number"
                    className="form-input"
                    value={formData.height_cm}
                    onChange={(e) => handleInputChange('height_cm', e.target.value)}
                    placeholder="Enter height"
                    min="50"
                    max="250"
                    required
                  />
                  <span className="unit-label">cm</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Smoking Status</label>
                <select
                  className="form-select"
                  value={formData.smoking_status}
                  onChange={(e) => handleInputChange('smoking_status', e.target.value)}
                >
                  <option value="">Select status</option>
                  <option value="never">Never smoked</option>
                  <option value="former">Former smoker</option>
                  <option value="current">Current smoker</option>
                </select>
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '20px' }}>
              <label className="form-label">Comorbidities</label>
              <div className="checkbox-group">
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="diabetes"
                    checked={formData.comorbidity_Diabetes}
                    onChange={(e) => handleCheckboxChange('comorbidity_Diabetes', e.target.checked)}
                  />
                  <label htmlFor="diabetes">Diabetes</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="hypertension"
                    checked={formData.comorbidity_Hypertension}
                    onChange={(e) => handleCheckboxChange('comorbidity_Hypertension', e.target.checked)}
                  />
                  <label htmlFor="hypertension">Hypertension</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="chf"
                    checked={formData.comorbidity_CHF}
                    onChange={(e) => handleCheckboxChange('comorbidity_CHF', e.target.checked)}
                  />
                  <label htmlFor="chf">Congestive Heart Failure (CHF)</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="ckd"
                    checked={formData.comorbidity_CKD}
                    onChange={(e) => handleCheckboxChange('comorbidity_CKD', e.target.checked)}
                  />
                  <label htmlFor="ckd">Chronic Kidney Disease (CKD)</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="copd"
                    checked={formData.comorbidity_COPD}
                    onChange={(e) => handleCheckboxChange('comorbidity_COPD', e.target.checked)}
                  />
                  <label htmlFor="copd">COPD</label>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Information Section */}
          <div className="form-section">
            <div className="section-title">
              <div className="section-icon">2</div>
              Current Health Metrics
            </div>
            
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Weight <span className="required">*</span></label>
                <div className="input-unit">
                  <input
                    type="number"
                    className="form-input"
                    value={formData.weight_kg}
                    onChange={(e) => handleInputChange('weight_kg', e.target.value)}
                    placeholder="Enter weight"
                    min="20"
                    max="300"
                    step="0.1"
                    required
                  />
                  <span className="unit-label">kg</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Systolic BP</label>
                <div className="input-unit">
                  <input
                    type="number"
                    className="form-input"
                    value={formData.systolic_bp}
                    onChange={(e) => handleInputChange('systolic_bp', e.target.value)}
                    placeholder="120"
                    min="70"
                    max="250"
                  />
                  <span className="unit-label">mmHg</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Diastolic BP</label>
                <div className="input-unit">
                  <input
                    type="number"
                    className="form-input"
                    value={formData.diastolic_bp}
                    onChange={(e) => handleInputChange('diastolic_bp', e.target.value)}
                    placeholder="80"
                    min="40"
                    max="150"
                  />
                  <span className="unit-label">mmHg</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Heart Rate</label>
                <div className="input-unit">
                  <input
                    type="number"
                    className="form-input"
                    value={formData.heart_rate}
                    onChange={(e) => handleInputChange('heart_rate', e.target.value)}
                    placeholder="72"
                    min="30"
                    max="200"
                  />
                  <span className="unit-label">bpm</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Respiratory Rate</label>
                <div className="input-unit">
                  <input
                    type="number"
                    className="form-input"
                    value={formData.respiratory_rate}
                    onChange={(e) => handleInputChange('respiratory_rate', e.target.value)}
                    placeholder="16"
                    min="8"
                    max="40"
                  />
                  <span className="unit-label">breaths/min</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">SpO2</label>
                <div className="input-unit">
                  <input
                    type="number"
                    className="form-input"
                    value={formData.spo2}
                    onChange={(e) => handleInputChange('spo2', e.target.value)}
                    placeholder="98"
                    min="70"
                    max="100"
                  />
                  <span className="unit-label">%</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Body Temperature</label>
                <div className="input-unit">
                  <input
                    type="number"
                    className="form-input"
                    value={formData.body_temp_f}
                    onChange={(e) => handleInputChange('body_temp_f', e.target.value)}
                    placeholder="98.6"
                    min="90"
                    max="110"
                    step="0.1"
                  />
                  <span className="unit-label">°F</span>
                </div>
              </div>
            </div>
          </div>

          {/* Lab Values Section */}
          <div className="form-section">
            <div className="section-title">
              <div className="section-icon">3</div>
              Laboratory Values
            </div>
            
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Fasting Glucose</label>
                <div className="input-unit">
                  <input
                    type="number"
                    className="form-input"
                    value={formData.fasting_glucose}
                    onChange={(e) => handleInputChange('fasting_glucose', e.target.value)}
                    placeholder="100"
                    min="40"
                    max="400"
                  />
                  <span className="unit-label">mg/dL</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Random Glucose</label>
                <div className="input-unit">
                  <input
                    type="number"
                    className="form-input"
                    value={formData.random_glucose}
                    onChange={(e) => handleInputChange('random_glucose', e.target.value)}
                    placeholder="140"
                    min="40"
                    max="400"
                  />
                  <span className="unit-label">mg/dL</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">HbA1c</label>
                <div className="input-unit">
                  <input
                    type="number"
                    className="form-input"
                    value={formData.hba1c}
                    onChange={(e) => handleInputChange('hba1c', e.target.value)}
                    placeholder="5.7"
                    min="3"
                    max="15"
                    step="0.1"
                  />
                  <span className="unit-label">%</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Creatinine</label>
                <div className="input-unit">
                  <input
                    type="number"
                    className="form-input"
                    value={formData.creatinine}
                    onChange={(e) => handleInputChange('creatinine', e.target.value)}
                    placeholder="1.0"
                    min="0.3"
                    max="10"
                    step="0.1"
                  />
                  <span className="unit-label">mg/dL</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">eGFR</label>
                <div className="input-unit">
                  <input
                    type="number"
                    className="form-input"
                    value={formData.eGFR}
                    onChange={(e) => handleInputChange('eGFR', e.target.value)}
                    placeholder="90"
                    min="5"
                    max="150"
                  />
                  <span className="unit-label">mL/min/1.73m²</span>
                </div>
              </div>
            </div>
          </div>

          {/* Medication & Lifestyle Section */}
          <div className="form-section">
            <div className="section-title">
              <div className="section-icon">4</div>
              Medication & Lifestyle
            </div>
            
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Missed Doses (Last 7 days)</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.missed_doses_last_7d}
                  onChange={(e) => handleInputChange('missed_doses_last_7d', e.target.value)}
                  placeholder="0"
                  min="0"
                  max="50"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Refill Gap</label>
                <div className="input-unit">
                  <input
                    type="number"
                    className="form-input"
                    value={formData.refill_gap_days}
                    onChange={(e) => handleInputChange('refill_gap_days', e.target.value)}
                    placeholder="0"
                    min="0"
                    max="365"
                  />
                  <span className="unit-label">days</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Adherence Score</label>
                <div className="input-unit">
                  <input
                    type="number"
                    className="form-input"
                    value={formData.adherence_score}
                    onChange={(e) => handleInputChange('adherence_score', e.target.value)}
                    placeholder="0.85"
                    min="0"
                    max="1"
                    step="0.01"
                  />
                  <span className="unit-label">0-1</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Active Medication Classes</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.active_medication_classes}
                  onChange={(e) => handleInputChange('active_medication_classes', e.target.value)}
                  placeholder="3"
                  min="0"
                  max="20"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Daily Steps</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.steps_count}
                  onChange={(e) => handleInputChange('steps_count', e.target.value)}
                  placeholder="8000"
                  min="0"
                  max="50000"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Sleep Duration</label>
                <div className="input-unit">
                  <input
                    type="number"
                    className="form-input"
                    value={formData.sleep_duration}
                    onChange={(e) => handleInputChange('sleep_duration', e.target.value)}
                    placeholder="7.5"
                    min="0"
                    max="24"
                    step="0.5"
                  />
                  <span className="unit-label">hours</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Stress Level</label>
                <select
                  className="form-select"
                  value={formData.stress_level}
                  onChange={(e) => handleInputChange('stress_level', e.target.value)}
                >
                  <option value="">Select level</option>
                  <option value="1">Low (1)</option>
                  <option value="2">Mild (2)</option>
                  <option value="3">Moderate (3)</option>
                  <option value="4">High (4)</option>
                  <option value="5">Severe (5)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Weight Gain (3 days)</label>
                <div className="input-unit">
                  <input
                    type="number"
                    className="form-input"
                    value={formData.weight_gain_3d}
                    onChange={(e) => handleInputChange('weight_gain_3d', e.target.value)}
                    placeholder="0"
                    min="-10"
                    max="10"
                    step="0.1"
                  />
                  <span className="unit-label">kg</span>
                </div>
              </div>
            </div>
          </div>

          {/* Symptoms & Flags Section */}
          <div className="form-section">
            <div className="section-title">
              <div className="section-icon">5</div>
              Symptoms & Clinical Flags
            </div>
            
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Abnormal Flags Today</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.abnormal_flags_today}
                  onChange={(e) => handleInputChange('abnormal_flags_today', e.target.value)}
                  placeholder="0"
                  min="0"
                  max="20"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Recent Abnormal Count (7d)</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.recent_abnormal_count}
                  onChange={(e) => handleInputChange('recent_abnormal_count', e.target.value)}
                  placeholder="0"
                  min="0"
                  max="50"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Time Since Last HbA1c</label>
                <div className="input-unit">
                  <input
                    type="number"
                    className="form-input"
                    value={formData.time_since_last_hba1c}
                    onChange={(e) => handleInputChange('time_since_last_hba1c', e.target.value)}
                    placeholder="90"
                    min="0"
                    max="365"
                  />
                  <span className="unit-label">days</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Time Since Last Creatinine</label>
                <div className="input-unit">
                  <input
                    type="number"
                    className="form-input"
                    value={formData.time_since_last_creatinine}
                    onChange={(e) => handleInputChange('time_since_last_creatinine', e.target.value)}
                    placeholder="30"
                    min="0"
                    max="365"
                  />
                  <span className="unit-label">days</span>
                </div>
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '20px' }}>
              <label className="form-label">Current Symptoms</label>
              <div className="checkbox-group">
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="dyspnea"
                    checked={formData.dyspnea}
                    onChange={(e) => handleCheckboxChange('dyspnea', e.target.checked)}
                  />
                  <label htmlFor="dyspnea">Shortness of Breath (Dyspnea)</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="chest_pain"
                    checked={formData.chest_pain}
                    onChange={(e) => handleCheckboxChange('chest_pain', e.target.checked)}
                  />
                  <label htmlFor="chest_pain">Chest Pain</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="edema"
                    checked={formData.edema}
                    onChange={(e) => handleCheckboxChange('edema', e.target.checked)}
                  />
                  <label htmlFor="edema">Swelling (Edema)</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="severe_trigger"
                    checked={formData.severe_trigger}
                    onChange={(e) => handleCheckboxChange('severe_trigger', e.target.checked)}
                  />
                  <label htmlFor="severe_trigger">Severe Trigger Event</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="care_team_contact"
                    checked={formData.care_team_contact_flag_last_14d}
                    onChange={(e) => handleCheckboxChange('care_team_contact_flag_last_14d', e.target.checked)}
                  />
                  <label htmlFor="care_team_contact">Care Team Contact (Last 14 days)</label>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="button-group">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setCurrentView('dashboard')}
            >
              View Dashboard
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={calculateRisk}
              disabled={isAnimating || !formData.age || !formData.sex || !formData.height_cm || !formData.weight_kg}
            >
              {isAnimating ? (
                <>
                  <div className="loading-spinner"></div>
                  Analyzing...
                </>
              ) : (
                'Calculate Risk'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;