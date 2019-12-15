import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { animated, useTrail, config } from 'react-spring';
import { loginComponents, signUpComponents } from './Form-Components';
import { AuthContext } from '../context/Context';
import { extractFormData } from '../utils/helper';

const FormContainer = styled(animated.form)`
  display: flex;
  color: var(--sub);
  background: inherit;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 85%;
  flex-basis: 85%;
  height: fit-content;
  position: relative;
  transition: 0.3s ease;
`;

export default function Form({ setAuth, formType }) {
  const [components, setComponents] = React.useState([]);
  const [error, setError] = React.useState('');
  const formRef = React.useRef();
  const { authed } = React.useContext(AuthContext);

  React.useEffect(() => {
    setComponents(formType === 'login' ? loginComponents : signUpComponents);
    return () => {
      setComponents([]);
      setError('');
    };
  }, [formType]);

  const handleSignUp = data => {
    const users = JSON.parse(localStorage.getItem('Users')) || [];
    const { id, passcode, confirmPasscode } = data;

    if (users.some(({ id: name }) => id === name)) {
      setError('User Already Exists');
    } else if (passcode !== confirmPasscode) {
      setError('Your passwords do not match');
    } else {
      data['loggedIn'] = true;
      users.push(data);
      formRef.current.style.opacity = 0.4;

      setTimeout(() => {
        localStorage.setItem('Users', JSON.stringify(users));
        sessionStorage.setItem('CurrentUser', JSON.stringify(data));
        setAuth({ user: id, authed: true });
      }, 1500);
    }
  };

  const handleLogin = data => {
    if (JSON.parse(localStorage.getItem('Users')) === null) {
      setError('User does not exist');
    }

    const { id: username, passcode } = data;
    const users = JSON.parse(localStorage.getItem('Users'));

    const userData = users.find(
      ({ id: DBusername, passcode: DBpasscode }) =>
        username === DBusername && passcode === DBpasscode
    );
    const userDataCorrect = userData !== undefined;

    if (userDataCorrect) {
      formRef.current.style.opacity = 0.4;

      setTimeout(() => {
        let index = users.indexOf(userData);
        userData.loggedIn = true;
        users.splice(index, 1, userData);
        localStorage.setItem('Users', JSON.stringify(users));
        sessionStorage.setItem('CurrentUser', JSON.stringify(userData));

        setAuth({ user: username, authed: true });
      }, 1500);
    } else {
      setError('Username or Password is incorrect');
    }
  };

  const handleSubmit = e => {
    setError('');
    const formData = new FormData(e.target);
    const extractedFormData = extractFormData(formData);

    e.preventDefault();
    if (formType === 'login') {
      handleLogin(extractedFormData);
    } else {
      handleSignUp(extractedFormData);
    }
  };

  const trail = useTrail(components.length, {
    from: { opacity: 0, transform: 'translate3d(0, 50px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0px, 0)' },
    reset: true,
    config: config.gentle,
  });

  const condition = components.length === 0;

  return (
    <FormContainer ref={formRef} onSubmit={handleSubmit} autoComplete='off'>
      {authed && <Redirect to='/' />}

      {condition === false &&
        !authed &&
        trail.map((props, index) => {
          const obj = components[index];
          const Component = obj.component;

          return obj.innerText === '' ? (
            <Component
              key={index}
              error={error}
              {...obj.cProps}
              style={props}
            />
          ) : (
            <Component key={index} {...obj.cProps} style={props}>
              {obj.innerText}
            </Component>
          );
        })}
    </FormContainer>
  );
}

Form.propTypes = {
  formType: PropTypes.string.isRequired,
};
