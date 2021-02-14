import React from 'react';
import { Grid, Typography} from '@material-ui/core';
import { useStyles } from '../themes/theme';

const LoginSignupWrapper = ({ children, text }) => {
  const classes = useStyles();

  return (
    <div className={classes.loginSignupWrapperRoot}>
      <Grid className={classes.loginContainer} container spacing={3}>
        <Grid className={classes.loginBanner} item xs={3}>
          <Typography variant="h2">{text}</Typography>
        </Grid>
        <Grid className={classes.loginFormContainer} item xs={9}>
          {children}
        </Grid>
      </Grid>
    </div>
  );
};

export default LoginSignupWrapper;