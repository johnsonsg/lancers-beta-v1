import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      // Blue
      main: '#142440',
      light: '#1F4067',
      dark: '#213C6A',
      contrastText: '#fff',
    },
    secondary: {
      // Orange
      main: '#EB5E00',
      light: '#ffdb49',
      dark: '#b47b00',
      contrastText: '#000',
      white: '#ffffff',
    },
  },
});

export default theme;
