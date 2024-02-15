import React, { useState } from 'react';
import axios from 'axios';

const CreateMagazine = ({ refreshList }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://ytxviewer-001-site6.itempurl.com/magazines', { name, price });
      alert('Magazine created successfully');
      setName('');
      setPrice('');
      // Call refreshList to update the list of magazines after creating a new one
      refreshList();
    } catch (error) {
      console.error('Error creating magazine:', error);
    }
  };

  return (
    <div>
      <h2>Create Magazine</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <label>Price:</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateMagazine;
