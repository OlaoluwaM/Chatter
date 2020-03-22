import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './components/NavBar';
import Auth from './components/Auth';
import Home from './components/Home';
import store from 'store';
import Logout from './components/Logout';
import Chatroom from './components/Chatroom';
import DeleteAccount from './components/DeleteAccount';
import { themeObj } from './context/Context';
import { AuthProvider } from './context/Context';
import { ThemeProvider } from 'styled-components';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import {
  documentVisibility,
  debounce,
  sessionTimeout,
  unloadEventListener,
  extractCurrentUserFromCookie,
} from './utils/helper';
import './index.scss';

function App() {
  const currentUserName =
    sessionStorage.getItem('CurrentUser') ?? extractCurrentUserFromCookie();

  const [isAuthed, setAuthed] = React.useState({
    activeUserName: currentUserName ?? null,
    isAuthenticated: !!currentUserName,
  });

  const memoizedVisibilityListener = React.useCallback(
    debounce(() => {
      alert('You will be logged out due to extended inactivity');
      setAuthed({ activeUserName: null, isAuthenticated: false });
    }, sessionTimeout()),
    []
  );

  React.useEffect(() => {
    if (!document.cookie) return;
    sessionStorage.setItem('CurrentUser', extractCurrentUserFromCookie());
    document.cookie = '';
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
        <Nav />

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

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);

module.hot.accept();
