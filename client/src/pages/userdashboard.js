import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, Tabs, Tab } from '@mui/material';
import UserSettings from 'components/UserSettings';
import { useRouter } from 'next/router';

export default function CenteredTabs() {
  const [value, setValue] = useState(0);

  const isAuth = useSelector((state) => state.authSlice.isAuth);

  const router = useRouter();

  useEffect(() => {
    !isAuth && router.push('/');
  }, [isAuth]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="My profile" />
        <Tab label="My orders" />
        <Tab label="Delivery address" />
      </Tabs>
      {value === 0 && <UserSettings />}
    </Box>
  );
}
