import React from 'react';
import { Switch, Route } from 'react-router';
import ArticleFeed from '../components/ArticleFeed';
import PrivateRoute from './PrivateRoute';
import Register from '../pages/Register';

const Routes = () => {
  return (
    <>
      <Switch>
        <PrivateRoute exact path='/articles' component={ArticleFeed} />
        <Route path='/' component={Register} />
      </Switch>
    </>
  );
};

export default Routes;
