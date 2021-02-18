import React from 'react';
import { Switch, Route } from 'react-router';
import ArticleFeed from '../components/ArticleFeed';
import PrivateRoute from './PrivateRoute';
import Login from '../pages/Login';

const Routes = () => {
  return (
    <>
      <Switch>
        <PrivateRoute exact path='/articles' component={ArticleFeed} />
        <Route path='/' component={Login} />
      </Switch>
    </>
  );
};

export default Routes;
