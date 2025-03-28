import React from 'react';

const Spinner = ({ size = 'medium', text = 'Loading...', fullPage = false }) => {
  const getSize = () => {
    switch (size) {
      case 'small':
        return { width: '1.5rem', height: '1.5rem' };
      case 'large':
        return { width: '4rem', height: '4rem' };
      case 'medium':
      default:
        return { width: '2.5rem', height: '2.5rem' };
    }
  };

  const spinnerStyle = {
    ...getSize(),
    border: '5px solid rgba(0, 0, 0, 0.1)',
    borderTopColor: '#3498db',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto',
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    ...(fullPage
      ? {
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          zIndex: 9999,
        }
      : {}),
  };

  const textStyle = {
    marginTop: '1rem',
    color: '#6c757d',
    fontSize: size === 'large' ? '1.25rem' : '1rem',
  };

  return (
    <div style={containerStyle}>
      <style>
        {`@keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }`}
      </style>
      <div style={spinnerStyle}></div>
      {text && <div style={textStyle}>{text}</div>}
    </div>
  );
};

export default Spinner; 