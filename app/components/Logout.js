import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../context/Context';
import { buttonVariant, headerVariant } from '../utils/motionObj';
import { DeleteAccPage, DeleteBtn } from './DeleteAccount';

const LogoutPage = styled(DeleteAccPage).attrs({
  className: 'wrapper',
})`
  & > h1 {
    font-family: var(--font2);
    font-size: 3.8rem;
    font-weight: 300;
    margin-bottom: 2%;
    color: ${({ theme }) => theme.black};
  }
`;

const LogoutBtn = styled(DeleteBtn).attrs({
  className: 'button',
  variants: buttonVariant,
  exit: 'hidden',
  initial: 'hidden',
  animate: 'visible',
  whileTap: 'tap',
})`
  width: 20%;
  background: ${({ theme }) => theme.secondaryColorDark};
`;

export default function Logout({ setAuth }) {
  const [loggedOut, setLoggedOut] = React.useState(false);
  const { isAuthenticated } = React.useContext(AuthContext);

  const logoutHandler = () => {
    sessionStorage.removeItem('CurrentUser');

    setLoggedOut(true);
    setTimeout(() => {
      setAuth({ activeUserName: null, isAuthenticated: false });
    }, 2000);
  };

  return !isAuthenticated && loggedOut ? (
    <Redirect to='/' />
  ) : (
    <LogoutPage>
      <AnimatePresence>
        <motion.h1
          key='logout-h1'
          initial='hidden'
          animate='visible'
          exit='hidden'
          positionTransition={true}
          variants={headerVariant}>
          {loggedOut ? 'Logging you out' : 'Log out'}
        </motion.h1>

        {!loggedOut && (
          <LogoutBtn
            key='logout-btn'
            positionTransition={true}
            onClick={logoutHandler}>
            Leave
          </LogoutBtn>
        )}
      </AnimatePresence>
    </LogoutPage>
  );
}
