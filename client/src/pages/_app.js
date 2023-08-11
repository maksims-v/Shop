import '@/styles/globals.css';
import { theme } from '../styles/theme.js';
import { CssBaseline } from '@mui/material';
import authSlice from '@/state/authSlice.js';
import shoppingCartSlice from '@/state/shoppingCartSlice.js';
import searchPageSlice from '@/state/searchPageSlice.js';
import headerSlice from '@/state/headerSlice.js';
import sectionBannerSlice from '@/state/sectionBannerSlice.js';
import footerSlice from '@/state/footerSlice.js';
import newArrivalsSliderSlice from '@/state/newArrivalsSliderSlice.js';
import relatedProductsSliderSlice from '@/state/relatedProductsSliderSlice.js';
import { ThemeProvider } from '@mui/material';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

const store = configureStore({
  reducer: {
    auth: authSlice,
    shoppingCart: shoppingCartSlice,
    search: searchPageSlice,
    fetchHeaderData: headerSlice,
    fetchSectionBannerData: sectionBannerSlice,
    fetchFooterData: footerSlice,
    fetchNewArrivalsData: newArrivalsSliderSlice,
    fetchRelatedProductsData: relatedProductsSliderSlice,
  },
});

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CssBaseline />
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  );
};

export default App;
