import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { useIdle } from 'react-use';
import { ThemeProvider } from 'styled-components';
import { AuthProvider, themeObj } from '../context/Context';
import Auth from './Auth';
import Chatroom from './Chatroom';
import Home from './Home';
import Nav from './NavBar';

export default function App() {
  const isIdle = useIdle(1200e3);

  const [currentUserName, setCurrentUserName] = React.useState(
    sessionStorage.getItem('CurrentUser')
  );

  const [isAuthed, setAuthed] = React.useState({
    activeUserName: currentUserName ?? null,
    isAuthenticated: !!currentUserName,
  });

  return (
    <Router>
      <ThemeProvider theme={themeObj}>
        <AuthProvider value={isAuthed}>
          {!isAuthed.isAuthenticated && <Nav />}

          {!isAuthed.isAuthenticated && <Redirect to='/' />}

          {isIdle && isAuthed.isAuthenticated && (
            <Redirect exact to='/chat/settings/logout' />
          )}

          <Switch>
            <Route path='/chat'>
              <Chatroom setAuth={setAuthed} />
            </Route>

            <Route
              path='/authenticate'
              render={props => <Auth {...props} setAuth={setAuthed} />}
            />

            <Route exact path='/'>
              <Home />
            </Route>
          </Switch>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}
