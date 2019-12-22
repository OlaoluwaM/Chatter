import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { inputValidation } from '../utils/authFunc';
import { debounce } from '../utils/helper';
import { InputInfoVariant } from '../utils/motionObj';

export const FormTitle = styled(motion.h1)`
  margin: 0;
  flex-basis: 23%;
  text-align: center;
  font-family: var(--font1);
  font-size: 3.8rem;
  letter-spacing: 0.2rem;
  font-weight: bolder;
  margin-top: 25px;
`;

const InputContainer = styled(motion.div)`
  width: 50%;
  color: inherit;
  height: 17%;
  flex-basis: 17%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  margin-bottom: 10px;
  background: transparent;

  &:not(:last-of-type) {
    margin-bottom: 18px;
  }
`;

const Bar = styled.span`
  display: block;
  position: relative;
  width: 100%;
  height: 3.2%;
  flex-basis: 3.2%;
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

const InputLabel = styled.label`
  color: rgba(153, 102, 204, 0.4);
  font-size: 1.1rem;
  font-weight: normal;
  position: absolute;
  font-family: var(--font2);
  pointer-events: none;
  left: 15px;
  top: 6px;
  transition: 0.2s ease all;
`;

const Input = styled.input`
  flex-basis: 28%;
  width: 100%;
  color: inherit;
  border: none;
  transition: 0.7s ease;
  outline: none;
  background: transparent;
  text-indent: 15px;
  font-family: var(--font2);
  font-size: 1rem;
  padding-bottom: -3px;

  &:focus ~ ${InputLabel}, &:valid ~ ${InputLabel} {
    top: -20px;
    font-size: 15px;
    color: var(--sub);
  }

  &:focus ~ ${Bar}::before {
    width: 100%;
  }
`;

export const SubmitButton = styled(motion.input).attrs({
  className: 'button',
})`
  background: var(--sub);
  border: none;
  margin-bottom: 0px;
  margin-top: 0px;
  color: var(--main);
  flex-basis: 11.5%;

  &:disabled {
    background: rgba(153, 102, 204, 0.4);
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
