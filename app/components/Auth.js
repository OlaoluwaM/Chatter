import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTransition, useSpring, animated } from 'react-spring';

const AuthPage = styled.div.attrs({
  className: 'auth-page',
})`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  background: inherit;
  align-items: center;
  justify-content: center;
`;

const SwitchArea = styled(animated.div)`
  flex-basis: 40%;
  width: 40%;
  background: inherit;
  height: 100%;
  color: var(--white);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  background: var(--purple-gradient);
  z-index: 5;

  h1 {
    margin-bottom: 65px;
    font-family: var(--font1);
    font-size: 3.7rem;
    font-weight: 500;
    margin-top: -30px;
  }
`;

const FormContainer = styled(animated.form)`
  display: flex;
  color: #000;
  background: var(--white);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60%;
  flex-basis: 60%;
  height: 100%;
  position: relative;
`;

const InputContainer = styled.div`
  width: 60%;
  color: inherit;
  height: 4.5%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 70px;
  background-color: transparent;
`;

const Bar = styled.span.attrs({
  className: 'bar',
})`
  display: block;
  position: absolute;
  top: 99%;
  left: 6.5px;
  width: 96.5%;
  height: 9%;
  border-radius: 50px;
  background-color: rgba(127, 83, 172, 0.4);

  ::before {
    content: '';
    position: absolute;
    top: 2%;
    left: 0px;
    width: 0%;
    height: 100%;
    border-radius: 50px;
    background-color: rgba(127, 83, 172, 1);
    transition: 0.3s ease;
  }
`;

const Input = styled.input.attrs({
  className: 'inputField',
})`
  flex-basis: 97%;
  width: 97%;
  color: inherit;
  border: none;
  transition: 0.7s ease;
  outline: none;
  background-color: transparent;
  text-indent: 12px;
  font-family: var(--font2);
  font-size: 1.2rem;
  padding-bottom: 0px;

  &:focus ~ label.inputLabel,
  &:valid ~ label.inputLabel {
    top: -22px;
    font-size: 15px;
    color: var(--purple);
  }

  &:focus ~ .bar:before {
    width: 100%;
  }
`;

const FormTitle = styled.h1`
  margin-bottom: 55px;
  font-family: var(--font1);
  font-size: 3.8rem;
  letter-spacing: 0.2rem;
  font-weight: 800;
`;

const InputLabel = styled.label.attrs({
  className: 'inputLabel',
})`
  color: rgba(0, 0, 0, 0.4);
  font-size: 1.1rem;
  font-weight: normal;
  position: absolute;
  font-family: var(--font2);
  pointer-events: none;
  left: 15px;
  top: 7px;
  transition: 0.2s ease all;
`;

const Button = styled.button`
  border: 1.4px solid var(--white);
  font-size: 1.1rem;
  color: inherit;
  padding: 20px 40px;
  width: 270px;
  text-transform: uppercase;
  cursor: pointer;
  font-family: var(--font2);
  border-radius: 50px;
  background: transparent;
  outline: none;
`;

const SubmitButton = styled(Button)`
  background: var(--purple);
  border: none;
  color: var(--white);
`;

export function Auth() {
  const [state, setState] = React.useState('login');

  const handleSubmit = e => {
    e.preventDefault();
    e.reset();
  };

  if (state === 'login') {
    return (
      <AuthPage>
        <SwitchArea>
          <h1>New Here ?</h1>
          <Button>Sign Up</Button>
        </SwitchArea>
        <FormContainer onSubmit={handleSubmit} autoComplete="off">
          <Login />
        </FormContainer>
      </AuthPage>
    );
  } else {
    return (
      <AuthPage>
        <SwitchArea>
          <h1>Welcome Back!</h1>
          <Button>Login</Button>
        </SwitchArea>
        <FormContainer onSubmit={handleSubmit} autoComplete="off">
          <SignUp />
        </FormContainer>
      </AuthPage>
    );
  }
}

function Login() {
  return (
    <React.Fragment>
      <FormTitle>LOGIN</FormTitle>
      <InputField name="email" label="Email" />
      <InputField name="passcode" type="password" label="Password" />
      <SubmitButton as="input" type="submit" name="btn" value="Login" />
    </React.Fragment>
  );
}

function SignUp() {
  return (
    <React.Fragment>
      <FormTitle style={{ fontSize: '3.5rem' }}>Create An Account</FormTitle>
      <InputField name="email" label="Email" />
      <InputField name="passcode" type="password" label="Password" />
      <InputField
        name="confirm-passcode"
        type="password"
        label="Confirm Password"
      />
      <SubmitButton as="input" type="submit" name="btn" value="Sign up" />
    </React.Fragment>
  );
}

function InputField({ name, required, type, label, ...rest }) {
  return (
    <InputContainer>
      <Input {...rest} type={type} required={required} name={name} />
      <Bar />
      <InputLabel>{label}</InputLabel>
    </InputContainer>
  );
}

InputField.defaultProps = {
  required: true,
  type: 'text',
};

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
