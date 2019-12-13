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
import { Chatroom } from './components/Chatroom';
import { AuthProvider } from './context/Context';
import './index.css';

function App() {
  const [isAuthed, setAuthed] = React.useState({ user: '', authed: false });

  return (
    <AuthProvider value={isAuthed}>
      <div>
        <Nav setAuth={setAuthed} />
        {!isAuthed.authed && <Redirect to='/' />}
        <Switch>
          <Route exact path='/' component={Home} />
          <Route
            path='/Auth'
            render={props => <Auth {...props} setAuth={setAuthed} />}
          />
          <Route path='/Chat' component={Chatroom} />
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
