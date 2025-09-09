// src/components/Results.js
import React from 'react';

const Results = ({ formData, riskScore, derivedValues, setCurrentView, getRiskLevel }) => {
  const riskInfo = getRiskLevel(riskScore);
  
  // Pie chart data for 42% deterioration probability
  const pieData = [
    { name: 'Deterioration Risk', value: 42, color: '#ef4444' },
    { name: 'Stable', value: 58, color: '#10b981' }
  ];

  // Simple SVG Pie Chart Component
  const PieChart = ({ data, size = 200 }) => {
    let cumulativePercentage = 0;
    
    return (
      <div className="chart-container">
        <div style={{ textAlign: 'center' }}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <circle
              cx={size/2}
              cy={size/2}
              r={size/2 - 20}
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="2"
            />
            {data.map((entry, index) => {
              const startAngle = cumulativePercentage * 360;
              const endAngle = (cumulativePercentage + entry.value / 100) * 360;
              const x1 = size/2 + (size/2 - 20) * Math.cos((startAngle - 90) * Math.PI / 180);
              const y1 = size/2 + (size/2 - 20) * Math.sin((startAngle - 90) * Math.PI / 180);
              const x2 = size/2 + (size/2 - 20) * Math.cos((endAngle - 90) * Math.PI / 180);
              const y2 = size/2 + (size/2 - 20) * Math.sin((endAngle - 90) * Math.PI / 180);
              
              const largeArc = entry.value > 50 ? 1 : 0;
              const pathData = `M ${size/2} ${size/2} L ${x1} ${y1} A ${size/2 - 20} ${size/2 - 20} 0 ${largeArc} 1 ${x2} ${y2} Z`;
              
              cumulativePercentage += entry.value / 100;
              
              return (
                <path
                  key={index}
                  d={pathData}
                  fill={entry.color}
                  stroke="white"
                  strokeWidth="2"
                />
              );
            })}
            {/* Center text */}
            <text
              x={size/2}
              y={size/2 - 10}
              textAnchor="middle"
              fontSize="24"
              fontWeight="bold"
              fill="#1f2937"
            >
              42%
            </text>
            <text
              x={size/2}
              y={size/2 + 15}
              textAnchor="middle"
              fontSize="12"
              fill="#6b7280"
            >
              Risk Score
            </text>
          </svg>
          
          {/* Legend */}
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            {data.map((entry, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '16px',
                    height: '16px',
                    backgroundColor: entry.color,
                    borderRadius: '4px'
                  }}
                />
                <span style={{ fontSize: '14px', color: '#6b7280' }}>
                  {entry.name}: {entry.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="app-container">
      <div className="main-card">
        <div className="form-header">
          <h1>Health Risk Assessment Results</h1>
          <p>Comprehensive analysis of your health deterioration risk</p>
        </div>
        
        <div className="results-container">
          {/* Main Risk Score Display */}
          <div className="risk-score-display">
            <div>
              <div className="risk-percentage">42%</div>
              <div className="risk-label">Deterioration Probability</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className={`inline-block px-4 py-2 rounded-full ${riskInfo.bg}`}>
                <span className={`font-semibold ${riskInfo.color}`}>
                  {riskInfo.level} Risk
                </span>
              </div>
            </div>
          </div>

          {/* Pie Chart Visualization */}
          <PieChart data={pieData} size={250} />

          {/* Derived Values Section */}
          <div style={{ marginTop: '40px' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '600', color: '#1f2937', marginBottom: '24px', textAlign: 'center' }}>
              Calculated Health Metrics
            </h2>
            
            <div className="derived-values">
              {/* BMI */}
              {derivedValues.bmi && (
                <div className="derived-item">
                  <h3>Body Mass Index</h3>
                  <div className="value">{derivedValues.bmi}</div>
                  <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '4px' }}>
                    kg/m²
                  </div>
                </div>
              )}

              {/* Charlson Comorbidity Index */}
              <div className="derived-item">
                <h3>Charlson Comorbidity Index</h3>
                <div className="value">{derivedValues.charlson_comorbidity_index || 0}</div>
                <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '4px' }}>
                  Comorbidity Score
                </div>
              </div>

              {/* Fever Status */}
              {formData.body_temp_f && (
                <div className="derived-item">
                  <h3>Fever Status</h3>
                  <div className="value" style={{ color: derivedValues.fever ? '#ef4444' : '#10b981' }}>
                    {derivedValues.fever ? 'Present' : 'Absent'}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '4px' }}>
                    {formData.body_temp_f}°F
                  </div>
                </div>
              )}

              {/* Risk Score Raw */}
              <div className="derived-item">
                <h3>Raw Risk Score</h3>
                <div className="value">{derivedValues.risk_score_raw}</div>
                <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '4px' }}>
                  0.0 - 1.0 scale
                </div>
              </div>

              {/* eGFR if available */}
              {formData.eGFR && (
                <div className="derived-item">
                  <h3>eGFR</h3>
                  <div className="value">{formData.eGFR}</div>
                  <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '4px' }}>
                    mL/min/1.73m²
                  </div>
                </div>
              )}

              {/* Weight Status */}
              {formData.weight_gain_3d && (
                <div className="derived-item">
                  <h3>3-Day Weight Change</h3>
                  <div className="value" style={{ 
                    color: parseFloat(formData.weight_gain_3d) > 2 ? '#ef4444' : '#10b981' 
                  }}>
                    {formData.weight_gain_3d > 0 ? '+' : ''}{formData.weight_gain_3d}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '4px' }}>
                    kg change
                  </div>
                </div>
              )}

              {/* Adherence Score */}
              {formData.adherence_score && (
                <div className="derived-item">
                  <h3>Medication Adherence</h3>
                  <div className="value" style={{ 
                    color: parseFloat(formData.adherence_score) >= 0.8 ? '#10b981' : '#ef4444' 
                  }}>
                    {(parseFloat(formData.adherence_score) * 100).toFixed(0)}%
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '4px' }}>
                    Adherence Rate
                  </div>
                </div>
              )}

              {/* Abnormal Flags */}
              {formData.abnormal_flags_today && (
                <div className="derived-item">
                  <h3>Daily Abnormal Flags</h3>
                  <div className="value" style={{ 
                    color: parseInt(formData.abnormal_flags_today) > 3 ? '#ef4444' : '#10b981' 
                  }}>
                    {formData.abnormal_flags_today}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '4px' }}>
                    Flags Today
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Risk Factors Breakdown */}
          <div style={{ marginTop: '40px' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '600', color: '#1f2937', marginBottom: '24px', textAlign: 'center' }}>
              Risk Factor Analysis
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {/* Demographics */}
              <div style={{ 
                padding: '24px', 
                background: 'white', 
                borderRadius: '12px', 
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#374151', marginBottom: '16px' }}>
                  Demographics
                </h3>
                <div style={{ display: 'grid', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6b7280' }}>Age:</span>
                    <span style={{ fontWeight: '500' }}>{formData.age} years</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6b7280' }}>Sex:</span>
                    <span style={{ fontWeight: '500', textTransform: 'capitalize' }}>{formData.sex}</span>
                  </div>
                  {derivedValues.bmi && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#6b7280' }}>BMI:</span>
                      <span style={{ 
                        fontWeight: '500',
                        color: derivedValues.bmi >= 30 ? '#ef4444' : derivedValues.bmi >= 25 ? '#f59e0b' : '#10b981'
                      }}>
                        {derivedValues.bmi} kg/m²
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Comorbidities */}
              <div style={{ 
                padding: '24px', 
                background: 'white', 
                borderRadius: '12px', 
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#374151', marginBottom: '16px' }}>
                  Comorbidities
                </h3>
                <div style={{ display: 'grid', gap: '8px' }}>
                  {[
                    { key: 'comorbidity_Diabetes', label: 'Diabetes' },
                    { key: 'comorbidity_Hypertension', label: 'Hypertension' },
                    { key: 'comorbidity_CHF', label: 'Heart Failure' },
                    { key: 'comorbidity_CKD', label: 'Kidney Disease' },
                    { key: 'comorbidity_COPD', label: 'COPD' }
                  ].map(condition => (
                    <div key={condition.key} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px',
                      padding: '4px 0'
                    }}>
                      <div style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: formData[condition.key] ? '#ef4444' : '#10b981'
                      }} />
                      <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                        {condition.label}
                      </span>
                      <span style={{ 
                        marginLeft: 'auto',
                        fontSize: '0.8rem',
                        fontWeight: '500',
                        color: formData[condition.key] ? '#ef4444' : '#10b981'
                      }}>
                        {formData[condition.key] ? 'Present' : 'Absent'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Current Symptoms */}
              <div style={{ 
                padding: '24px', 
                background: 'white', 
                borderRadius: '12px', 
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#374151', marginBottom: '16px' }}>
                  Current Symptoms
                </h3>
                <div style={{ display: 'grid', gap: '8px' }}>
                  {[
                    { key: 'dyspnea', label: 'Shortness of Breath' },
                    { key: 'chest_pain', label: 'Chest Pain' },
                    { key: 'edema', label: 'Swelling' },
                    { key: 'severe_trigger', label: 'Severe Trigger Event' }
                  ].map(symptom => (
                    <div key={symptom.key} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px',
                      padding: '4px 0'
                    }}>
                      <div style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: formData[symptom.key] ? '#ef4444' : '#10b981'
                      }} />
                      <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                        {symptom.label}
                      </span>
                      <span style={{ 
                        marginLeft: 'auto',
                        fontSize: '0.8rem',
                        fontWeight: '500',
                        color: formData[symptom.key] ? '#ef4444' : '#10b981'
                      }}>
                        {formData[symptom.key] ? 'Present' : 'Absent'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vital Signs Summary */}
              <div style={{ 
                padding: '24px', 
                background: 'white', 
                borderRadius: '12px', 
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#374151', marginBottom: '16px' }}>
                  Vital Signs
                </h3>
                <div style={{ display: 'grid', gap: '12px' }}>
                  {formData.systolic_bp && formData.diastolic_bp && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#6b7280' }}>Blood Pressure:</span>
                      <span style={{ 
                        fontWeight: '500',
                        color: (parseInt(formData.systolic_bp) > 140 || parseInt(formData.diastolic_bp) > 90) ? '#ef4444' : '#10b981'
                      }}>
                        {formData.systolic_bp}/{formData.diastolic_bp} mmHg
                      </span>
                    </div>
                  )}
                  {formData.heart_rate && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#6b7280' }}>Heart Rate:</span>
                      <span style={{ 
                        fontWeight: '500',
                        color: (parseInt(formData.heart_rate) > 100 || parseInt(formData.heart_rate) < 60) ? '#f59e0b' : '#10b981'
                      }}>
                        {formData.heart_rate} bpm
                      </span>
                    </div>
                  )}
                  {formData.spo2 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#6b7280' }}>SpO2:</span>
                      <span style={{ 
                        fontWeight: '500',
                        color: parseInt(formData.spo2) < 95 ? '#ef4444' : '#10b981'
                      }}>
                        {formData.spo2}%
                      </span>
                    </div>
                  )}
                  {formData.body_temp_f && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#6b7280' }}>Temperature:</span>
                      <span style={{ 
                        fontWeight: '500',
                        color: parseFloat(formData.body_temp_f) > 100.4 ? '#ef4444' : '#10b981'
                      }}>
                        {formData.body_temp_f}°F
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div style={{ 
            marginTop: '40px', 
            padding: '24px', 
            background: 'linear-gradient(135deg, #f3f4f6 0%, #ffffff 100%)', 
            borderRadius: '16px',
            border: '1px solid #e5e7eb'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '600', color: '#1f2937', marginBottom: '16px', textAlign: 'center' }}>
              Clinical Recommendations
            </h2>
            
            <div style={{ display: 'grid', gap: '16px', maxWidth: '800px', margin: '0 auto' }}>
              {riskScore >= 0.4 && (
                <div style={{ 
                  padding: '16px', 
                  background: '#fef2f2', 
                  borderRadius: '8px', 
                  borderLeft: '4px solid #ef4444' 
                }}>
                  <strong style={{ color: '#dc2626' }}>High Risk Alert:</strong>
                  <p style={{ margin: '4px 0', color: '#7f1d1d' }}>
                    Immediate clinical evaluation recommended. Consider frequent monitoring and care plan optimization.
                  </p>
                </div>
              )}
              
              {derivedValues.charlson_comorbidity_index > 3 && (
                <div style={{ 
                  padding: '16px', 
                  background: '#fffbeb', 
                  borderRadius: '8px', 
                  borderLeft: '4px solid #f59e0b' 
                }}>
                  <strong style={{ color: '#d97706' }}>Multiple Comorbidities:</strong>
                  <p style={{ margin: '4px 0', color: '#92400e' }}>
                    High comorbidity burden detected. Coordinate care across specialties and optimize medication management.
                  </p>
                </div>
              )}
              
              {formData.adherence_score && parseFloat(formData.adherence_score) < 0.8 && (
                <div style={{ 
                  padding: '16px', 
                  background: '#eff6ff', 
                  borderRadius: '8px', 
                  borderLeft: '4px solid #3b82f6' 
                }}>
                  <strong style={{ color: '#1d4ed8' }}>Medication Adherence:</strong>
                  <p style={{ margin: '4px 0', color: '#1e40af' }}>
                    Suboptimal adherence detected. Consider adherence counseling and medication synchronization.
                  </p>
                </div>
              )}
              
              <div style={{ 
                padding: '16px', 
                background: '#f0fdf4', 
                borderRadius: '8px', 
                borderLeft: '4px solid #10b981' 
              }}>
                <strong style={{ color: '#059669' }}>Next Steps:</strong>
                <p style={{ margin: '4px 0', color: '#065f46' }}>
                  Schedule follow-up appointment within 2-4 weeks. Continue current monitoring protocols and lifestyle interventions.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="button-group">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setCurrentView('questionnaire')}
            >
              New Assessment
            </button>
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
              onClick={() => window.print()}
            >
              Print Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;