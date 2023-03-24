import '@/styles/globals.css';
import Layout from 'components/Layout';
import { CssBaseline } from '@mui/material';
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

const App = ({ Component, pageProps }) => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <CssBaseline />
      <Layout>
        {' '}
        <Component {...pageProps} />
      </Layout>
    </Provider>
  </ThemeProvider>
);

export default App;
