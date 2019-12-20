import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { strongRegex, mediumRegex } from '../utils/helper';
import Tooltip from './ToolTips';
import { motion, AnimatePresence } from 'framer-motion';

export const FormTitle = styled(motion.h1)`
  margin: 0;
  flex-basis: 20%;
  text-align: center;
  font-family: var(--font1);
  font-size: 3.8rem;
  letter-spacing: 0.2rem;
  font-weight: bolder;
  margin-top: 7px;
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
  flex-basis: 32%;
  width: 100%;
  color: inherit;
  border: none;
  transition: 0.7s ease;
  outline: none;
  background: transparent;
  text-indent: 15px;
  font-family: var(--font2);
  font-size: 1rem;
  padding-bottom: 7px;

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
`;

const MotionErrorText = styled(motion.p)`
  margin: 0;
  color: red;
  font-family: var(--font2);
  font-size: 1rem;
  font-weight: 300;
  text-align: left;
  width: 100%;
  height: fit-content;
  padding: 6px;
  position: relative;
  padding-left: 15px;
`;

const IndicatorIcon = styled(motion.div)`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: ${({ strength }) =>
    strength === 'weak' ? 'red' : strength === 'medium' ? 'orange' : 'green'};
`;

const IndicatorIconWrapperStyles = {
  position: 'absolute',
  right: '25px',
  top: '-5px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '30px',
  height: '30px',
};

export function ErrorText({ error, MotionProps }) {
  return <MotionErrorText {...MotionProps}>{error}</MotionErrorText>;
}

export function InputField({
  name,
  required,
  type,
  label,
  MotionProps,
  error,
  ...rest
}) {
  const [passwordStrength, setPasswordStrength] = React.useState('weak');

  const handleValidation = e => {
    if (e.target.value.match(strongRegex)) {
      setPasswordStrength('strong');
    } else if (e.target.value.match(mediumRegex)) {
      setPasswordStrength('medium');
    } else setPasswordStrength('weak');
  };

  const IconVariant = {
    visible: { opacity: 1, x: 0, transition: { delay: 1 } },
    hidden: { opacity: 0, x: 50 },
  };

  return (
    <InputContainer {...MotionProps}>
      {rest.validate ? (
        <Input
          onBlur={e => console.log(e)}
          {...rest}
          onChange={handleValidation}
          type={type}
          required={required}
          name={name}
        />
      ) : (
        <Input
          onBlur={e => console.log(e)}
          {...rest}
          type={type}
          required={required}
          name={name}
        />
      )}

      <AnimatePresence>
        {rest.validate && (
          <Tooltip
            style={IndicatorIconWrapperStyles}
            MotionProps={{
              variants: IconVariant,
              animate: 'visible',
              exit: 'hidden',
            }}
            text={`${passwordStrength} password `}>
            <IndicatorIcon strength={passwordStrength} />
          </Tooltip>
        )}
      </AnimatePresence>

      <Bar />
      <InputLabel>{label}</InputLabel>
      {/* <ErrorText error={error} /> */}
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

// export const loginComponents = [
//   {
//     component: FormTitle,
//     cProps: {},
//     innerText: 'Login',
//     id: 1243,
//   },
//   {
//     component: ErrorText,
//     cProps: {},
//     innerText: '',
//     id: 7236,
//   },
//   {
//     component: InputField,
//     cProps: {
//       name: 'id',
//       label: 'Username',
//     },
//     innerText: '',
//     id: 4234,
//   },
//   {
//     component: InputField,
//     cProps: {
//       name: 'passcode',
//       type: 'password',
//       label: 'Password',
//     },
//     innerText: '',
//     id: 2342,
//   },
//   {
//     component: AnimatedSubmitButton,
//     cProps: {
//       as: 'input',
//       type: 'submit',
//       name: 'btn',
//       value: 'Login',
//     },
//     innerText: '',
//     id: 3454,
//   },
// ];

// export const signUpComponents = [
//   {
//     component: FormTitle,
//     cProps: {},
//     innerText: 'Create an account',
//     id: 3423,
//   },
//   {
//     component: ErrorText,
//     cProps: {},
//     innerText: '',
//     id: 1293,
//   },
//   {
//     component: InputField,
//     cProps: {
//       name: 'id',
//       label: 'Username',
//     },
//     innerText: '',
//     id: 5567,
//   },
//   {
//     component: InputField,
//     cProps: {
//       name: 'passcode',
//       type: 'password',
//       label: 'Password',
//       isValidated: true,
//     },
//     innerText: '',
//     id: 7687,
//   },
//   {
//     component: InputField,
//     cProps: {
//       name: 'confirmPasscode',
//       type: 'password',
//       label: 'Confirm Password',
//     },
//     innerText: '',
//     id: 3204,
//   },
//   {
//     component: AnimatedSubmitButton,
//     cProps: {
//       as: 'input',
//       type: 'submit',
//       name: 'btn',
//       value: 'Sign Up',
//     },
//     innerText: '',
//     id: 2249,
//   },
// ];
