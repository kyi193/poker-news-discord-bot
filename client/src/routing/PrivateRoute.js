import React, { useCallback, useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router';
import { getUser, getUserArticles } from '../utils/apiEndpoints';
import { useDispatch } from 'react-redux';
import { userLogin } from '../actions';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  const [userLoaded, setUserLoaded] = useState(false);
  const [isBusy, setBusy] = useState(true);

  const getUserInfo = useCallback(async () => {
    try {
      const user = (await getUser()).data.user;
      const articles = (await getUserArticles()).data;
      dispatch(userLogin(user, articles));
      setUserLoaded(true);
      setBusy(false);
    } catch (error) {
      console.error(error);
      setUserLoaded(false);
      setBusy(false);
    }
  }, [dispatch]);

  useEffect(() => {
    setBusy(true);
    getUserInfo();
  }, [getUserInfo]);

  if (isBusy) {
    return null;
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        !userLoaded ? <Redirect to='/login' /> : <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;
