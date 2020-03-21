import React from 'react';
import ReactDOM from 'react-dom';
import Auth from './components/Auth';
import Home from './components/Home';
import Nav from './components/NavBar';
import Chatroom from './components/Chatroom';
import Logout from './components/Logout';
import DeleteAccount from './components/DeleteAccount';
import { AuthProvider } from './context/Context';
import { ThemeProvider } from 'styled-components';
import { themeObj } from './context/Context';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import './index.scss';

function App() {
  const currentUser = JSON.parse(sessionStorage.getItem('CurrentUser')) || null;

  const [isAuthed, setAuthed] = React.useState({
    activeUserName: currentUser?.name ?? null,
    activeUserId: currentUser?.Id ?? null,
    isAuthenticated: currentUser !== null,
  });

  return (
    <ThemeProvider theme={themeObj}>
      <AuthProvider value={isAuthed}>
        <Nav />

        {!isAuthed.isAuthenticated && <Redirect to='/' />}

        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/chat' component={Chatroom} />
          <Route
            path='/authorize'
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
