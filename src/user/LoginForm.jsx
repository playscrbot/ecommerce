import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { Button, TextField, Typography } from '@mui/material';

const LoginForm = () => {
  const history = useNavigate();
  const { signIn, signInWithGoogle, signInWithFacebook } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      await signIn(email, password);
      console.log('User logged in with email and password!');
      history('/profile'); // Redirect to profile after successful login
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      console.log('User logged in successfully with Google.');
      history('/profile');
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      await signInWithFacebook();
      console.log('User logged in successfully with Facebook.');
      history('/profile');
    } catch (error) {
      console.error('Error signing in with Facebook:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Login
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
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
      <Button onClick={handleGoogleLogin}>
        Login with Google
      </Button>
      <Button onClick={handleFacebookLogin}>
        Login with Facebook
      </Button>
    </div>
  );
};

export default LoginForm;