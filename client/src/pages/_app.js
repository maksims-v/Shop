import '@/styles/globals.css';
import { theme } from '../styles/theme.js';
import authSlice from '@/state/authSlice.js';
import shoppingCartSlice from '@/state/shoppingCartSlice.js';
import searchPageSlice from '@/state/searchPageSlice.js';
import { ThemeProvider } from '@mui/material';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import Layout from 'components/Layout.jsx';

const store = configureStore({
  reducer: {
    auth: authSlice,
    shoppingCart: shoppingCartSlice,
    search: searchPageSlice,
  },
});

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
