import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { registration } from '@/http/userAPI';
import { useSelector, useDispatch } from 'react-redux';
import { logIn } from '@/state/authSlice';
import { useRouter } from 'next/router';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await registration({ username, email, password });
    if (data.status === 200) {
      localStorage.setItem('token', data.data.jwt);
      dispatch(logIn(data.data.user));
      router.replace('/');
    }
    setError(data.response?.data?.error?.message);
  };

  return (
    <Box sx={{ mt: '100px', width: '100%' }}>
      {' '}
      <Box maxWidth="400px" m="0 auto">
        <form onSubmit={handleSubmit}>
          <Box gap="10px" display="flex" flexDirection="column" alignItems="center">
            {' '}
            <TextField
              sx={{ width: '300px' }}
              id="email"
              name="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              sx={{ width: '300px' }}
              id="username"
              name="username"
              label="Username"
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              sx={{ width: '300px' }}
              id="password"
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Box color="red">{error}</Box>
            <Button
              sx={{ width: '100px' }}
              color="primary"
              variant="contained"
              fullWidth
              type="submit">
              Registration
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Registration;
