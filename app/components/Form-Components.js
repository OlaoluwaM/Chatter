import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { inputValidation } from '../utils/authFunc';
import { InputInfoVariant } from '../utils/motionObj';
import { motion, AnimatePresence } from 'framer-motion';
import { debounce, hexToRgb, colorMapping } from '../utils/helper';

export const FormTitle = styled(motion.h1)`
  margin: 0;
  color: ${({ theme }) => theme.sub};
  text-align: left;
  padding-left: 1.4%;
  font-family: var(--font2);
  font-size: 4rem;
  width: 45%;
  letter-spacing: 0.2rem;
  font-weight: 800;
  margin-top: -60px;
`;

export const Bar = styled.span`
  display: block;
  position: relative;
  width: 100%;
  margin-left: 3.5%;
  height: 4px;
  flex-basis: 4px;
  border-radius: 50px;
  transition: 0.5s ease-out;
  background: ${({ theme, error }) => error?.color ?? hexToRgb(theme.sub, 0.2)};

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
    background: ${({ theme, error }) => error?.color ?? theme.sub};
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
  top: 20px;
  transition: 0.2s ease all;
`;

const Input = styled.input`
  width: 100%;
  color: inherit;
  border: none;
  outline: none;
  background: transparent;
  padding-left: 2.2%;
  font-family: var(--font1);
  font-size: 1.2rem;
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
  width: 97%;
  flex-basis: 27%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;
  overflow: hidden;

  &:focus-within ${InputLabel}, input:valid ~ ${InputLabel} {
    top: -2%;
    font-size: 15px;
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
  border: none;
  margin-bottom: 0px;
  margin-top: 10px;
  background: ${({ theme }) => theme.main};
  box-shadow: 20px 20px 60px #cfcfcf, -20px -20px 60px #ffffff;
  color: ${({ theme }) => theme.sub};
  font-family: var(--font1);
  font-size: 1.3rem;
  font-weight: 500;
  letter-spacing: 0.1rem;
  align-self: center;
  text-transform: lowercase;

  &:disabled {
    background: ${({ theme }) => hexToRgb(theme.sub, 0.3)};
  }
`;

const MotionInputInfo = styled(motion.p)`
  margin: 0;
  font-family: var(--font2);
  font-size: 0.9rem;
  font-weight: 300;
  text-align: left;
  width: 98%;
  padding-left: 0.5%;
  left: 2%;
  position: absolute;
  color: ${({ error }) => error.color};
  background: ${({ error }) => hexToRgb(colorMapping(error.color), 0.2)};
  bottom: 24px;
`;

export function InputInfo({ error, motionProps }) {
  return (
    <MotionInputInfo error={error} {...motionProps}>
      {error.text}
    </MotionInputInfo>
  );
}

export function InputField(props) {
  const { name, required, type, label, motionProps, ...rest } = props;
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
    <InputContainer {...motionProps}>
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

      <Bar error={error} />
      <InputLabel>{label}</InputLabel>

      <AnimatePresence exitBeforeEnter>
        {error && (
          <InputInfo
            key='Input-Info'
            motionProps={{
              initial: 'hidden',
              animate: 'visible',
              exit: 'hidden',
              variants: InputInfoVariant,
              positionTransition: true,
            }}
            error={error}
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
