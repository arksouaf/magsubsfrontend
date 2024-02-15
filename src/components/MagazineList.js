import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import CreateMagazine from './CreateMagazine';
import UpdateMagazine from './UpdateMagazine';
import SubscribeToMagazine from './SubscribeToMagazine';
import CancelSubscription from './CancelSubscription';

const MagazineList = () => {
  const [magazines, setMagazines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [selectedMagazineId, setSelectedMagazineId] = useState(null);

  useEffect(() => {
    fetchMagazines();
  }, []);

  const fetchMagazines = async () => {
    try {
      const response = await axios.get('http://ytxviewer-001-site6.itempurl.com/magazines');
      setMagazines(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://ytxviewer-001-site6.itempurl.com/magazines/${id}`);
      fetchMagazines();
    } catch (error) {
      console.error('Error deleting magazine:', error);
    }
  };

  const handleUpdateClick = (id) => {
    setSelectedMagazineId(id);
    setShowUpdatePopup(true);
  };

  const handleCloseUpdatePopup = () => {
    setShowUpdatePopup(false);
  };

  return (
    <div>
      <h1>Magazines</h1>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          <CreateMagazine refreshList={fetchMagazines} />
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Delete</TableCell>
                  <TableCell>Update</TableCell>
                  <TableCell>Subscribe</TableCell>
                  <TableCell>Cancel Subscription</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {magazines.map((magazine) => (
                  <TableRow key={magazine.id}>
                    <TableCell>{magazine.id}</TableCell>
                    <TableCell>{magazine.name}</TableCell>
                    <TableCell>{magazine.price}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleDelete(magazine.id)} variant="outlined" color="error">Delete</Button>
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => handleUpdateClick(magazine.id)} variant="outlined" color="primary">Update</Button>
                    </TableCell>
                    <TableCell>
                      <SubscribeToMagazine userId={1} magazineId={magazine.id} refreshList={fetchMagazines} />
                    </TableCell>
                    <TableCell>
                      <CancelSubscription userId={1} magazineId={magazine.id} refreshList={fetchMagazines} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
      {/* Update Magazine Popup */}
      <Dialog open={showUpdatePopup} onClose={handleCloseUpdatePopup}>
        <DialogTitle>Update Magazine</DialogTitle>
        <DialogContent>
          <UpdateMagazine id={selectedMagazineId} refreshList={fetchMagazines} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdatePopup}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MagazineList;
