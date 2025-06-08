import React, { useState, useEffect } from 'react';
import OnboardingWizard from './components/OnboardingWizard';
import Dashboard from './components/Dashboard';
import { UserProvider } from './context/UserContext';
import './index.css';

function App() {
  const [isOnboarded, setIsOnboarded] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      setIsOnboarded(true);
    }
  }, []);

  const handleOnboardingComplete = () => {
    setIsOnboarded(true);
  };

  return (
    <UserProvider>

      <div className="App min-h-screen bg-gray-50">
        {!isOnboarded ? (
          <OnboardingWizard onComplete={handleOnboardingComplete} />
        ) : (
          <Dashboard />
        )}
      </div>
    </UserProvider>
  );
}

export default App;
