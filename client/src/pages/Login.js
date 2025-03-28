import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import Alert from '../components/Alert';
import '../assets/styles/forms.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If user was redirected from a protected route, get the intended destination
  const from = location.state?.from?.pathname || '/';

  // Form validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required'),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setErrorMessage('');
      
      try {
        const success = await login(values);
        if (success) {
          // Redirect to the page they tried to visit or home
          navigate(from, { replace: true });
        } else {
          setErrorMessage('Login failed. Please check your credentials.');
        }
      } catch (error) {
        setErrorMessage(error.response?.data?.message || 'An error occurred during login');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="form-title">Login to Your Account</h2>
        <p className="form-subtitle">Welcome back! Please login to access your account.</p>
        
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
                placeholder="Enter your password"
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
          
          <button 
            type="submit" 
            className="form-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="form-option">
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login; 