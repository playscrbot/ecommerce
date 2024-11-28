import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

const RatingCard = ({ title, description }) => {
  const [ratingValue, setRatingValue] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleRatingChange = (event, newValue) => {
    setRatingValue(newValue);
  };

  const handleSubmitRating = () => {
    if (ratingValue === 0) {
      alert('Please select a rating before submitting.');
    } else {
      alert(`You submitted a rating of ${ratingValue}.`);
      setSubmitted(true);
    }
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          {description}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Your Rating:
        </Typography>
        <Rating
          name="rating"
          value={ratingValue}
          precision={1}
          onChange={handleRatingChange}
          IconContainerComponent={StarIcon}
        />
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitRating}
            disabled={submitted}
          >
            Submit Rating
          </Button>
        </Box>
        {submitted && (
          <Typography variant="body2" color="textSecondary" mt={2}>
            Thank you for submitting your rating!
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default RatingCard;