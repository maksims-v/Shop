import { useState, forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, TextField, Button, Stack, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { changeUserData } from '@/state/authSlice';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const UserSettings = () => {
  const user = useSelector((state) => state.authSlice.user);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    lastName: user.lastName,
    country: user.country,
    city: user.city,
    adress: user.adress,
    postCode: user.postCode,
    phone: user.phone,
  });

  const saveData = () => {
    dispatch(changeUserData(userData));
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        pt: '20px',
        maxWidth: '250px',
        m: '0 auto',
      }}>
      <Box
        sx={{
          display: ' flex',
          flexDirection: 'column',
          maxWidth: '250px',
          gap: '8px',
        }}>
        <TextField
          onChange={handleChange}
          id="standard-basic"
          name="email"
          value={userData.email || ''}
          label="Email"
          variant="outlined"
        />
        <TextField
          onChange={handleChange}
          value={userData.fullName || ''}
          name="fullName"
          id="standard-basic"
          label="First Name"
          variant="outlined"
        />
        <TextField
          onChange={handleChange}
          id="standard-basic"
          name="lastName"
          value={userData.lastName || ''}
          label="Surname"
          variant="outlined"
        />
        <TextField
          onChange={handleChange}
          id="standard-basic"
          name="country"
          value={userData.country || ''}
          label="Country"
          variant="outlined"
        />
        <TextField
          onChange={handleChange}
          id="standard-basic"
          name="city"
          value={userData.city || ''}
          label="City"
          variant="outlined"
        />
        <TextField
          onChange={handleChange}
          id="standard-basic"
          name="adress"
          value={userData.adress || ''}
          label="Adress"
          variant="outlined"
        />
        <TextField
          onChange={handleChange}
          id="standard-basic"
          name="postCode"
          value={userData.postCode || ''}
          label="Post Code"
          variant="outlined"
        />
        <TextField
          onChange={handleChange}
          id="standard-basic"
          name="phone"
          value={userData.phone || '+'}
          label="Phone"
          variant="outlined"
        />
      </Box>
      <Box pt="10px" display="flex" justifyContent="space-between">
        <Button variant="contained" color="error" sx={{ width: '80px' }}>
          Cancel
        </Button>
        <Button onClick={saveData} variant="contained" color="success" sx={{ width: '80px' }}>
          Save
        </Button>
      </Box>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Data has changed!
          </Alert>
        </Snackbar>
      </Stack>
    </Box>
  );
};

export default UserSettings;
