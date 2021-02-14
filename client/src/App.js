import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { theme } from "./themes/theme";
import ArticleFeed from './components/ArticleFeed';
import Login from './pages/Login';

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route exact path= "/articles" component={ArticleFeed} />
          <Route exact path= "/login" component={Login} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
