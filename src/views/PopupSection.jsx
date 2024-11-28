import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const SubscribeForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // manage form submission
  };

  return (
    <Stack
      as="form"
      spacing={3}
      onSubmit={handleSubmit}
      alignItems="center"
    >
      <FormControl>
        <Input
          type="email"
          placeholder="Enter your email"
          size="large"
          fontSize="medium"
          autoFocus
          required
          // You can add more props for styling here
        />
      </FormControl>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        style={{ textTransform: 'uppercase', fontWeight: 'bold' }}
      >
        Get my 20% off
      </Button>
    </Stack>
  );
}

function PopupSection() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);

    }, 15000); // 15 seconds delay to open the popup

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Dialog open={open} maxWidth="xs" fullWidth>
        <DialogTitle className="popup-title">Join Us today to get</DialogTitle>
        <DialogContent className="popup-content">
          <DialogContentText>
            <span className="discount-text">
              20% off
            </span>{' '}
            on your next purchase + exclusive access to new products
          </DialogContentText>
        </DialogContent>
        <DialogActions className="popup-actions">
          <Button color="primary" variant="contained" onClick={() => SubscribeForm()}>
            Subscribe
          </Button>
          <Button color="secondary" variant="contained" onClick={() => setOpen(false)}>
            No, I don’t want discounts
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PopupSection;