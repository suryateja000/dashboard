import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import InputField from '../InputField';

const PersonalInfoStep = () => {
  const { state, dispatch } = useUser();
  const { personalInfo } = state.userData;
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (field, value) => {
    dispatch({
      type: 'UPDATE_PERSONAL_INFO',
      payload: { [field]: value }
    });

    // Clear errors when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = () => {
    const newErrors = {};
    
    if (!personalInfo.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (personalInfo.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!personalInfo.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(personalInfo.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Personal Information
        </h2>
        <p className="text-gray-600">
          Tell us a bit about yourself to get started
        </p>
      </div>

      <InputField
        label="Full Name"
        type="text"
        value={personalInfo.name}
        onChange={(value) => handleInputChange('name', value)}
        placeholder="Enter your full name"
        error={errors.name}
        required
      />

      <InputField
        label="Email Address"
        type="email"
        value={personalInfo.email}
        onChange={(value) => handleInputChange('email', value)}
        placeholder="Enter your email address"
        error={errors.email}
        required
      />
    </div>
  );
};

export default PersonalInfoStep;
