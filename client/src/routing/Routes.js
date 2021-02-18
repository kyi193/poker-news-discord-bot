import React from 'react';
import { Switch, Route } from 'react-router';
import ArticleFeed from '../components/ArticleFeed';
import PrivateRoute from './PrivateRoute';
import Register from '../pages/Register';
import Navbar from '../components/Navbar'

const Routes = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <PrivateRoute exact path='/articles' component={ArticleFeed} />
      </Switch>
    </>
  );
};

export default Routes;
