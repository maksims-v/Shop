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
import { useSelector, useDispatch } from 'react-redux';
import { logIn } from '@/state/authSlice';

async function getUser(email, pass) {
  try {
    const res = await fetch(`${process.env.API_URL}/api/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: email,
        password: pass,
      }),
    });
    const data = await res.json();

    return { data };
  } catch (e) {
    return e;
  }
}

const LoginModal = ({ handleClose, open }) => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const dispatch = useDispatch();

  async function submit() {
    const user = await getUser(email, pass);
    if (user.data.data !== null) {
      dispatch(logIn(user.data.user));
      setError(null);
    } else {
      setError(user.data.error.message);
      console.log(user.data);
    }
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
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
            id="outlined-basic"
            label="Email"
            variant="outlined"
            sx={{ width: '100%' }}
          />
          <TextField
            onChange={(e) => setPass(e.target.value)}
            id="outlined-basic"
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
