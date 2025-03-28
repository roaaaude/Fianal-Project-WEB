import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import Alert from '../components/Alert';
import '../assets/styles/forms.css';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  // Form validation schema
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .max(30, 'Username cannot exceed 30 characters')
      .required('Username is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{4,})(?=.*[!@#$%^&*_-]).{8,}$/,
        'Password must contain at least 1 uppercase letter, 1 lowercase letter, 4 numbers, 1 special character from !@#$%^&*_-, and be at least 8 characters long'
      )
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setErrorMessage('');
      
      try {
        // Remove confirmPassword before sending to API
        const { confirmPassword, ...userData } = values;
        
        const success = await register(userData);
        if (success) {
          // Redirect to home page after successful registration
          navigate('/');
        } else {
          setErrorMessage('Registration failed. Please try again.');
        }
      } catch (error) {
        setErrorMessage(error.response?.data?.message || 'An error occurred during registration');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="form-title">Create an Account</h2>
        <p className="form-subtitle">Join ShopEasy to start shopping and saving your favorite items.</p>
        
        {errorMessage && (
          <Alert 
            type="danger" 
            message={errorMessage} 
            dismissible={true} 
            onClose={() => setErrorMessage('')}
          />
        )}
        
        <form className="form" onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              <FaUser style={{ marginRight: '0.5rem' }} />
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className={`form-control ${formik.touched.username && formik.errors.username ? 'error' : ''}`}
              placeholder="Choose a username"
              {...formik.getFieldProps('username')}
            />
            {formik.touched.username && formik.errors.username && (
              <div className="form-error">{formik.errors.username}</div>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              <FaEnvelope style={{ marginRight: '0.5rem' }} />
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-control ${formik.touched.email && formik.errors.email ? 'error' : ''}`}
              placeholder="Enter your email"
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="form-error">{formik.errors.email}</div>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              <FaLock style={{ marginRight: '0.5rem' }} />
              Password
            </label>
            <div className="password-toggle">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className={`form-control ${formik.touched.password && formik.errors.password ? 'error' : ''}`}
                placeholder="Create a password"
                {...formik.getFieldProps('password')}
              />
              <span 
                className="password-toggle-icon" 
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="form-error">{formik.errors.password}</div>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              <FaLock style={{ marginRight: '0.5rem' }} />
              Confirm Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              className={`form-control ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'error' : ''}`}
              placeholder="Confirm your password"
              {...formik.getFieldProps('confirmPassword')}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="form-error">{formik.errors.confirmPassword}</div>
            )}
          </div>
          
          <button 
            type="submit" 
            className="form-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Register'}
          </button>
        </form>
        
        <div className="form-option">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register; 