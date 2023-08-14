import Header from './Header';
import Footer from './Footer';
import MobileFooter from 'components/mobileVersionPage/MobileFooter';
import { useSelector } from 'react-redux';
import { Box, Container } from '@mui/material';
import { getHeaderData } from '@/state/headerSlice';
import { getFooterData } from '@/state/footerSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUserFromLocalCookie } from '@/http/authCookie.js';
import { logIn } from '@/state/authSlice';

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const mobile = useSelector((state) => state.search.mobile);

  useEffect(() => {
    dispatch(getHeaderData());
    dispatch(getFooterData());
    getUser();
  }, []);

  const getUser = async () => {
    getUserFromLocalCookie().then((response) => response && dispatch(logIn(response.data)));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      <Header />
      <Box sx={{ mt: '60px', flex: '1 1 auto' }}>
        <Container maxWidth="lg" sx={{ p: mobile && '3px' }}>
          {children}
        </Container>
      </Box>
      {mobile ? <MobileFooter /> : <Footer />}
    </Box>
  );
};

export default Layout;
