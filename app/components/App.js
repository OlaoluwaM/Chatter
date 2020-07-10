import React from 'react';
import Home from './Home';

import { Auth } from 'aws-amplify';
import { Route, Switch } from 'react-router-dom';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
      </Switch>
    </div>
  );
}
