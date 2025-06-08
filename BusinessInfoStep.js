import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import InputField from '../InputField';
import SelectField from '../SelectField';

const BusinessInfoStep = () => {
  const { state, dispatch } = useUser();
  const { businessInfo } = state.userData;
  const [errors, setErrors] = useState({});

  const industries = [
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Finance' },
    { value: 'education', label: 'Education' },
    { value: 'retail', label: 'Retail' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'other', label: 'Other' }
  ];

  const companySizes = [
    { value: '1-10', label: '1-10 employees' },
    { value: '11-50', label: '11-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '201-1000', label: '201-1000 employees' },
    { value: '1000+', label: '1000+ employees' }
  ];

  const handleInputChange = (field, value) => {
    dispatch({
      type: 'UPDATE_BUSINESS_INFO',
      payload: { [field]: value }
    });

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Business Information
        </h2>
        <p className="text-gray-600">
          Help us understand your business better
        </p>
      </div>

      <InputField
        label="Company Name"
        type="text"
        value={businessInfo.companyName}
        onChange={(value) => handleInputChange('companyName', value)}
        placeholder="Enter your company name"
        error={errors.companyName}
        required
      />

      <SelectField
        label="Industry"
        value={businessInfo.industry}
        onChange={(value) => handleInputChange('industry', value)}
        options={industries}
        placeholder="Select your industry"
        error={errors.industry}
        required
      />

      <SelectField
        label="Company Size"
        value={businessInfo.size}
        onChange={(value) => handleInputChange('size', value)}
        options={companySizes}
        placeholder="Select company size"
        error={errors.size}
        required
      />
    </div>
  );
};

export default BusinessInfoStep;
