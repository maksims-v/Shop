import { useState, forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, TextField, Button, Stack, Snackbar } from '@mui/material';
import { changeUserData } from '@/http/userAPI';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const UserSettings = () => {
  const user = useSelector((state) => state.auth.user);
  const orders = useSelector((state) => state.auth.orders);
  const dispatch = useDispatch();

  console.log(user);
  const [open, setOpen] = useState(false);
  const [userId] = useState(user.id);
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.fullName);
  const [surname, setSurname] = useState(user.lastName);
  const [country, setCountry] = useState(user.country);
  const [city, setCity] = useState(user.city);
  const [adress, setAdress] = useState(user.adress);
  const [postCode, setPostcode] = useState(user.postCode);
  const [phone, setPhone] = useState(user.phone);

  const saveData = async () => {
    try {
      changeUserData(
        {
          email: email,
          fullName: name,
          lastName: surname,
          country: country,
          city: city,
          adress: adress,
          postCode: postCode,
          phone: phone,
        },
        userId,
      );
      setOpen(true);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
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
          onChange={(e) => setEmail(e.target.value)}
          id="standard-basic"
          value={email || ''}
          label="Email"
          variant="outlined"
        />
        <TextField
          onChange={(e) => setName(e.target.value)}
          value={name || ''}
          id="standard-basic"
          label="First Name"
          variant="outlined"
        />
        <TextField
          onChange={(e) => setSurname(e.target.value)}
          id="standard-basic"
          value={surname || ''}
          label="Surname"
          variant="outlined"
        />
        <TextField
          onChange={(e) => setCountry(e.target.value)}
          id="standard-basic"
          value={country || ''}
          label="Country"
          variant="outlined"
        />
        <TextField
          onChange={(e) => setCity(e.target.value)}
          id="standard-basic"
          value={city || ''}
          label="City"
          variant="outlined"
        />
        <TextField
          onChange={(e) => setAdress(e.target.value)}
          id="standard-basic"
          value={adress || ''}
          label="Adress"
          variant="outlined"
        />
        <TextField
          onChange={(e) => setPostcode(e.target.value)}
          id="standard-basic"
          value={postCode || ''}
          label="Post Code"
          variant="outlined"
        />
        <TextField
          onChange={(e) => setPhone(e.target.value)}
          id="standard-basic"
          value={phone || '+'}
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
