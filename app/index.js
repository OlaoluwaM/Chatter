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
import { AuthProvider } from './context/Context';
import './index.css';

function App() {
  const users = JSON.parse(localStorage.getItem('Users')) || [];
  const loggedInUser = users.find(({ loggedIn }) => loggedIn === true);

  const [isAuthed, setAuthed] = React.useState({
    user: loggedInUser === undefined ? '' : loggedInUser.id,
    authed: loggedInUser !== undefined,
  });

  return (
    <AuthProvider value={isAuthed}>
      <div>
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
        </Switch>
      </div>
    </AuthProvider>
  );
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);

module.hot.accept();
