import React, { createContext, useContext, useReducer, useEffect } from 'react';

const UserContext = createContext();

const initialState = {
  currentStep: 1,
  totalSteps: 3,
  userData: {
    personalInfo: { name: '', email: '' },
    businessInfo: { companyName: '', industry: '', size: '' },
    preferences: { theme: 'light', layout: 'grid', notifications: true }
  },
  isLoading: false,
  errors: {}
};

function userReducer(state, action) {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        userData: {
          ...state.userData,
          personalInfo: { ...state.userData.personalInfo, ...action.payload }
        }
      };
    case 'UPDATE_BUSINESS_INFO':
      return {
        ...state,
        userData: {
          ...state.userData,
          businessInfo: { ...state.userData.businessInfo, ...action.payload }
        }
      };
    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        userData: {
          ...state.userData,
          preferences: { ...state.userData.preferences, ...action.payload }
        }
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERRORS':
      return { ...state, errors: action.payload };
    case 'LOAD_USER_DATA':
      return { ...state, userData: action.payload };
    default:
      return state;
  }
}

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
      dispatch({ type: 'LOAD_USER_DATA', payload: JSON.parse(savedData) });
    }
  }, []);

  const saveToLocalStorage = (data) => {
    localStorage.setItem('userData', JSON.stringify(data));
  };

  return (
    <UserContext.Provider value={{ state, dispatch, saveToLocalStorage }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
