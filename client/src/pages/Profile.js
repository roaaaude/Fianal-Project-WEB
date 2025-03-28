import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSave, FaSignOutAlt } from 'react-icons/fa';
import { getUserProfile, updateUserProfile } from '../services/userService';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';
import '../assets/styles/profile.css';

const Profile = () => {
  const { user, logout, updateUserData } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  useEffect(() => {
    fetchUserProfile();
  }, []);
  
  const fetchUserProfile = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await getUserProfile();
      
      // Initialize form with user data
      formik.setValues({
        username: response.data.username || '',
        email: response.data.email || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (err) {
      console.error('Error fetching user profile:', err);
      setError('Failed to load your profile. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  // Form validation schema
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .max(30, 'Username cannot exceed 30 characters')
      .required('Username is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    currentPassword: Yup.string()
      .when('$isChangingPassword', {
        is: true,
        then: Yup.string().required('Current password is required to change password')
      }),
    newPassword: Yup.string()
      .when('$isChangingPassword', {
        is: true,
        then: Yup.string()
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{4,})(?=.*[!@#$%^&*_-]).{8,}$/,
            'Password must contain at least 1 uppercase letter, 1 lowercase letter, 4 numbers, 1 special character from !@#$%^&*_-, and be at least 8 characters long'
          )
          .required('New password is required')
      }),
    confirmPassword: Yup.string()
      .when('newPassword', {
        is: (val) => val && val.length > 0,
        then: Yup.string()
          .oneOf([Yup.ref('newPassword')], 'Passwords must match')
          .required('Please confirm your password')
      })
  });
  
  // Formik setup
  const formik = useFormik({
    initialValues: {
      username: user?.username || '',
      email: user?.email || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    validationContext: { isChangingPassword },
    onSubmit: async (values) => {
      setError('');
      setSuccess('');
      setLoading(true);
      
      try {
        // Prepare update data
        const updateData = {
          username: values.username,
          email: values.email
        };
        
        // Add password fields if changing password
        if (isChangingPassword) {
          if (!values.currentPassword) {
            setError('Current password is required to change password');
            setLoading(false);
            return;
          }
          
          updateData.currentPassword = values.currentPassword;
          updateData.newPassword = values.newPassword;
        }
        
        // Update profile
        const response = await updateUserProfile(updateData);
        
        // Update auth context
        updateUserData({
          username: values.username,
          email: values.email
        });
        
        // Reset password fields
        formik.setFieldValue('currentPassword', '');
        formik.setFieldValue('newPassword', '');
        formik.setFieldValue('confirmPassword', '');
        setIsChangingPassword(false);
        
        setSuccess('Profile updated successfully');
      } catch (err) {
        console.error('Error updating profile:', err);
        setError(err.response?.data?.message || 'Failed to update profile. Please try again.');
      } finally {
        setLoading(false);
      }
    },
  });
  
  const handleTogglePasswordChange = () => {
    setIsChangingPassword(!isChangingPassword);
    
    // Reset password fields
    formik.setFieldValue('currentPassword', '');
    formik.setFieldValue('newPassword', '');
    formik.setFieldValue('confirmPassword', '');
  };
  
  const handleLogout = () => {
    logout();
  };
  
  if (loading && !formik.values.email) {
    return <Spinner size="large" text="Loading your profile..." />;
  }
  
  return (
    <div className="container profile-page">
      <div className="profile-header">
        <h1 className="profile-title">
          <FaUser className="title-icon" /> My Profile
        </h1>
        <p className="profile-subtitle">
          View and update your account information
        </p>
      </div>
      
      {error && (
        <Alert 
          type="danger" 
          message={error} 
          dismissible={true} 
          onClose={() => setError('')} 
        />
      )}
      
      {success && (
        <Alert 
          type="success" 
          message={success} 
          dismissible={true} 
          onClose={() => setSuccess('')} 
        />
      )}
      
      <div className="profile-container">
        <form className="profile-form" onSubmit={formik.handleSubmit}>
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
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="form-error">{formik.errors.email}</div>
            )}
          </div>
          
          <div className="password-section">
            <div className="password-header">
              <h3>Password</h3>
              <button 
                type="button" 
                className="change-password-toggle" 
                onClick={handleTogglePasswordChange}
              >
                {isChangingPassword ? 'Cancel' : 'Change Password'}
              </button>
            </div>
            
            {isChangingPassword && (
              <>
                <div className="form-group">
                  <label htmlFor="currentPassword" className="form-label">
                    <FaLock style={{ marginRight: '0.5rem' }} />
                    Current Password
                  </label>
                  <div className="password-toggle">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      id="currentPassword"
                      name="currentPassword"
                      className={`form-control ${formik.touched.currentPassword && formik.errors.currentPassword ? 'error' : ''}`}
                      {...formik.getFieldProps('currentPassword')}
                    />
                    <span 
                      className="password-toggle-icon" 
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      aria-label={showCurrentPassword ? 'Hide password' : 'Show password'}
                    >
                      {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  {formik.touched.currentPassword && formik.errors.currentPassword && (
                    <div className="form-error">{formik.errors.currentPassword}</div>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor="newPassword" className="form-label">
                    <FaLock style={{ marginRight: '0.5rem' }} />
                    New Password
                  </label>
                  <div className="password-toggle">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="newPassword"
                      name="newPassword"
                      className={`form-control ${formik.touched.newPassword && formik.errors.newPassword ? 'error' : ''}`}
                      {...formik.getFieldProps('newPassword')}
                    />
                    <span 
                      className="password-toggle-icon" 
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  {formik.touched.newPassword && formik.errors.newPassword && (
                    <div className="form-error">{formik.errors.newPassword}</div>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">
                    <FaLock style={{ marginRight: '0.5rem' }} />
                    Confirm New Password
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    className={`form-control ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'error' : ''}`}
                    {...formik.getFieldProps('confirmPassword')}
                  />
                  {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <div className="form-error">{formik.errors.confirmPassword}</div>
                  )}
                </div>
              </>
            )}
          </div>
          
          <div className="profile-actions">
            <button 
              type="submit" 
              className="save-profile-btn"
              disabled={loading}
            >
              <FaSave /> 
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            
            <button 
              type="button" 
              className="logout-btn"
              onClick={handleLogout}
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile; 