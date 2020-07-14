import React from 'react';
import Home from './Home';
import NavBar from './NavBar';

import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { themeObj, CurrentUserContext } from './context/context';

const Authenticate = React.lazy(() => import('./Auth'));

export default function App() {
  return (
    <ThemeProvider theme={themeObj}>
      <CurrentUserContext.Provider value={{}}>
        <div>
          <NavBar />

          <React.Suspense fallback={<p>Loading</p>}>
            <Switch>
              <Route exact path='/'>
                <Home />
              </Route>

              <Route path='/authenticate'>
                <Authenticate />
              </Route>
            </Switch>
          </React.Suspense>
        </div>
      </CurrentUserContext.Provider>
    </ThemeProvider>
  );
}
