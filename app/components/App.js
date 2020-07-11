import React from 'react';
import Home from './Home';
import NavBar from './NavBar';

import { Auth } from 'aws-amplify';
import { themeObj } from './context/context';
import { ThemeProvider } from 'styled-components';
import { Route, Switch } from 'react-router-dom';

export default function App() {
  return (
    <ThemeProvider theme={themeObj}>
      <div>
        <NavBar />

        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
        </Switch>
      </div>
    </ThemeProvider>
  );
}
