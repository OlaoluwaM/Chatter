import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useIdle } from 'react-use';
import { ThemeProvider } from 'styled-components';
import { AuthProvider, themeObj } from '../context/Context';
import Auth from './Auth';
import Chatroom from './Chatroom';
import Home from './Home';
import Nav from './NavBar';

// TODO Let application color scheme match color scheme of chatArea
// TODO Refactor

export default function App() {
  const isIdle = useIdle(1200e3);
  const currentUserName = sessionStorage.getItem('CurrentUser');

  const [isAuthed, setAuthed] = React.useState({
    activeUserName: currentUserName ?? null,
    isAuthenticated: !!currentUserName,
  });

  React.useEffect(() => {
    if (isIdle && isAuthed.isAuthenticated) {
      console.log('logging you out');
      sessionStorage.removeItem('CurrentUser');
      setCurrentUserName(null);
      setAuthed({ activeUserName: null, isAuthenticated: false });
    }
  }, [isIdle]);

  return (
    <Router>
      <ThemeProvider theme={themeObj}>
        <AuthProvider value={isAuthed}>
          {!isAuthed.isAuthenticated && <Nav />}

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