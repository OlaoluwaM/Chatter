import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSpring, animated, useTrail, config } from 'react-spring';
import { loginComponents, signUpComponents } from './Form';

// Styled Components Used on the Auth page, I don't want to abstract them because they are specific tot this page

const AuthPage = styled.div.attrs({
  className: 'auth-page',
})`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 94%;
  background: var(--main);
  align-items: center;
  justify-content: space-around;
  overflow: hidden;
`;

const FormContainer = styled(animated.form).attrs({
  className: 'form-container',
})`
  display: flex;
  color: var(--sub);
  background: inherit;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 75%;
  flex-basis: 85%;
  height: fit-content;
  position: relative;
`;

const SwitchText = styled.p`
  color: var(--sub);
  text-transform: uppercase;
  font-family: var(--font1);
  font-size: 1.2rem;
  cursor: pointer;
  font-weight: bolder;
`;

function Form({ formType }) {
  const [components, setComponents] = React.useState([]);

  React.useEffect(() => {
    setComponents(formType === 'login' ? loginComponents : signUpComponents);
    return () => setComponents([]);
  }, [formType]);

  const trail = useTrail(components.length, {
    from: { opacity: 0, transform: 'translate3d(0, 50px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0px, 0)' },
    reset: true,
    config: config.gentle,
  });

  const condition = components.length === 0;

  console.log({ condition, trail });
  return (
    <React.Fragment>
      {condition === false &&
        trail.map((props, index) => {
          const obj = components[index];
          const Component = obj.component;
          return obj.innerText === '' ? (
            <Component key={index} {...obj.cProps} style={props} />
          ) : (
            <Component key={index} {...obj.cProps} style={props}>
              {obj.innerText}
            </Component>
          );
        })}
    </React.Fragment>
  );
}

export default function Auth() {
  const [state, setState] = React.useState('login');

  const handleSubmit = e => {
    e.preventDefault();
    e.reset();
  };

  return (
    <AuthPage>
      <FormContainer onSubmit={handleSubmit} autoComplete="off">
        <Form formType={state} />
      </FormContainer>
      <SwitchText
        onClick={() => setState(s => (s === 'login' ? 'sign-up' : 'login'))}>
        {state === 'login' ? ' Create an account' : ' Log into your account'}
      </SwitchText>
    </AuthPage>
  );
}

Form.propTypes = {
  formType: PropTypes.string.isRequired,
};
