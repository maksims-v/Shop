import '@/styles/globals.css';
import Layout from 'components/Layout';
import { CssBaseline } from '@mui/material';
import { theme } from '../styles/theme.js';
import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authSlice from '@/state/authSlice.js';
import { SessionProvider } from 'next-auth/react';

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
        <Layout>
          {' '}
          <SessionProvider session={session}>
            <Component {...pageProps} />
          </SessionProvider>
        </Layout>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
