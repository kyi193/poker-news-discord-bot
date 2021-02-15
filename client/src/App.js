import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducers';
import middleware from './middleware'; 
import { theme } from "./themes/theme";
import ArticleFeed from './components/ArticleFeed';
import Login from './pages/Login';

import "./App.css";

function App() {
  return (
    <Provider store={createStore(reducer, composeWithDevTools(middleware))}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route exact path= "/articles" component={ArticleFeed} />
            <Route exact path= "/login" component={Login} />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
