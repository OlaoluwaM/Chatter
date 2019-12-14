import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from './UI-components';
import { animated } from 'react-spring';
import { FaCircle } from 'react-icons/fa';
import { strongRegex, mediumRegex } from '../utils/helper';
import Tooltip from './ToolTips';

const FormTitle = styled(animated.h1)`
  margin-bottom: 25px;
  font-family: var(--font1);
  font-size: 3.8rem;
  letter-spacing: 0.2rem;
  font-weight: 1000;
`;

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

const Bar = styled.span`
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

const InputLabel = styled.label`
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

const Input = styled.input`
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

  &:focus ~ ${InputLabel}, &:valid ~ ${InputLabel} {
    top: -25px;
    font-size: 15px;
    color: var(--sub);
  }

  &:focus ~ ${Bar}::before {
    width: 100%;
  }
`;

const SubmitButton = styled(Button)`
  background: var(--sub);
  border: none;
  margin-bottom: 0px;
  color: var(--main);
`;

const StyledErrorText = styled.p`
  margin: 0;
  width: 50%;
  flex-basis: 5%;
  color: red;
  font-family: var(--font2);
  font-size: 1rem;
  font-weight: 300;
  text-align: center;
  margin-top: ${({ show }) => (show ? '15px' : '0')};
  margin-bottom: ${({ show }) => (show ? '40px' : '0')};
`;

const IndicatorIconWrapper = styled(animated.div)`
  position: absolute;
  right: 25px;
  top: -5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  fill: ${({ strength }) =>
    strength === 'weak' ? 'red' : strength === 'medium' ? 'orange' : 'green'};
`;

const IndicatorIconStyles = {
  backgroundColor: 'inherit',
  fill: 'inherit',
  strokeColor: 'inherit',
  zIndex: -10,
};

const AnimatedErrorText = animated(StyledErrorText);
const AnimatedSubmitButton = animated(SubmitButton);

function ErrorText({ error, style }) {
  const [shouldShow, setShow] = React.useState(false);

  React.useEffect(() => {
    if (error !== '') {
      setShow(true);
    } else setShow(false);
    return () => setShow(false);
  }, [error]);

  return (
    <AnimatedErrorText show={shouldShow} style={style}>
      {error}
    </AnimatedErrorText>
  );
}

function InputField({ name, required, type, label, style, ...rest }) {
  const [passwordStrength, setPasswordStrength] = React.useState('weak');

  const handleValidation = e => {
    if (e.target.value.match(strongRegex)) {
      setPasswordStrength('strong');
    } else if (e.target.value.match(mediumRegex)) {
      setPasswordStrength('medium');
    } else setPasswordStrength('weak');
  };

  const { isValidated } = rest;

  return (
    <InputContainer style={style}>
      {isValidated ? (
        <Input
          {...rest}
          onChange={handleValidation}
          type={type}
          required={required}
          name={name}
        />
      ) : (
        <Input {...rest} type={type} required={required} name={name} />
      )}

      {isValidated && (
        <Tooltip text={`${passwordStrength} password `}>
          <IndicatorIconWrapper strength={passwordStrength}>
            <FaCircle style={IndicatorIconStyles} />
          </IndicatorIconWrapper>
        </Tooltip>
      )}
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
    component: ErrorText,
    cProps: {},
    innerText: '',
    id: 7236,
  },
  {
    component: InputField,
    cProps: {
      name: 'id',
      label: 'Username',
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
    component: ErrorText,
    cProps: {},
    innerText: '',
    id: 1293,
  },
  {
    component: InputField,
    cProps: {
      name: 'id',
      label: 'Username',
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
      isValidated: true,
    },
    innerText: '',
    id: 7687,
  },
  {
    component: InputField,
    cProps: {
      name: 'confirmPasscode',
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
