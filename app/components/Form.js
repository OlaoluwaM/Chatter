import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from './UI-components';
import { useSpring, animated, useTrail, config } from 'react-spring';

const InputContainer = styled(animated.div)`
  width: 50%;
  color: inherit;
  height: 31px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  position: relative;
  margin-bottom: 65px;
  background: transparent;
`;

const Bar = styled.span.attrs({
  className: 'bar',
})`
  display: block;
  position: relative;
  width: 96.5%;
  height: 3.5px;
  border-radius: 50px;
  background: rgba(153, 102, 204, 0.4);

  ::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0px;
    width: 0%;
    height: 100%;
    border-radius: 50px;
    background: rgba(153, 102, 204, 1);
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
  background: transparent;
  text-indent: 12px;
  font-family: var(--font2);
  font-size: 1rem;
  padding-bottom: 7px;

  &:focus ~ label.inputLabel,
  &:valid ~ label.inputLabel {
    top: -25px;
    font-size: 15px;
    color: var(--sub);
  }

  &:focus ~ .bar:before {
    width: 100%;
  }
`;

const FormTitle = styled(animated.h1)`
  margin-bottom: 65px;
  font-family: var(--font1);
  font-size: 3.8rem;
  letter-spacing: 0.2rem;
  font-weight: 1000;
`;

const InputLabel = styled.label.attrs({
  className: 'inputLabel',
})`
  color: rgba(153, 102, 204, 0.4);
  font-size: 1.1rem;
  font-weight: normal;
  position: absolute;
  font-family: var(--font2);
  pointer-events: none;
  left: 15px;
  top: 4px;
  transition: 0.2s ease all;
`;

const SubmitButton = styled(Button)`
  background: var(--sub);
  border: none;
  margin-bottom: 0px;
  color: var(--main);
`;

const AnimatedSubmitButton = animated(SubmitButton);

function InputField({ name, required, type, label, style, ...rest }) {
  return (
    <InputContainer style={style}>
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

export const loginComponents = [
  {
    component: FormTitle,
    cProps: {},
    innerText: 'Login',
    id: 1243,
  },
  {
    component: InputField,
    cProps: {
      name: 'email',
      label: 'Email',
    },
    innerText: '',
    id: 4234,
  },
  {
    component: InputField,
    cProps: {
      name: 'passcode',
      type: 'password',
      label: 'Password',
    },
    innerText: '',
    id: 2342,
  },
  {
    component: AnimatedSubmitButton,
    cProps: {
      as: 'input',
      type: 'submit',
      name: 'btn',
      value: 'Login',
    },
    innerText: '',
    id: 3454,
  },
];

export const signUpComponents = [
  {
    component: FormTitle,
    cProps: {},
    innerText: 'Create an account',
    id: 3423,
  },
  {
    component: InputField,
    cProps: {
      name: 'email',
      label: 'Email',
    },
    innerText: '',
    id: 5567,
  },
  {
    component: InputField,
    cProps: {
      name: 'passcode',
      type: 'password',
      label: 'Password',
    },
    innerText: '',
    id: 7687,
  },
  {
    component: InputField,
    cProps: {
      name: 'confirm-passcode',
      type: 'password',
      label: 'Confirm Password',
    },
    innerText: '',
    id: 3204,
  },
  {
    component: AnimatedSubmitButton,
    cProps: {
      as: 'input',
      type: 'submit',
      name: 'btn',
      value: 'Sign Up',
    },
    innerText: '',
    id: 2249,
  },
];
