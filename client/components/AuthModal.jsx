import { useState } from 'react';
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
import { useDispatch } from 'react-redux';
import { login } from '@/state/authSlice';

const LoginModal = ({ setOpenModalAuth, openModalAuth }) => {
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
    dispatch(login(data));
    handleClose();
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

        <DialogActions>
          <Link href="/register">
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
