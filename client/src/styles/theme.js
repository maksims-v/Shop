import { createTheme } from '@mui/material/styles';
export const theme = createTheme({
  box: {
    fontFamily: ['Titillium Web', 'sans-serif'].join(','),
  },
  typography: {
    fontFamily: ['Titillium Web', 'sans-serif'].join(','),
    fontSize: 14,
    h1: {
      fontFamily: ['Titillium Web', 'sans-serif'].join(','),
      fontSize: 48,
    },
    h2: {
      fontFamily: ['Titillium Web', 'sans-serif'].join(','),
      fontSize: 36,
    },
    h3: {
      fontFamily: ['Titillium Web', 'sans-serif'].join(','),
      fontSize: 20,
    },
    h4: {
      fontFamily: ['Titillium Web', 'sans-serif'].join(','),
      fontSize: 14,
    },
  },
});
