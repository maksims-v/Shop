import Header from './Header';
import Footer from './Footer';
import { Box, Container } from '@mui/material';
import { getHeaderData } from '@/state/headerSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUserFromLocalCookie } from '@/http/authCookie.js';
import { logIn } from '@/state/authSlice';

const Layout = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHeaderData());
    getUser();
  }, []);

  const getUser = async () => {
    getUserFromLocalCookie().then((response) => response && dispatch(logIn(response.data)));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      <Header />
      <Box sx={{ mt: '60px', flex: '1 1 auto' }}>
        <Container maxWidth="xl">{children}</Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
