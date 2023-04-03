import '@/styles/globals.css';
import Header from 'components/Header.jsx';
import Footer from 'components/Footer.jsx';
import { CssBaseline, Container } from '@mui/material';
import { theme } from '../styles/theme.js';
import authSlice, { logIn } from '@/state/authSlice.js';

import { ThemeProvider } from '@mui/material';
import { configureStore } from '@reduxjs/toolkit';

import { Provider } from 'react-redux';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

async function getUser() {
  const token = localStorage.getItem('accestoken');
  if (token) {
    try {
      const res = await fetch('http://127.0.0.1:1337/api/users/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      return data;
    } catch (e) {
      return e;
    }
  }
}

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const userData = await getUser();
      if (userData) {
        setUser(userData);
      }
    }
    fetchData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CssBaseline />
        <Header user={user} />
        <Container maxWidth="xl" sx={{ mt: '60px' }}>
          <Component {...pageProps} />
        </Container>
        <Footer />
      </Provider>
    </ThemeProvider>
  );
};

export default App;
