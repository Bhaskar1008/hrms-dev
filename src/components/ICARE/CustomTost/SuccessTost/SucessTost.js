import React, { useState } from 'react';
import { Toast, Button } from 'react-bootstrap';

const CustomToast = ({ message }) => {
  const [showToast, setShowToast] = useState(true);

  const handleCloseToast = () => {
    setShowToast(false);
  };

  return (
    <Toast show={showToast} onClose={handleCloseToast} delay={3000} autohide>
      <Toast.Header>
        <strong className="me-auto">Custom Toast</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
      <Button variant="outline-dark" size="sm" onClick={handleCloseToast}>
        Close
      </Button>
    </Toast>
  );
};

export default CustomToast;
