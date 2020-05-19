import { motion } from 'framer-motion';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext, ChatContext } from '../context/Context';
import { updateUserProfile } from '../utils/authFunc';
import { extractFormData, handleSbResponse } from '../utils/helper';
import DeleteAccount from './DeleteAccount';
import { InputField, SimpleInputField, SubmitButton } from './Form-Components';
import Logout from './Logout';

const SettingContainer = styled.div.attrs({
  className: 'wrapper',
})`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.primaryColor};

  form,
  ${SubmitButton} {
    position: relative;
    margin-left: 13%;
    margin-right: auto;
  }
`;

const Form = styled(motion.form)`
  width: 75%;
  height: 63%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-left: 0;
  padding-right: 1%;
  margin-top: 3%;
`;

function UpdateProfile({ setAuth }) {
  const { sb } = React.useContext(ChatContext);
  const { activeUserName } = React.useContext(AuthContext);

  const [inputFieldError, setInputFieldError] = React.useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (inputFieldError) return;
    const formData = extractFormData(new FormData(e.target));

    const [profileData, newUsername, profileDataType] = updateUserProfile(
      formData,
      activeUserName
    );

    if (profileDataType === 'file') {
      sb.updateCurrentUserInfoWithProfileImage(
        '',
        profileData,
        handleSbResponse
      );
    } else sb.updateCurrentUserInfo(newUsername, profileData, handleSbResponse);

    if (newUsername) {
      setAuth(prevObj => ({ ...prevObj, activeUserName: newUsername }));
    }
  };

  return (
    <SettingContainer>
      <Form onSubmit={handleSubmit} autoComplete='off'>
        <InputField
          name='newUsername'
          label='New username'
          key='newUsername'
          className='simple-input'
          required={false}
          onSubmit={e => console.log(e)}
          formState={{
            formType: 'sign up',
            setInputFieldError,
          }}
        />

        <InputField
          name='newPassword'
          label='New password'
          key='newPassword'
          className='simple-input'
          required={false}
          type='password'
          formState={{
            formType: 'sign up',
            setInputFieldError,
          }}
        />

        <InputField
          type='url'
          key='profileUrl'
          label='New profile image url'
          name='profileUrl'
          className='simple-input'
          required={false}
          formState={{
            formType: 'sign up',
            setInputFieldError,
          }}
        />

        <SimpleInputField
          type='file'
          label='New profile image file'
          name='profileFile'
          key='profileFile'
          addBar={false}
        />

        <SubmitButton
          disabled={inputFieldError}
          style={{ marginLeft: 0, width: '45%' }}
          value='Save Changes'
          type='submit'
          name='btn'
        />
      </Form>
    </SettingContainer>
  );
}

export default function Settings({ setAuth }) {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/logout`}>
        <Logout setAuth={setAuth} />
      </Route>

      <Route path={`${path}/delete-account`}>
        <DeleteAccount setAuth={setAuth} />
      </Route>

      <Route exact path={path}>
        <UpdateProfile setAuth={setAuth} />
      </Route>
    </Switch>
  );
}
