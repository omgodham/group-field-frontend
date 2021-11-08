import {colors } from '@material-ui/core';
import {createTheme} from '@material-ui/core/styles';
import {createMuiTheme} from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    background: {
      default: '#F4F6F8',
      paper: colors.common.white
    },
    primary: {
      contrastText: '#ffffff',
      main: '#5664d2'
    },
    text: {
      primary: '#172b4d',
      secondary: '#6b778c'
    },
    secondary: {
      main: '#F4F6F8',
    }
  },
});



export default theme;