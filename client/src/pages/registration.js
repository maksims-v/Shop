import { Box, Button, TextField } from '@mui/material';
import * as yup from 'yup';
import { useState } from 'react';
import { registration } from '@/http/userAPI';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registration({ username, email, password });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
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
