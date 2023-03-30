import '@/styles/globals.css';
import Header from 'components/Header.jsx';
import Footer from 'components/Footer.jsx';
import { CssBaseline, Container } from '@mui/material';
import { theme } from '../styles/theme.js';
import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authSlice from '@/state/authSlice.js';

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CssBaseline />
        <Header />
        <Container maxWidth="xl" sx={{ mt: '60px' }}>
          <Component {...pageProps} />
        </Container>
        <Footer />
      </Provider>
    </ThemeProvider>
  );
};

export default App;
