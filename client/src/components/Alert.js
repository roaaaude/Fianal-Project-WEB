import React, { useState, useEffect } from 'react';
import { FaTimes, FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaExclamationCircle } from 'react-icons/fa';

const Alert = ({ type = 'info', message, dismissible = true, timeout = 5000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Reset visibility whenever message changes
    setIsVisible(true);
    
    // Auto-close after timeout if dismissible
    if (dismissible && timeout > 0) {
      const timer = setTimeout(() => {
        dismissAlert();
      }, timeout);
      
      return () => clearTimeout(timer);
    }
  }, [message, dismissible, timeout]);

  const dismissAlert = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  if (!isVisible || !message) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle />;
      case 'warning':
        return <FaExclamationTriangle />;
      case 'danger':
        return <FaExclamationCircle />;
      case 'info':
      default:
        return <FaInfoCircle />;
    }
  };

  return (
    <div className={`alert alert-${type}`} role="alert">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '10px' }}>{getIcon()}</span>
        <span>{message}</span>
      </div>
      {dismissible && (
        <button
          type="button"
          className="close"
          aria-label="Close"
          onClick={dismissAlert}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            position: 'absolute',
            right: '10px',
            top: '10px',
            fontSize: '16px',
          }}
        >
          <FaTimes />
        </button>
      )}
    </div>
  );
};

export default Alert; 