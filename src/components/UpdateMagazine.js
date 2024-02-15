import React, { useState } from 'react';
import axios from 'axios';

const UpdateMagazine = ({ id ,refreshList,handleCloseUpdatePopup}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://ytxviewer-001-site6.itempurl.com/magazines/${id}`, { name, price });
      alert('Magazine updated successfully');
      setName('');
      setPrice('');
      refreshList();
      handleCloseUpdatePopup();
    } catch (error) {
      console.error('Error updating magazine:', error);
    }
  };

  return (
    <div>
      <h2>Update Magazine</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <label>Price:</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateMagazine;

