import React, { useEffect, useCallback } from 'react';
import { Grid, Typography} from '@material-ui/core';
import { useStyles } from '../themes/theme';
import { getUser } from '../utils/apiEndpoints';
import { useHistory } from 'react-router-dom';

const LoginSignupWrapper = ({ children, text }) => {
  const classes = useStyles();
  const history = useHistory();

  const fetchUser = useCallback(async () => {
    try {
      await getUser();
      history.push('/articles');
    } catch (error) {
      return;
    }
  }, [history]);

  useEffect(() => {
    fetchUser();
  },
    [fetchUser]);

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