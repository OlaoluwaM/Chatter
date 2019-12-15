import React from 'react';
import { AuthContext } from '../context/Context';
import { Redirect } from 'react-router-dom';
import { Wrapper } from './UI-components';
import styled from 'styled-components';

const LogoutPage = styled(Wrapper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-family: var(--font1);
    font-size: 3.8rem;
    font-weight: 100;
    text-transform: capitalize;
  }
`;

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
  sessionStorage.removeItem('CurrentUser');

  setTimeout(() => {
    setAuth({ user: '', authed: false });
  }, 2000);

  return !authed ? (
    <Redirect to='/' />
  ) : (
    <LogoutPage>
      <h1>{`Logging ${user} out`}</h1>
    </LogoutPage>
  );
}
