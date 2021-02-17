import { createMuiTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const colors = {
  darkGray: '#474545',
  lightGray: '#5F5F5F',
  pastelRed: '#DE5252',
  orange: '#CD552B',
  offWhite: '#F0F0F0'
};

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Helvetica"',
    fontSize: 14,
    h2: {
      color: 'white',
      fontFamily: 'Roboto',
      fontWeight: 900
    },
    h3: {
      marginBottom: '30px',
      color: colors.lightGray,
      fontWeight: 900
    }
  },
  palette: {
    primary: { main: '#516BF6' },
  },
});

export const useStyles = makeStyles(
  (theme) => ({
    loginSignupWrapperRoot: {
      flexGrow: 1,
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      fontFamily: 'Roboto',
      height: '100vh',
      width: '100vw',
      position: 'relative',
      overflowY: 'auto',
    },
    loginBanner: {
      display: 'flex',
      backgroundImage: `linear-gradient(135deg, ${colors.pastelRed}, ${colors.orange})`,
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center'
    },
    loginContainer: {
      height: 'inherit'
    },
    loginSignupForm: {
      display: 'flex',
      flexDirection: 'column'
    },
    form: {
      width: '250px',
      marginBottom: '10px'
    },
    loginFormContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.offWhite
    },
    loginButton: {
      width: '250px',
      background: colors.pastelRed,
      color: 'white',
      fontWeight: 500,
      fontFamily: 'Roboto'
    },
    loginCard: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '50%', 
      width: '50%', 
      boxShadow: '0 0 10px gray', 
      backgroundColor: 'white'
    },
    articleContainerHighlighted: {
      backgroundColor: colors.lightGray
    },
    articleTable: {
      width: '80%',
      margin: 'auto',
      borderWidth: 1,
      borderColor: 'black',
    },
    addRemoveButton: {
      height: '24px',
      width: '80px',
      fontFamily: 'Roboto'
    }
  }),
);

