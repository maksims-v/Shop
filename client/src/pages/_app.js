import '@/styles/globals.css';
import { theme } from '../styles/theme.js';
import authSlice from '@/state/authSlice.js';
import slidersSlice from '@/state/slidersSlice.js';
import { ThemeProvider } from '@mui/material';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { useEffect, useState } from 'react';
import { getUser } from '@/http/userAPI.js';
import Layout from 'components/Layout.jsx';

const store = configureStore({
  reducer: {
    auth: authSlice,
    sliders: slidersSlice,
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
        <Layout user={user}>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
