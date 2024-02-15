import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

const SubscribeToMagazine = ({ userId, magazineId, refreshList }) => {
  const handleSubscribe = async () => {
    try {
      await axios.post(`http://ytxviewer-001-site6.itempurl.com/subscriptions/${userId}/${magazineId}`);
      alert('Subscribed to magazine successfully');
      refreshList(); // Refresh the list after subscription
    } catch (error) {
      console.error('Error subscribing to magazine:', error);
    }
  };

  return (
    <div>
      <Button onClick={handleSubscribe} variant="outlined" color="primary">Subscribe</Button>
    </div>
  );
};

export default SubscribeToMagazine;
