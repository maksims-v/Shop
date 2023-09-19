import Navbar from './Navbar';
import Footer from './Footer';
import MobileFooter from 'components/mobileVersionPage/MobileFooter';
import { useSelector } from 'react-redux';
import { Box, Container } from '@mui/material';
import { getHeaderData } from '@/state/headerSlice';
import { getFooterData } from '@/state/footerSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUserFromLocalCookie } from '@/state/authSlice';
import Cookies from 'js-cookie';
import useMediaQuery from '@mui/material/useMediaQuery';
import { setMobile } from '@/state/searchPageSlice';

import { addToBasket } from '@/state/shoppingCartSlice';

const Layout = ({ children }) => {
  const mobileScreen = useMediaQuery('(max-width:570px)');

  const dispatch = useDispatch();
  const mobile = useSelector((state) => state.searchPageSlice.mobile);

  useEffect(() => {
    dispatch(setMobile(mobileScreen ? true : false));
  }, [mobileScreen]);

  useEffect(() => {
    const jwt = Cookies.get('jwt');
    const basket = localStorage.getItem('cart');
    if (basket) dispatch(addToBasket(JSON.parse(basket)));
    dispatch(getHeaderData());
    dispatch(getFooterData());
    if (jwt) {
      dispatch(getUserFromLocalCookie(jwt));
    }
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      <Navbar />
      <Box sx={{ mt: mobile ? '40px' : '60px', flex: '1 1 auto' }}>
        <Container maxWidth="lg" sx={{ p: mobile && '3px' }}>
          {children}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
