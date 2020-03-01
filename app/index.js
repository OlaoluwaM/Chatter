import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Auth from './components/Auth';
import Home from './components/Home';
import Nav from './components/NavBar';
import Chatroom from './components/Chatroom';
import Logout from './components/Logout';
import DeleteAccount from './components/DeleteAccount';
import { AuthProvider } from './context/Context';
import { ThemeProvider } from 'styled-components';
import { themeObj } from './context/Context';
import './index.scss';

function App() {
  const currentUser = JSON.parse(sessionStorage.getItem('CurrentUser')) || '';

  const [isAuthed, setAuthed] = React.useState({
    user: currentUser ? currentUser.name : '',
    color: currentUser ? currentUser.color : themeObj.sub,
    authed: currentUser !== '',
  });

  return (
    <ThemeProvider theme={themeObj}>
      <AuthProvider value={isAuthed}>
        <Nav />

        {!isAuthed.authed && <Redirect to='/' />}

        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/Chat' component={Chatroom} />
          <Route
            path='/Auth'
            render={props => <Auth {...props} setAuth={setAuthed} />}
          />
          <Route
            path='/Logout'
            render={props => <Logout {...props} setAuth={setAuthed} />}
          />
          <Route
            path='/DeleteAccount'
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
