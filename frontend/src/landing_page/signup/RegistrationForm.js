// frontend/src/components/RegistrationForm.jsx
import React, { useState } from 'react';
import { authAPI } from '../../service/authService';

function RegistrationForm({ mobileNumber, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error on input
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      return 'Full name is required';
    }

    if (formData.name.trim().length < 3) {
      return 'Name must be at least 3 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return 'Invalid email address';
    }

    if (formData.password.length < 6) {
      return 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match';
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await authAPI.completeRegistration({
        number: mobileNumber,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      });

      if (response.success) {
        setSuccess('Registration completed successfully!');

        // Save user data
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
        localStorage.setItem('isAuthenticated', 'true');

        // Call success callback
        if (onSuccess) {
          setTimeout(() => {
            onSuccess(response);
          }, 1500);
        }
      } else {
        setError(response.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-form">
      <h3 className="mb-3">Complete Your Registration</h3>
      <p className="text-muted mb-4">Mobile: {mobileNumber} ✓</p>

      <form onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Enter password (min 6 characters)"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Re-enter password"
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="alert alert-success" role="alert">
            {success}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-100 p-2"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Completing Registration...
            </>
          ) : (
            'Complete Registration'
          )}
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;