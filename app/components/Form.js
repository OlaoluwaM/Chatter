import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { animated, useTrail, config } from 'react-spring';
import { loginComponents, signUpComponents } from './Form-Components';
import { AuthContext } from '../context/Context';
import { extractFormData } from '../utils/helper';

const FormContainer = styled(animated.form).attrs({
  className: 'form-container',
})`
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
  const loadingRef = React.useRef();
  const isAuthed = React.useContext(AuthContext);

  React.useEffect(() => {
    setComponents(formType === 'login' ? loginComponents : signUpComponents);
    return () => {
      setComponents([]);
      setError('');
    };
  }, [formType]);

  const handleSignUp = data => {
    const { username, passcode, confirmPasscode } = data;
    if (passcode !== confirmPasscode) {
      setError('Your passwords do not match');
    } else {
      loadingRef.current.style.opacity = 0.4;
      setTimeout(() => {
        localStorage.setItem(username, JSON.stringify(data));
        setAuth(true);
      }, 1000);
    }
  };

  const handleLogin = data => {
    const { username, passcode } = data;
    if (JSON.parse(localStorage.getItem(username)) === null) {
      setError('User does not exist');
    }
    const { username: DBusername, passcode: DBpasscode } = JSON.parse(
      localStorage.getItem(username)
    );
    if (username === DBusername && passcode === DBpasscode) {
      loadingRef.current.style.opacity = 0.4;
      setTimeout(() => {
        setAuth(true);
      }, 1000);
    } else {
      setError('Username or Password is incorrect');
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const extractedFormData = extractFormData(formData);
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
    <FormContainer ref={loadingRef} onSubmit={handleSubmit} autoComplete='off'>
      {isAuthed && <Redirect to='/' />}
      {condition === false &&
        !isAuthed &&
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
