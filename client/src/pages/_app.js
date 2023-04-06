import '@/styles/globals.css';
import Header from 'components/Header.jsx';
import Footer from 'components/Footer.jsx';
import { CssBaseline, Container } from '@mui/material';
import { theme } from '../styles/theme.js';
import authSlice from '@/state/authSlice.js';
import sliderSlice from '@/state/sliderSlice.js';
import { ThemeProvider } from '@mui/material';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { useEffect, useState } from 'react';
import { getUser } from '@/http/userAPI.js';

const store = configureStore({
  reducer: {
    auth: authSlice,
    slider: sliderSlice,
  },
});

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser().then((response) => setUser(response.data));
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
