import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { Button, Typography } from '@mui/material';

const Profile = () => {
  const history = useNavigate();
  const { currentUser, signOut } = useAuth();
  const { wishlist } = useCart();

  const handleLogout = async () => {
    try {
      await signOut();
      history('/'); // Redirect to home page after logout
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      {currentUser ? (
        <>
          <Typography variant="body1">Email: {currentUser.email}</Typography>
          <h2>My Wishlist</h2>
          {wishlist.length === 0 ? (
            <p>Your wishlist is empty.</p>
          ) : (
            <ul>
              {wishlist.map(item => (
                <li key={item.id}>
                  {item.name} - ${item.price}
                  {/* Add remove from wishlist button */}
                </li>
              ))}
            </ul>
          )}
          <Button variant="contained" color="primary" onClick={handleLogout}>
            Logout
          </Button>
        </>
      ) : (
        <Typography variant="body1">Please sign in to view profile.</Typography>
      )}
    </div>
  );
};

export default Profile;