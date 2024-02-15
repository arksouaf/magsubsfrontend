import React from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

const CancelSubscription = ({ userId, magazineId, refreshList }) => {
  const handleCancel = async () => {
    try {
      await axios.delete(`http://ytxviewer-001-site6.itempurl.com/subscriptions/${userId}/${magazineId}`);
      alert('Subscription canceled successfully');
      refreshList(); // Refresh the list after canceling subscription
    } catch (error) {
      console.error('Error canceling subscription:', error);
    }
  };

  return (
    <div>
      <Button onClick={handleCancel} variant="outlined" color="warning">Cancel Subscription</Button>
    </div>
  );
};

export default CancelSubscription;
