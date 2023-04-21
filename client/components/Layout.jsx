import { Container, CssBaseline } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import Head from 'next/head';
import { useEffect } from 'react';
import { getUserFromLocalCookie } from '@/http/authCookie.js';
import { useDispatch } from 'react-redux';
import { logIn } from '@/state/authSlice';

const Layout = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    getUserFromLocalCookie().then((response) => response && dispatch(logIn(response.data)));
  };

  return (
    <>
      <Head>
        <title>Adventure</title>
      </Head>
      <CssBaseline />
      <Header />
      <Container maxWidth="xl" sx={{ mt: '60px' }}>
        {children}
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
