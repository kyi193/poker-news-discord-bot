import React, { useEffect, useCallback } from 'react';
import { Grid, Typography} from '@material-ui/core';
import { useStyles } from '../themes/theme';
import { getUser, getUserArticles } from '../utils/apiEndpoints';
import { useHistory } from 'react-router-dom';
import { userLogin } from '../actions';
import { useDispatch } from 'react-redux';

const LoginSignupWrapper = ({ children, text }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const fetchUser = useCallback(async () => {
    try {
      const user = (await getUser()).data;
      const articles = (await getUserArticles()).data;
      dispatch(userLogin(user, articles));
      history.push('/articles');
    } catch (error) {
      return;
    }
  }, [history, dispatch]);

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