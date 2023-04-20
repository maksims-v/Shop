import { useState } from 'react';
import { login } from '@/http/userAPI';
import {
  Dialog,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
} from '@mui/material';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { logIn } from '@/state/authSlice';

const LoginModal = ({ setOpenModalAuth, openModalAuth }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    identifier: '',
    password: '',
  });

  const dispatch = useDispatch();

  const handleClose = () => {
    setOpenModalAuth(false);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const user = await login(data);
    console.log(user);
    if (user?.response?.status === undefined) {
      dispatch(logIn(user.data.user));
      localStorage.setItem('token', user.data.jwt);
      handleClose();
    } else {
      setError(user?.response?.data?.error?.message);
    }
  };

  return (
    <Box>
      <Dialog open={openModalAuth} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{'Adventure Rewards Members'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you have an online or in-store account with us, please log in below. If you've joined
            our adventure rewards membership in-store and not logged in online before, please use
            the forget password link to set a password.
          </DialogContentText>
        </DialogContent>
        <Box sx={{ margin: '0 auto', gap: '15px', display: 'flex' }}>
          <TextField
            onChange={(e) => handleChange(e)}
            value={data.identifier}
            id="outlined-basic"
            label="Email"
            name="identifier"
            variant="outlined"
            sx={{ width: '100%' }}
          />
          <TextField
            onChange={(e) => handleChange(e)}
            id="outlined-basic"
            value={data.password}
            name="password"
            label="Password"
            variant="outlined"
            type="text"
            sx={{ width: '100%' }}
          />
        </Box>

        <Box color="red" margin="0 auto" pt="10px">
          {error}
        </Box>
        <DialogActions>
          <Link href="/registration">
            <Button autoFocus onClick={handleClose}>
              Create an account
            </Button>
          </Link>
          <Button onClick={handleSubmit} autoFocus>
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LoginModal;
