import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { Button, TextField, Typography } from '@mui/material';

const SignupForm = () => {
  const history = useNavigate();
  const { signUp, signInWithGoogle, signInWithFacebook } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignup = async () => {
    try {
      await signUp(email, password);
      console.log('User signed up with email and password!');
      history('/profile'); // Redirect to profile after successful signup
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithGoogle();
      console.log('User signed up successfully with Google.');
      history('/profile');
    } catch (error) {
      console.error('Error signing up with Google:', error);
    }
  };

  const handleFacebookSignUp = async () => {
    try {
      await signInWithFacebook();
      console.log('User signed up successfully with Facebook.');
      history('/profile');
    } catch (error) {
      console.error('Error signing up with Facebook:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      {error && <Typography variant="body2" color="error">{error}</Typography>}
      <Button variant="contained" color="primary" onClick={handleSignup}>
        Sign Up
      </Button>
      <Button onClick={handleGoogleSignUp}>
        Sign Up with Google
      </Button>
      <Button onClick={handleFacebookSignUp}>
        Sign Up with Facebook
      </Button>
    </div>
  );
};

export default SignupForm;