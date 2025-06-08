import React from 'react';
import { useUser } from '../context/UserContext';
import PersonalInfoStep from './steps/PersonalInfoStep';
import BusinessInfoStep from './steps/BusinessInfoStep';
import PreferencesStep from './steps/PreferencesStep';

const stepLabels = ["Personal Info", "Business Info", "Preferences"];

const OnboardingWizard = ({ onComplete }) => {
  const { state, dispatch, saveToLocalStorage } = useUser();
  const { currentStep, totalSteps, userData } = state;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      dispatch({ type: 'SET_STEP', payload: currentStep + 1 });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      dispatch({ type: 'SET_STEP', payload: currentStep - 1 });
    }
  };

  const handleSubmit = () => {
    saveToLocalStorage(userData);
    onComplete();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <PersonalInfoStep />;
      case 2: return <BusinessInfoStep />;
      case 3: return <PreferencesStep />;
      default: return <PersonalInfoStep />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-2">
          Welcome! Let's get you started
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Step {currentStep} of {totalSteps}
        </p>

        {/* Step Circles */}
        <div className="steps mb-8">
          {stepLabels.map((label, idx) => (
            <div key={label} className="flex flex-col items-center" style={{ flex: 1 }}>
              <div className={`step-circle${currentStep === idx + 1 ? ' active' : ''}`}>
                {idx + 1}
              </div>
              <span style={{
                marginTop: '0.25rem',
                fontSize: '0.95rem',
                color: currentStep === idx + 1 ? '#4338ca' : '#6366f1',
                fontWeight: currentStep === idx + 1 ? 700 : 400
              }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="mt-8">{renderStep()}</div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="bg-gray-100 text-gray-500 font-medium rounded px-6 py-3 transition-all"
            style={{ opacity: currentStep === 1 ? 0.6 : 1, cursor: currentStep === 1 ? 'not-allowed' : 'pointer' }}
          >
            Back
          </button>
          {currentStep === totalSteps ? (
            <button
              onClick={handleSubmit}
              className="bg-indigo-600 text-white font-medium rounded px-8 py-3 transition-all hover:bg-indigo-700"
            >
              Complete Setup
            </button>
          ) : (
            <button
              onClick={nextStep}
              className="bg-indigo-600 text-white font-medium rounded px-8 py-3 transition-all hover:bg-indigo-700"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard;
