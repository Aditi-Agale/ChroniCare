import React from 'react';
import { Heart, BarChart3, Brain, ArrowRight, CheckCircle } from 'lucide-react';
import FormField from './FormField';

const Questionnaire = ({ formData, setFormData, calculateRisk, isAnimating, setCurrentView }) => {
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
                <p className="text-slate-400 text-sm">Advanced Health Risk Assessment</p>
              </div>
            </div>
            <nav className="flex gap-6">
              <button 
                onClick={() => setCurrentView('dashboard')}
                className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-teal-400 transition-colors duration-300"
              >
                <BarChart3 className="w-4 h-4" />
                Dashboard
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Questionnaire */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
            Health Risk Assessment
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Complete this comprehensive assessment to receive your personalized health deterioration risk profile and actionable insights.
          </p>
        </div>

        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Demographics */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-teal-400 border-b border-teal-500/30 pb-2">Demographics</h3>

              {/* Age */}
              <FormField label="Age" tooltip="Current age in years">
                <div className="relative">
                  <input
                    type="range"
                    min="18"
                    max="100"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: parseInt(e.target.value)})}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-slate-400 mt-1">
                    <span>18</span>
                    <span className="text-teal-400 font-medium">{formData.age} years</span>
                    <span>100</span>
                  </div>
                </div>
              </FormField>

              {/* Sex */}
              <FormField label="Sex" tooltip="Biological sex at birth">
                <div className="flex gap-4">
                  {['female', 'male'].map(sex => (
                    <button
                      key={sex}
                      onClick={() => setFormData({...formData, sex})}
                      className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all duration-300 ${
                        formData.sex === sex 
                          ? 'border-teal-500 bg-teal-500/20 text-teal-400' 
                          : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      {sex.charAt(0).toUpperCase() + sex.slice(1)}
                    </button>
                  ))}
                </div>
              </FormField>

              {/* Weight + Height */}
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Weight (kg)" tooltip="Current body weight">
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({...formData, weight: parseInt(e.target.value)})}
                    className="w-full py-3 px-4 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all duration-300"
                  />
                </FormField>
                <FormField label="Height (cm)" tooltip="Current height in centimeters">
                  <input
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData({...formData, height: parseInt(e.target.value)})}
                    className="w-full py-3 px-4 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all duration-300"
                  />
                </FormField>
              </div>
            </div>

            {/* Medical History */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-amber-400 border-b border-amber-500/30 pb-2">Medical History</h3>

              {/* Diabetes */}
              <FormField label="Diabetes" tooltip="Do you have type 1 or type 2 diabetes?">
                <button
                  onClick={() => setFormData({...formData, diabetes: !formData.diabetes})}
                  className={`flex items-center justify-between w-full py-3 px-4 rounded-lg border-2 transition-all duration-300 ${
                    formData.diabetes 
                      ? 'border-red-500 bg-red-500/20 text-red-400' 
                      : 'border-slate-600 bg-slate-700/50 text-slate-300'
                  }`}
                >
                  <span>Diabetes</span>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    formData.diabetes ? 'border-red-500 bg-red-500' : 'border-slate-500'
                  }`}>
                    {formData.diabetes && <CheckCircle className="w-4 h-4 text-white" />}
                  </div>
                </button>
              </FormField>

              {/* Hypertension */}
              <FormField label="Hypertension" tooltip="Do you have high blood pressure?">
                <button
                  onClick={() => setFormData({...formData, hypertension: !formData.hypertension})}
                  className={`flex items-center justify-between w-full py-3 px-4 rounded-lg border-2 transition-all duration-300 ${
                    formData.hypertension 
                      ? 'border-red-500 bg-red-500/20 text-red-400' 
                      : 'border-slate-600 bg-slate-700/50 text-slate-300'
                  }`}
                >
                  <span>Hypertension</span>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    formData.hypertension ? 'border-red-500 bg-red-500' : 'border-slate-500'
                  }`}>
                    {formData.hypertension && <CheckCircle className="w-4 h-4 text-white" />}
                  </div>
                </button>
              </FormField>
            </div>
          </div>

          {/* Lifestyle */}
          <div className="mt-8 pt-8 border-t border-slate-700/50">
            <h3 className="text-xl font-semibold text-emerald-400 border-b border-emerald-500/30 pb-2 mb-6">Lifestyle Factors</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Exercise */}
              <FormField label="Exercise (days/week)" tooltip="How many days per week do you exercise?">
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="7"
                    value={formData.exercise}
                    onChange={(e) => setFormData({...formData, exercise: parseInt(e.target.value)})}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-slate-400 mt-1">
                    <span>0</span>
                    <span className="text-emerald-400 font-medium">{formData.exercise} days</span>
                    <span>7</span>
                  </div>
                </div>
              </FormField>

              {/* Sleep */}
              <FormField label="Sleep (hours/night)" tooltip="Average hours of sleep per night">
                <div className="relative">
                  <input
                    type="range"
                    min="4"
                    max="12"
                    value={formData.sleep}
                    onChange={(e) => setFormData({...formData, sleep: parseInt(e.target.value)})}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-slate-400 mt-1">
                    <span>4h</span>
                    <span className="text-emerald-400 font-medium">{formData.sleep}h</span>
                    <span>12h</span>
                  </div>
                </div>
              </FormField>

              {/* Alcohol */}
              <FormField label="Alcohol Consumption" tooltip="Weekly alcohol consumption level">
                <select
                  value={formData.alcohol}
                  onChange={(e) => setFormData({...formData, alcohol: e.target.value})}
                  className="w-full py-3 px-4 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all duration-300"
                >
                  <option value="none">None</option>
                  <option value="light">Light (1-3 drinks/week)</option>
                  <option value="moderate">Moderate (4-7 drinks/week)</option>
                  <option value="heavy">Heavy (8+ drinks/week)</option>
                </select>
              </FormField>
            </div>
          </div>

          {/* Submit */}
          <div className="mt-12 text-center">
            <button
              onClick={calculateRisk}
              disabled={isAnimating}
              className="group relative px-12 py-4 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-xl font-semibold text-lg shadow-lg hover:shadow-teal-500/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isAnimating ? (
                <div className="flex items-center gap-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Analyzing Risk...
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Brain className="w-5 h-5" />
                  Calculate Risk Assessment
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
