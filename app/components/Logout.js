import React from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../context/Context';
import { regularTexVariant } from '../utils/motionObj';
import { motion, AnimatePresence } from 'framer-motion';

const LogoutPage = styled.div.attrs({
  className: 'wrapper',
})`
  width: 100%;
  height: calc(100% - 7%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-family: var(--font2);
    font-size: 3.8rem;
    font-weight: 300;
    text-transform: capitalize;
  }
`;

export default function Logout({ setAuth }) {
  const { activeUserId, isAuthenticated } = React.useContext(AuthContext);
  const usersArray = JSON.parse(localStorage.getItem('Users'));

  const updatedUsers = usersArray.map(obj => {
    if (obj.Id === activeUserId) {
      obj.loggedIn = false;
      return obj;
    }
    return obj;
  });

  localStorage.setItem('Users', JSON.stringify(updatedUsers));
  sessionStorage.removeItem('CurrentUser');

  setTimeout(() => {
    setAuth({
      activeUserName: null,
      activeUserId: null,
      isAuthenticated: false,
    });
  }, 2000);

  return !isAuthenticated ? (
    <Redirect to='/' />
  ) : (
    <LogoutPage>
      <AnimatePresence>
        <motion.h1
          key='Logout-text'
          initial='hidden'
          animate='visible'
          exit='hidden'
          variants={regularTexVariant}>
          Logging out
        </motion.h1>
      </AnimatePresence>
    </LogoutPage>
  );
}
