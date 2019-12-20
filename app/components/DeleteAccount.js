import React from 'react';
import styled from 'styled-components';
import { AuthContext } from '../context/Context';
import { Wrapper } from './UI-components';
import { Redirect } from 'react-router-dom';

const DeleteAccPage = styled(Wrapper)`
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

const DeleteBtn = styled.button`
  text-transform: uppercase;
  font-weight: bolder;
  background: red;
  color: var(--main);
  outline: none;
  border: none;
  margin-top: 30px;
`;

export default function DeleteAccount({ setAuth }) {
  const [delBtnHasBeenClicked, setButtonClickState] = React.useState(false);
  const { user, authed } = React.useContext(AuthContext);
  const warningMessage =
    'Warning, this action is irreversible do you want to proceed with it';

  React.useEffect(() => {
    if (delBtnHasBeenClicked) {
      const users = JSON.parse(localStorage.getItem('Users'));
      const currentUserIndex = users.findIndex(
        ({ id, loggedIn }) => id === user && loggedIn === true
      );
      const updatedUsersArray = users.filter(
        (o, ind) => ind !== currentUserIndex
      );

      localStorage.setItem('Users', JSON.stringify(updatedUsersArray));
      sessionStorage.removeItem('CurrentUser');
      setTimeout(() => {
        setAuth({ user: '', authed: false });
      }, 2000);
    }
  }, [delBtnHasBeenClicked]);

  return (
    <React.Fragment>
      {!authed ? (
        <Redirect to='/' />
      ) : (
        <DeleteAccPage>
          <h1>Warning, Danger Zone</h1>
          <DeleteBtn
            className='button'
            disabled={delBtnHasBeenClicked}
            onClick={() => setButtonClickState(true)}>
            {delBtnHasBeenClicked ? 'Deleting Account' : 'Delete my account'}
          </DeleteBtn>
        </DeleteAccPage>
      )}
    </React.Fragment>
  );
}
