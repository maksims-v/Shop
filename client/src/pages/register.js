import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { register } from '@/state/authSlice';

const Register = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(register(userData));
    router.replace('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <Box sx={{ mt: '100px', width: '100%' }}>
      {' '}
      <Box maxWidth="400px" m="0 auto">
        <Box
          component="form"
          autoComplete="off"
          gap="10px"
          display="flex"
          onSubmit={handleSubmit}
          flexDirection="column"
          alignItems="center">
          {' '}
          <TextField
            sx={{ width: '300px' }}
            id="email"
            name="email"
            label="Email"
            value={userData.email}
            onChange={(e) => handleChange(e)}
          />
          <TextField
            sx={{ width: '300px' }}
            id="username"
            name="username"
            label="Username"
            type="username"
            value={userData.username}
            onChange={(e) => handleChange(e)}
          />
          <TextField
            sx={{ width: '300px' }}
            id="password"
            name="password"
            label="Password"
            type="password"
            value={userData.password}
            onChange={(e) => handleChange(e)}
          />
          <Box color="red"></Box>
          <Button
            sx={{ width: '100px' }}
            color="primary"
            variant="contained"
            fullWidth
            type="submit">
            Registration
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
