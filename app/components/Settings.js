import { motion } from 'framer-motion';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext, ChatContext } from '../context/Context';
import { updateUserProfile } from '../utils/authFunc';
import {
  extractFormData,
  handleSbResponse,
  normalize,
  rawDataType,
} from '../utils/helper';
import {
  buttonVariant,
  containerVariant,
  itemVariant2,
} from '../utils/motionObj';
import DeleteAccount from './DeleteAccount';
import { InputField, SubmitButton } from './Form-Components';
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

const formElemMotionProps = {
  variants: itemVariant2,
  positionTransition: true,
  exit: 'hidden',
};

function UpdateProfile({ setAuth }) {
  const [reset, setReset] = React.useState(false);
  const { sb } = React.useContext(ChatContext);
  const { activeUserName } = React.useContext(AuthContext);

  const [inputFieldError, setInputFieldError] = React.useState(() => {
    return JSON.stringify(new Array(4).fill(true));
  });
  console.count('re-rendered');
  console.log(inputFieldError);
  React.useEffect(() => {
    if (reset) {
      setInputFieldError(JSON.stringify(new Array(4).fill(true)));
      setReset(false);
    }
  }, [reset]);

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
        newUsername,
        profileData,
        handleSbResponse
      );
    } else sb.updateCurrentUserInfo(newUsername, profileData, handleSbResponse);

    const hasNewProfilePic =
      !!profileData?.name || rawDataType(normalize(profileData)) === 'string';

    if (!(newUsername || hasNewProfilePic)) {
      return;
    } else {
      let updatedDataObj = {};
      if (newUsername && hasNewProfilePic) {
        updatedDataObj = {
          activeUserName: newUsername,
          profilePic: profileData,
        };
      } else if (hasNewProfilePic) {
        updatedDataObj = { profilePic: profileData };
      } else {
        updatedDataObj = { activeUserName: newUsername };
      }

      setAuth(prevObj => ({ ...prevObj, ...updatedDataObj }));
    }
    setReset(true);

    e.currentTarget
      .querySelectorAll('.active')
      .forEach(elem => elem.classList.remove('active'));
  };

  return (
    <SettingContainer>
      <Form
        variants={containerVariant}
        onSubmit={handleSubmit}
        initial='hidden'
        animate='visible'
        exit='hidden'
        autoComplete='off'>
        <InputField
          name='newUsername'
          label='New username'
          key='newUsername'
          index={0}
          shouldReset={reset}
          className='simple-input'
          required={false}
          motionProps={{ ...formElemMotionProps }}
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
          index={1}
          motionProps={{ ...formElemMotionProps }}
          shouldReset={reset}
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
          index={2}
          shouldReset={reset}
          motionProps={{ ...formElemMotionProps }}
          formState={{
            formType: 'sign up',
            setInputFieldError,
          }}
        />

        <InputField
          type='file'
          label='New profile image file'
          name='profileFile'
          key='profileFile'
          className='for-input-file'
          index={3}
          required={false}
          motionProps={{ ...formElemMotionProps }}
          shouldReset={reset}
          addBar={false}
          formState={{
            formType: 'sign up',
            setInputFieldError,
          }}
        />

        <SubmitButton
          variants={buttonVariant}
          whileTap='tap'
          positionTransition={true}
          exit='hidden'
          disabled={JSON.parse(inputFieldError).every(v => v === true)}
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
