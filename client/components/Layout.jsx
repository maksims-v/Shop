import { Container, CssBaseline } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import Head from 'next/head';

const Layout = ({ children, user }) => {
  return (
    <>
      <Head>
        <title>Adventure</title>
      </Head>
      <CssBaseline />
      <Header user={user} />
      <Container maxWidth="xl" sx={{ mt: '60px' }}>
        {children}
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
