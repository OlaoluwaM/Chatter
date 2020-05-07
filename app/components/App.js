import React from 'react';
import Nav from './NavBar';
import Home from './Home';
import Auth from './Auth';
import Logout from './Logout';
import Chatroom from './Chatroom';
import DeleteAccount from './DeleteAccount';
import { ThemeProvider } from 'styled-components';
import { AuthProvider, themeObj } from '../context/Context';
import { Redirect, Route, Switch } from 'react-router-dom';
import {
  debounce,
  documentVisibility,
  extractCurrentUserFromCookie,
  sessionTimeout,
  unloadEventListener,
} from '../utils/helper';

export default function App() {
  const [currentUserName, setCurrentUserName] = React.useState(
    sessionStorage.getItem('CurrentUser') ?? extractCurrentUserFromCookie()
  );

  const [isAuthed, setAuthed] = React.useState({
    activeUserName: currentUserName ?? null,
    isAuthenticated: !!currentUserName,
  });

  const memoizedVisibilityListener = React.useCallback(
    debounce(() => {
      alert('You will be logged out due to extended inactivity');
      setCurrentUserName(null);
      setAuthed({ activeUserName: null, isAuthenticated: false });
      sessionStorage.removeItem('CurrentUser');
      return;
    }, sessionTimeout()),
    []
  );

  React.useEffect(() => {
    if (!document.cookie || document.cookie.length < 4) return;
    const currentUser = extractCurrentUserFromCookie();
    sessionStorage.setItem('CurrentUser', currentUser);
    setCurrentUserName(currentUser);
    document.cookie = `CurrentUserName= ; expires=${new Date(
      0
    )}; max-age= ${-10}`;
  }, []);

  React.useEffect(() => {
    if (!isAuthed.isAuthenticated) return;
    document.addEventListener(documentVisibility(), memoizedVisibilityListener);
    window.addEventListener('beforeunload', unloadEventListener);

    return () => {
      document.removeEventListener(
        documentVisibility(),
        memoizedVisibilityListener
      );
      window.removeEventListener('beforeunload', unloadEventListener);
    };
  }, [isAuthed.isAuthenticated]);

  return (
    <ThemeProvider theme={themeObj}>
      <AuthProvider value={isAuthed}>
        {!isAuthed.isAuthenticated && <Nav />}

        {!isAuthed.isAuthenticated && <Redirect to='/' />}

        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/chat' component={Chatroom} />
          <Route
            path='/authenticate'
            render={props => <Auth {...props} setAuth={setAuthed} />}
          />
          <Route
            path='/logout'
            render={props => <Logout {...props} setAuth={setAuthed} />}
          />
          <Route
            path='/delete-account'
            render={props => <DeleteAccount {...props} setAuth={setAuthed} />}
          />
        </Switch>
      </AuthProvider>
    </ThemeProvider>
  );
}
