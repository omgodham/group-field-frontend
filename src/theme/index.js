import {colors } from '@material-ui/core';
import {createTheme} from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    background: {
      default: '#F7F8FC',
      paper: colors.common.white
    },
    primary: {
      main: '#0077B6'
    },
    secondary: {
        main: '#9FA2B4'
      },
      success:{
        main: "#29CC97"
      },
    text: {
      primary: '#0077B6',
      secondary: 'gray',
      hint:'#388e3c'
    }
  }
});

export default theme;