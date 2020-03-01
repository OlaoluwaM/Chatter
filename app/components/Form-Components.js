import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { debounce, hexToRgb } from '../utils/helper';
import { inputValidation } from '../utils/authFunc';
import { InputInfoVariant } from '../utils/motionObj';
import { motion, AnimatePresence } from 'framer-motion';

export const FormTitle = styled(motion.h1)`
  margin: 0;
  color: ${({ theme }) => theme.black};
  text-align: center;
  font-family: var(--font2);
  font-size: 4.1rem;
  letter-spacing: 0.2rem;
  font-weight: 800;
  margin-top: 20px;
`;

export const Bar = styled.span`
  display: block;
  position: relative;
  width: 100%;
  height: 3.2%;
  flex-basis: 3.2%;
  border-radius: 50px;
  background: ${({ theme }) => hexToRgb(theme.black, 0.4)};

  ::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0px;
    width: 0%;
    height: 100%;
    border-radius: 50px;
    background: ${({ theme }) => hexToRgb(theme.black, 0.4)};
    transition: 0.3s ease;
  }
`;

export const InputLabel = styled.label`
  color: ${({ theme }) => hexToRgb(theme.black, 0.4)};
  font-size: 1.1rem;
  font-weight: 700;
  position: absolute;
  font-family: var(--font1);
  pointer-events: none;
  left: 15px;
  top: 40%;
  transition: 0.2s ease all;
`;

const Input = styled.input`
  width: 100%;
  color: inherit;
  border: none;
  transition: 0.7s ease;
  outline: none;
  background: transparent;
  text-indent: 15px;
  font-family: var(--font1);
  font-size: 1.1rem;
  font-weight: 100;

  &:not([type='button']) {
    top: 0;
    flex-basis: 80%;
  }
`;

export const InputContainer = styled(motion.div)`
  width: 70%;
  color: inherit;
  flex-basis: auto;
  margin-bottom: 0px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  &:not(:last-of-type) {
    flex-grow: 0.15;
  }

  &:focus-within ${InputLabel}, input:valid ~ ${InputLabel} {
    top: -25px;
    font-size: 17px;
    color: ${({ theme }) => theme.main};
  }
`;

export const SubmitButton = styled(motion.input).attrs({
  className: 'button',
})`
  border-radius: 50px;
  background: ${({ theme }) => theme.main};
  box-shadow: 20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff;
  border: none;
  margin-bottom: 0px;
  margin-top: 5px;
  color: ${({ theme }) => theme.sub};
  flex-basis: 11.5%;
  font-family: var(--font1);
  font-size: 1.3rem;
  font-weight: 500;
  letter-spacing: 0.1rem;
  text-transform: lowercase;

  &:disabled {
    background: ${({ theme }) => hexToRgb(theme.main, 0.3)};
  }
`;

const MotionInputInfo = styled(motion.p)`
  margin: 0;
  color: ${({ color }) => color};
  font-family: var(--font2);
  font-size: 0.9rem;
  font-weight: 300;
  text-align: left;
  width: 100%;
  height: fit-content;
  padding: 6px;
  position: relative;
  padding-left: 15px;
  transition: 0.3s color ease;
`;

export function InputInfo({ error, color, MotionProps }) {
  return (
    <MotionInputInfo color={color} {...MotionProps}>
      {error}
    </MotionInputInfo>
  );
}

export function InputField(props) {
  const { name, required, type, label, MotionProps, ...rest } = props;
  const { formState } = rest;
  const { formType, setInputFieldError } = formState;
  const [error, setError] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const LoginForm = formType === 'login';

  React.useEffect(() => {
    return () => {
      setError(null);
      setInputValue('');
    };
  }, [formType]);

  React.useEffect(() => {
    if (error && error.color === 'red') {
      setInputFieldError(true);
    } else setInputFieldError(false);
  }, [error]);

  const handleDebouncedInputValidation = React.useCallback(
    debounce(() => setError(inputValidation(name, inputValue, LoginForm)), 500),
    [name, inputValue, LoginForm]
  );

  const handleInputValidation = () =>
    setError(inputValidation(name, inputValue, LoginForm));

  return (
    <InputContainer {...MotionProps}>
      <Input
        onKeyUp={handleDebouncedInputValidation}
        onFocus={handleInputValidation}
        onChange={e => setInputValue(e.target.value)}
        value={inputValue}
        type={type}
        required={required}
        name={name}
        {...rest}
      />

      <Bar />
      <InputLabel>{label}</InputLabel>
      <AnimatePresence>
        {error && (
          <InputInfo
            key='Input-Info'
            MotionProps={{
              animate: error ? 'visible' : 'hidden',
              variants: InputInfoVariant,
              positionTransition: true,
              exit: 'hidden',
            }}
            color={error.color}
            error={error.text}
          />
        )}
      </AnimatePresence>
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
