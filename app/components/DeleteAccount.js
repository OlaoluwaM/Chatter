import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { Redirect } from 'react-router-dom';
import store from 'store';
import styled from 'styled-components';
import { AuthContext } from '../context/Context';
import { buttonVariant, headerVariant } from '../utils/motionObj';

export const DeleteAccPage = styled.div.attrs({
  className: 'wrapper',
})`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    color: red;
    font-size: 3.5rem;
    font-weight: 800;
    width: 80%;
    text-transform: uppercase;
    font-family: var(--font1);
    text-align: center;
    margin-bottom: 10px;
  }
`;

export const DeleteBtn = styled(motion.button)`
  text-transform: uppercase;
  font-weight: bolder;
  background: red;
  color: ${({ theme }) => theme.primaryColor};
  outline: none;
  border: none;
  margin-top: 30px;
`;

export default function DeleteAccount({ setAuth }) {
  const [isDeleted, setDeleted] = React.useState(false);
  const { activeUserName: username, isAuthenticated } = React.useContext(
    AuthContext
  );

  const deleteUser = () => {
    const users = store.get('users');

    const currentUserIndex = users.findIndex(({ name }) => name === username);

    users.splice(currentUserIndex, 1);

    store.set('users', users);
    sessionStorage.removeItem('CurrentUser');

    setDeleted(true);
    setTimeout(() => {
      setAuth({ activeUserName: null, isAuthenticated: false });
    }, 2000);
  };

  return !isAuthenticated && isDeleted ? (
    <Redirect to='/' />
  ) : (
    <DeleteAccPage>
      <AnimatePresence>
        <motion.h1
          key='delete-h1'
          variants={headerVariant}
          initial='hidden'
          exit='hidden'
          positionTransition={true}
          animate='visible'>
          {isDeleted ? 'Deleting your account' : 'Warning, Danger Zone'}
        </motion.h1>

        {!isDeleted && (
          <DeleteBtn
            key='delete-button'
            exit='hidden'
            positionTransition={true}
            variants={buttonVariant}
            whileTap='tap'
            initial='hidden'
            animate='visible'
            className='button'
            onClick={deleteUser}>
            Delete my account
          </DeleteBtn>
        )}
      </AnimatePresence>
    </DeleteAccPage>
  );
}
