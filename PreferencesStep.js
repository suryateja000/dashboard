import React from 'react';
import { useUser } from '../../context/UserContext';
import ToggleSwitch from '../ToggleSwitch';

const PreferencesStep = () => {
  const { state, dispatch } = useUser();
  const { preferences } = state.userData;

  const handlePreferenceChange = (field, value) => {
    dispatch({
      type: 'UPDATE_PREFERENCES',
      payload: { [field]: value }
    });
  };

  const themes = [
    { value: 'light', label: 'Light', description: 'Clean and bright interface' },
    { value: 'dark', label: 'Dark', description: 'Easy on the eyes' },
    { value: 'auto', label: 'Auto', description: 'Matches system preference' }
  ];

  const layouts = [
    { value: 'grid', label: 'Grid', description: 'Card-based layout' },
    { value: 'list', label: 'List', description: 'Compact list view' },
    { value: 'kanban', label: 'Kanban', description: 'Board-style layout' }
  ];

  return (
    <div style={{ maxWidth: 500, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>
          Customize Your Experience
        </h2>
        <p style={{ color: '#555', marginBottom: 0 }}>
          Set your preferences to make the app work best for you
        </p>
      </div>

      {/* Theme Preference */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 18, fontWeight: 500, marginBottom: 12 }}>Theme Preference</h3>
        {themes.map((theme) => (
          <label
            key={theme.value}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 0',
              cursor: 'pointer',
              background: preferences.theme === theme.value ? '#eef2ff' : 'transparent',
              borderRadius: 8,
              marginBottom: 4
            }}
          >
            <input
              type="radio"
              name="theme"
              value={theme.value}
              checked={preferences.theme === theme.value}
              onChange={() => handlePreferenceChange('theme', theme.value)}
              style={{ marginRight: 12 }}
            />
            <span style={{ fontWeight: 500, marginRight: 8 }}>{theme.label}</span>
            <span style={{ color: '#888', fontSize: 14 }}>{theme.description}</span>
          </label>
        ))}
      </div>

      {/* Dashboard Layout */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 18, fontWeight: 500, marginBottom: 12 }}>Dashboard Layout</h3>
        {layouts.map((layout) => (
          <label
            key={layout.value}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 0',
              cursor: 'pointer',
              background: preferences.layout === layout.value ? '#eef2ff' : 'transparent',
              borderRadius: 8,
              marginBottom: 4
            }}
          >
            <input
              type="radio"
              name="layout"
              value={layout.value}
              checked={preferences.layout === layout.value}
              onChange={() => handlePreferenceChange('layout', layout.value)}
              style={{ marginRight: 12 }}
            />
            <span style={{ fontWeight: 500, marginRight: 8 }}>{layout.label}</span>
            <span style={{ color: '#888', fontSize: 14 }}>{layout.description}</span>
          </label>
        ))}
      </div>

      {/* Notifications Toggle */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        background: '#f3f4f6',
        borderRadius: 8
      }}>
        <div>
          <h4 style={{ fontWeight: 500, marginBottom: 4 }}>Email Notifications</h4>
          <p style={{ color: '#666', fontSize: 14, margin: 0 }}>Receive updates about your projects</p>
        </div>
        <ToggleSwitch
          checked={preferences.notifications}
          onChange={(checked) => handlePreferenceChange('notifications', checked)}
        />
      </div>
    </div>
  );
};

export default PreferencesStep;
