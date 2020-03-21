import React from 'react';
import styled from 'styled-components';
import { spring } from '../utils/motionObj';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../context/Context';
import { motion, AnimatePresence } from 'framer-motion';
import { headerVariant, buttonVariant } from '../utils/motionObj';

const DeleteAccPage = styled.div.attrs({
  className: 'wrapper',
})`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    color: red;
    font-size: 4rem;
    font-weight: 800;
    text-transform: uppercase;
    font-family: var(--font1);
  }
`;

const DeleteBtn = styled(motion.button)`
  text-transform: uppercase;
  font-weight: bolder;
  background: red;
  color: ${({ theme }) => theme.main};
  outline: none;
  border: none;
  margin-top: 30px;
`;

export default function DeleteAccount({ setAuth }) {
  const [delBtnHasBeenClicked, setButtonClickState] = React.useState(false);
  const { activeUserName: user, isAuthenticated } = React.useContext(
    AuthContext
  );

  React.useEffect(() => {
    if (delBtnHasBeenClicked) {
      const users = JSON.parse(localStorage.getItem('Users'));

      const currentUserIndex = users.findIndex(
        ({ id, loggedIn }) => id === username && loggedIn === true
      );

      const updatedUsersArray = users.filter(
        (o, ind) => ind !== currentUserIndex
      );

      localStorage.setItem('Users', JSON.stringify(updatedUsersArray));
      sessionStorage.removeItem('CurrentUser');
      localStorage.removeItem(`${username}M`);

      setTimeout(() => {
        setAuth({ activeUserName: null, isAuthenticated: false });
      }, 2000);
    }
  }, [delBtnHasBeenClicked]);

  return (
    <>
      {!isAuthenticated ? (
        <Redirect to='/' />
      ) : (
        <DeleteAccPage>
          <motion.h1
            variants={headerVariant}
            initial='hidden'
            animate='visible'>
            Warning, Danger Zone
          </motion.h1>
          <AnimatePresence>
            <DeleteBtn
              key='delete-button'
              exit='hidden'
              layoutTransition={spring}
              variants={buttonVariant}
              initial='hidden'
              animate='visible'
              className='button'
              disabled={delBtnHasBeenClicked}
              onClick={() => setButtonClickState(true)}>
              {delBtnHasBeenClicked ? 'Deleting Account' : 'Delete my account'}
            </DeleteBtn>
          </AnimatePresence>
        </DeleteAccPage>
      )}
    </>
  );
}
