import { AnimatePresence, motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React from 'react';
import { TiTimes } from 'react-icons/ti';
import { default as styled } from 'styled-components';
import useDebounce from '../custom-hooks/useDebounce';
import { inputValidation } from '../utils/authFunc';
import {
  fileInputChangeHandler,
  hexToRgb,
  resetInputFileValue,
} from '../utils/helper';
import { inputSvgValidatorVariants, pathObj } from '../utils/motionObj';

export const FormTitle = styled(motion.h1)`
  margin: 0;
  color: ${({ theme }) => theme.secondaryColor};
  text-align: left;
  padding-left: 1.6%;
  font-family: var(--font2);
  font-size: 4rem;
  width: 50%;
  letter-spacing: 0.2rem;
  font-weight: 800;
  margin-top: -60px;

  @media screen and (max-width: 870px) {
    width: 80%;
  }
`;

const Bar = styled.span`
  display: block;
  position: relative;
  width: 100%;
  margin-left: 3.5%;
  height: 4px;
  flex-basis: 4px;
  border-radius: 50px;
  transition: 0.5s ease-out;
  background: ${({ theme, messageColor }) =>
    messageColor ?? hexToRgb(theme.secondaryColor, 0.2)};

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
    background: ${({ theme, messageColor }) =>
      messageColor ?? theme.secondaryColor};
  }
`;

export const InputLabel = styled.label`
  color: ${({ theme }) => hexToRgb(theme.secondaryColor, 0.4)};
  font-size: 1em;
  font-weight: 700;
  position: absolute;
  font-family: var(--font1);
  left: 2.1%;
  top: 27%;
  cursor: text;
  transition: 0.2s ease all;
`;

const Input = styled.input`
  width: 100%;
  color: inherit;
  border: none;
  outline: none;
  background: transparent;
  padding-left: 2.1%;
  font-family: var(--font1);
  font-size: 1.2em;
  font-weight: 100;
  padding-bottom: 5px;
  padding-right: 18%;

  &:not([type='button']) {
    flex-basis: 30%;
  }
`;

export const InputContainer = styled(motion.div)`
  color: ${({ theme }) => theme.secondaryColor};
  margin-bottom: 0px;
  position: relative;
  display: flex;
  width: 97%;
  flex-basis: 27%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
  overflow: hidden;
  cursor: text;

  &:not(.simple-input):not(.for-input-file) {
    &:focus-within ${InputLabel}, input:valid ~ ${InputLabel} {
      top: 2%;
      color: ${({ theme }) => theme.secondaryColor};
    }

    &:focus-within ${Bar}:before, input:valid ~ ${Bar}:before {
      transform: scaleX(1);
    }
  }

  input[type='file']:hover ~ ${InputLabel} {
    color: ${({ theme }) => theme.primaryColor};
  }

  &.simple-input {
    &.active,
    &:focus-within {
      ${InputLabel} {
        top: 2%;
        color: ${({ theme }) => theme.secondaryColor};
      }

      ${Bar}:before {
        transform: scaleX(1);
      }
    }
  }
`;

export const SubmitButton = styled(motion.input).attrs({
  className: 'button',
})`
  border-radius: 50px;
  width: 50%;
  border: none;
  margin-bottom: 0px;
  margin-top: 10px;
  background: ${({ theme }) => theme.primaryColor};
  box-shadow: 20px 20px 60px #cfcfcf, -20px -20px 60px #ffffff;
  color: ${({ theme }) => theme.secondaryColor};
  font-family: var(--font1);
  font-size: 1.3em;
  font-weight: 500;
  letter-spacing: 0.1rem;
  align-self: center;
  text-transform: lowercase;

  &:disabled {
    color: ${({ theme }) => hexToRgb(theme.black, 0.5)};
    filter: opacity(0.5);
  }
`;

const InputSvgValidatorContainer = styled.div`
  margin: 0;
  width: 12%;
  height: 35px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 4%;
  position: absolute;
  top: 27%;

  svg {
    path {
      fill: inherit;
      fill-rule: evenodd;
    }
  }
`;

export function ValidatorSVG({ state, color }) {
  const isError = state === 'error';
  return (
    <InputSvgValidatorContainer>
      <AnimatePresence exitBeforeEnter={true}>
        <motion.svg
          key={state}
          initial='initial'
          animate='appear'
          exit='hide'
          custom={{ isError, color }}
          variants={inputSvgValidatorVariants}
          xmlns='http://www.w3.org/2000/svg'
          width='20'
          height='20'
          viewBox='0 0 24 24'>
          <motion.path d={pathObj[state]} />
        </motion.svg>
      </AnimatePresence>
    </InputSvgValidatorContainer>
  );
}

export function InputField(props) {
  const { name, required, type, label, motionProps, ...rest } = props;
  const { formState, className, index, addBar = true } = rest;
  const { formType, setInputFieldError } = formState;

  const [message, setMessage] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const LoginForm = formType === 'login';
  const isFileInput = type === 'file';
  const debouncedInput = useDebounce(inputValue, 800);

  React.useEffect(() => {
    return () => {
      setMessage(null);
      setInputValue('');
    };
  }, [formType]);

  React.useEffect(() => {
    if (!message?.type) return;
    const hasError = message?.type === 'error';
    setInputFieldError(str => {
      const arr = JSON.parse(str);
      arr[index] = hasError ? true : false;
      return JSON.stringify(arr);
    });
  }, [message?.type]);

  React.useEffect(() => {
    if (debouncedInput) {
      const report = inputValidation(name, debouncedInput, LoginForm);
      setMessage(report);
    } else return;
  }, [debouncedInput]);

  const handleReset = e => {
    resetInputFileValue(e);
    setInputFieldError(str => {
      const arr = JSON.parse(str);
      arr[index] = true;
      return JSON.stringify(arr);
    });
  };

  const handleInputValidation = () =>
    setMessage(inputValidation(name, inputValue, LoginForm));

  React.useEffect(() => {
    if (rest?.shouldReset) {
      setInputValue('');
      setMessage(null);
    }
  }, [rest?.shouldReset]);

  const handleChange = e => {
    e.persist();
    if (!required) {
      const container = e.currentTarget.parentElement;
      container.classList.toggle('active', e.target.value.length >= 1);
    }
    const value = e.target.value;
    console.log(value);

    setInputFieldError(str => {
      const arr = JSON.parse(str);
      arr[index] = value.length <= 1 ? true : false;
      return JSON.stringify(arr);
    });

    if (isFileInput) fileInputChangeHandler(e);
    setInputValue(value);
  };

  return (
    <InputContainer {...motionProps} className={className}>
      <Input
        onBlur={!isFileInput ? handleInputValidation : null}
        onFocus={!isFileInput ? handleInputValidation : null}
        onChange={handleChange}
        value={inputValue}
        type={type}
        required={required}
        name={name}
        id={name}
        {...rest}
      />

      {addBar && <Bar messageColor={message?.color} />}
      <InputLabel htmlFor={name}>{label}</InputLabel>

      {isFileInput ? (
        <TiTimes className='reset' onClick={handleReset} />
      ) : (
        <ValidatorSVG
          state={!message ? 'initial' : message.type}
          color={message?.color}
        />
      )}
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
