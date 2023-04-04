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
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const dispatch = useDispatch();

  const handleClose = () => {
    setOpenModalAuth(false);
  };

  const submit = async () => {
    try {
      const user = await login(email, pass);
      if (user.data.data !== null) {
        dispatch(logIn(user.data.user));
        localStorage.setItem('accestoken', user.data.jwt);
        handleClose();
        setError(null);
      } else {
        setError(user.data.error.message);
      }
    } catch (e) {
      setError('Something went wrong');
      console.log(e.message);
    }
  };

  return (
    <div>
      <Dialog open={openModalAuth} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{'Adventure Rewards Members'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you have an online or in-store account with us, please log in below. If you've joined
            our adventure rewards membership in-store and not logged in online before, please use
            the forget password link to set a password.
          </DialogContentText>
        </DialogContent>
        <Box margin="0 auto" gap="15px" display="flex">
          {' '}
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            sx={{ width: '100%' }}
          />
          <TextField
            onChange={(e) => setPass(e.target.value)}
            id="outlined-basic"
            value={pass}
            label="Password"
            variant="outlined"
            type="text"
            sx={{ width: '100%' }}
          />
        </Box>
        <Box color="red" margin="0 auto" pt="10px">
          {' '}
          {error}
        </Box>

        <DialogActions>
          <Link href="/registration">
            {' '}
            <Button autoFocus onClick={handleClose}>
              Create an account
            </Button>
          </Link>
          <Button onClick={submit} autoFocus>
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LoginModal;
