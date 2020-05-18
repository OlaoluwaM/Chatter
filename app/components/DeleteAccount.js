import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { Redirect } from 'react-router-dom';
import store from 'store';
import styled from 'styled-components';
import { AuthContext } from '../context/Context';
import { buttonVariant, headerVariant } from '../utils/motionObj';

const DeleteAccPage = styled.div.attrs({
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

const DeleteBtn = styled(motion.button)`
  text-transform: uppercase;
  font-weight: bolder;
  background: red;
  color: ${({ theme }) => theme.primaryColor};
  outline: none;
  border: none;
  margin-top: 30px;
`;

export default function DeleteAccount({ setAuth }) {
  const [deleting, setDeleting] = React.useState(false);
  const { activeUserName: username, isAuthenticated } = React.useContext(
    AuthContext
  );

  const deleteUser = () => {
    const users = store.get('users');

    const currentUserIndex = users.findIndex(({ name }) => name === username);

    const updatedUsersArray = users.filter(
      (_, ind) => ind !== currentUserIndex
    );

    store.set('users', updatedUsersArray);
    sessionStorage.removeItem('CurrentUser');

    setDeleting(true);
    setTimeout(() => {
      setAuth({ activeUserName: null, isAuthenticated: false });
    }, 2000);
  };

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
              positionTransition={true}
              variants={buttonVariant}
              initial='hidden'
              animate='visible'
              className='button'
              onClick={deleteUser}>
              {deleting ? 'Deleting Account' : 'Delete my account'}
            </DeleteBtn>
          </AnimatePresence>
        </DeleteAccPage>
      )}
    </>
  );
}
