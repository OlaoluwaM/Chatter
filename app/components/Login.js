import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FormContainer = styled.form`
  display: flex;
  border-radius: 30px;
  border: 3px inset transparent;
  color: white;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40%;
  height: 60%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  text-indent: 12px;
  background-color: transparent;
  font-family: var(--font2);
  font-size: 1.2rem;
  padding-bottom: 0px;

  &:focus ~ label.inputLabel,
  &:valid ~ label.inputLabel {
    top: -19px;
    font-size: 14px;
    color: var(--white);
    opacity: 1;
  }
`;

const InputContainer = styled.div`
  width: 80%;
  color: inherit;
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 72px;

  ::after {
    content: '';
    position: absolute;
    top: 99%;
    left: 0;
    width: 100%;
    height: 7%;
    border-radius: 50px;
    background-color: rgba(245, 245, 245, 0.4);
  }
  ::before {
    content: '';
    position: absolute;
    top: 99%;
    left: 0;
    width: ${props => (props.isFocus ? '100%' : '0%')};
    height: 7%;
    border-radius: 50px;
    background-color: white;
    transition: 0.4s ease-in-out;
  }
`;

const FormTitle = styled.h1`
  margin-bottom: 55px;
  font-family: var(--font1);
  font-size: 3.8rem;
  letter-spacing: 0.2rem;
  font-weight: 700;
`;

const InputLabel = styled.label.attrs({
  className: 'inputLabel',
})`
  color: var(--white);
  opacity: 0.4;
  font-size: 1.1rem;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 15px;
  top: 7px;
  transition: 0.2s ease all;
`;

const iconStyles = {
  width: '2em',
  height: '1.6em',
  color: 'rgba(255, 255, 255, 1)',
};

export function Login() {
  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <FormContainer>
      <FormTitle>LOGIN</FormTitle>
      <InputField name="email" label="Email" />
      <InputField name="passcode" type="password" label="Password" />
      <p style={{ marginTop: '30px' }}>
        New here? <strong style={{ fontWeight: 700 }}>Sign Up</strong> 👈
      </p>
    </FormContainer>
  );
}

function InputField({ name, required, type, label, ...rest }) {
  return (
    <InputContainer>
      <Input {...rest} type={type} required={required} name={name} />
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
