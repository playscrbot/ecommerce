import React, { useEffect } from 'react';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CheckoutSuccess = () => {
  const history = useNavigate();

  // Simulate delivery time (in this case, 3 days)
  const deliveryTime = 7;

  // Redirect to home page after 5 seconds
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      history('/');
    }, 12000); // 12000 milliseconds = 12 seconds

    return () => clearTimeout(redirectTimer);
  }, [history]);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Thank you for your purchase!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Your order will arrive in approximately {deliveryTime} days.
      </Typography>
      <Button variant="contained" onClick={() => history('/')}>
        Return Home
      </Button>
    </div>
  );
};

export default CheckoutSuccess;