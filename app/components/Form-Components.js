import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { debounce, hexToRgb } from '../utils/helper';
import { inputValidation } from '../utils/authFunc';
import { InputInfoVariant } from '../utils/motionObj';
import { motion, AnimatePresence } from 'framer-motion';

export const FormTitle = styled(motion.h1)`
  margin: 0;
  color: ${({ theme }) => theme.sub};
  text-align: left;
  padding-left: 12px;
  font-family: var(--font2);
  font-size: 5rem;
  letter-spacing: 0.2rem;
  font-weight: 800;
  margin-top: -30px;
`;

export const Bar = styled.span`
  display: block;
  position: relative;
  width: 100%;
  margin-left: 3.5%;
  height: 4px;
  flex-basis: 4px;
  border-radius: 50px;
  background: ${({ theme, color }) =>
    color ? color.color : hexToRgb(theme.sub, 0.2)};
  transition: 0.5s ease-out;

  ::before {
    transition: inherit;
    content: '';
    position: absolute;
    transform-origin: left;
    top: 0;

    width: inherit;
    transform: scaleX(0);
    height: 100%;
    border-radius: 50px;
    background: ${({ theme, color }) => (color ? color.color : theme.sub)};
  }
`;

export const InputLabel = styled.label`
  color: ${({ theme }) => hexToRgb(theme.sub, 0.4)};
  font-size: 1rem;
  font-weight: 700;
  position: absolute;
  font-family: var(--font1);
  pointer-events: none;
  left: 2%;
  top: 50%;
  transform: translateY(-60%);
  transition: 0.2s ease all;
`;

const Input = styled.input`
  width: 100%;
  color: inherit;
  border: none;
  outline: none;
  background: transparent;
  text-indent: 2%;
  font-family: var(--font1);
  font-size: 1.1rem;
  font-weight: 100;

  &:not([type='button']) {
    top: 0;
    flex-basis: 30%;
  }
`;

export const InputContainer = styled(motion.div)`
  color: ${({ theme }) => theme.sub};
  margin-bottom: 0px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  &:not(:last-of-type) {
    justify-content: center;
  }

  &:focus-within ${InputLabel}, input:valid ~ ${InputLabel} {
    top: 9%;
    font-size: 17px;
    color: ${({ theme }) => theme.sub};
  }

  &:focus-within ${Bar}::before, input:valid ~ ${Bar} {
    transform: scaleX(1);
  }
`;

export const SubmitButton = styled(motion.input).attrs({
  className: 'button',
})`
  border-radius: 50px;
  background: ${({ theme }) => theme.sub};
  border: none;
  margin-bottom: 0px;
  margin-top: 10px;
  color: ${({ theme }) => theme.main};
  font-family: var(--font1);
  font-size: 1.3rem;
  font-weight: 500;
  letter-spacing: 0.1rem;
  place-self: flex-end center;
  text-transform: lowercase;

  &:disabled {
    background: ${({ theme }) => hexToRgb(theme.sub, 0.3)};
  }
`;

const MotionInputInfo = styled(motion.p)`
  margin: 0;
  color: ${({ color }) => color};
  font-family: var(--font2);
  font-size: 0.89rem;
  font-weight: 300;
  text-align: left;
  width: 100%;
  position: absolute;
  bottom: 0px;
  padding-left: 2%;
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
    debounce(() => setError(inputValidation(name, inputValue, LoginForm)), 700),
    [name, inputValue, LoginForm]
  );

  const handleInputValidation = () =>
    setError(inputValidation(name, inputValue, LoginForm));

  return (
    <InputContainer {...MotionProps} color={error}>
      <Input
        onKeyUp={handleDebouncedInputValidation}
        onFocus={handleInputValidation}
        onChange={e => setInputValue(e.target.value)}
        value={inputValue}
        type={type}
        required={required}
        name={name}
        color={error}
        {...rest}
      />

      <Bar color={error} />
      <InputLabel color={error}>{label}</InputLabel>
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
