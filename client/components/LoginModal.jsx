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

const LoginModal = ({ handleClose, open }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

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
            type="password"
            sx={{ width: '100%' }}
          />
        </Box>

        <DialogActions>
          <Link href="/registration">
            {' '}
            <Button autoFocus onClick={handleClose}>
              Create an account
            </Button>
          </Link>
          <Button onClick={handleClose} autoFocus>
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LoginModal;
