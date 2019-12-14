import React from 'react';
import { AuthContext } from '../context/Context';
import { Redirect } from 'react-router-dom';

export default function Logout({ setAuth }) {
  const { user, authed } = React.useContext(AuthContext);
  const usersArray = JSON.parse(localStorage.getItem('Users'));

  const updatedUsers = usersArray.map(obj => {
    if (obj.id === user) {
      obj.loggedIn = false;
      return obj;
    }
    return obj;
  });

  localStorage.setItem('Users', JSON.stringify(updatedUsers));

  setTimeout(() => {
    setAuth({ user: '', authed: false });
  }, 2000);

  return !authed ? <Redirect to='/' /> : <h1>{`Logging ${user} out`}</h1>;
}
