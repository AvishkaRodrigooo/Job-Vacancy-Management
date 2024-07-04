import React from 'react';

const AlertMessage = ({ message, type, onClose }) => {
  return (
    <div className={`alert alert-${type}`} role="alert">
      {message}
      <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
    </div>
  );
};

export default AlertMessage;
