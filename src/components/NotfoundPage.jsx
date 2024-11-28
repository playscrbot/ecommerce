import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Box } from '@mui/material';

const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
        textAlign: 'center',
      }}
    >
      <Box>
        <Typography variant="h2" gutterBottom>
          404 - Page Not Found
        </Typography>
        <Typography variant="body1" paragraph>
          Oops! The page you're looking for,
        </Typography>
        <Typography variant="body1" paragraph>
          does not exist.
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to="/"
          sx={{
            marginTop: 2,
            padding: '12px 24px',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            backgroundColor: '#007bff',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#0056b3',
            },
          }}
        >
          Go to Home
        </Button>
      </Box>
    </Box>
  );
};

export default NotFound;