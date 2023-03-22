import '@/styles/globals.css';
import Layout from 'components/Layout';
import { CssBaseline } from '@mui/material';
import { theme } from '../styles/theme.js';
import { ThemeProvider } from '@mui/material';

const App = ({ Component, pageProps }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Layout>
      {' '}
      <Component {...pageProps} />
    </Layout>
  </ThemeProvider>
);

export default App;
