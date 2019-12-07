import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from './UI-components';
import { useSpring, animated, useTrail, config } from 'react-spring';

// Styled Components Used on the Auth page, I don't want to abstract them because they are specific tot this page

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
  overflow: hidden;
`;

const SwitchArea = styled(animated.div).attrs({
  className: 'switch-area',
})`
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

const FormContainer = styled(animated.form).attrs({
  className: 'form-container',
})`
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

const InputContainer = styled(animated.div)`
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

const FormTitle = styled(animated.h1)`
  margin-bottom: 55px;
  font-family: var(--font1);
  font-size: 3.5rem;
  letter-spacing: 0.2rem;
  font-weight: 1000;
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

const SubmitButton = styled(Button)`
  background: var(--purple-gradient);
  border: none;
  color: var(--white);
`;

function InputField({ name, required, type, label, style, ...rest }) {
  return (
    <InputContainer style={style}>
      <Input {...rest} type={type} required={required} name={name} />
      <Bar />
      <InputLabel>{label}</InputLabel>
    </InputContainer>
  );
}

const AnimatedSubmitButton = animated(SubmitButton);

// ----------------------------------------------------------------------------------------------------
const loginComponents = [
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

const signUpComponents = [
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

// ---------------------------------------------------------------------------

function Form({ type }) {
  const [components, setComponents] = React.useState([]);

  React.useEffect(() => {
    setComponents(type === 'login' ? loginComponents : signUpComponents);
    return () => setComponents([]);
  }, [type]);

  const trail = useTrail(components.length, {
    from: { opacity: 0, transform: 'translate3d(0, 50px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0px, 0)' },
    reset: true,
    config: config.gentle,
    delay: 450,
  });

  return (
    <React.Fragment>
      {trail.map((props, index) => {
        const obj = components[index];
        const Component = obj.component;
        return obj.innerText === '' ? (
          <Component key={index} {...obj.cProps} style={props} />
        ) : (
          <Component key={index} {...obj.cProps} style={props}>
            {obj.innerText}
          </Component>
        );
      })}
    </React.Fragment>
  );
}

export default function Auth() {
  const [isSwapped, setSwap] = React.useState(false);

  const distanceMoveLeft = React.useRef(0);
  const distanceMoveRight = React.useRef(0);

  const slideLeftAnim = useSpring({
    transform: isSwapped
      ? `translateX(${distanceMoveLeft.current}px)`
      : `translateX(0px)`,
    config: config.stiff,
  });

  const slideRightAnim = useSpring({
    transform: isSwapped
      ? `translateX(${distanceMoveRight.current}px)`
      : `translateX(0px)`,
    config: config.stiff,
  });

  React.useEffect(() => {
    const leftDist = document.querySelector('.form-container').offsetLeft;
    const rightDist = document.querySelector('.form-container').offsetWidth;
    distanceMoveLeft.current = leftDist * -1;
    distanceMoveRight.current = rightDist - 0.5;
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    e.reset();
  };

  const buttonTransitions = useSpring({
    from: { opacity: 0, transform: 'translateX(-570px)' },
    to: [
      { opacity: 0, transform: 'translateX(-570px)' },
      { opacity: 1, transform: 'translateX(0px)' },
    ],
    reset: true,
    config: config.gentle,
  });

  const headerTransitions = useSpring({
    from: { opacity: 0, transform: 'translateY(-40px)' },
    to: [
      { opacity: 0, transform: 'translateX(-40px)' },
      { opacity: 1, transform: 'translateX(0px)' },
    ],
    reset: true,
  });

  return (
    <AuthPage>
      <SwitchArea style={slideRightAnim}>
        <animated.h1 style={headerTransitions}>
          {isSwapped ? 'Have an account ?' : 'New Here ?'}
        </animated.h1>
        <Button
          style={buttonTransitions}
          onClick={() => setSwap(swap => !swap)}>
          {isSwapped ? 'Login' : 'Sign Up'}
        </Button>
      </SwitchArea>
      <FormContainer
        style={slideLeftAnim}
        onSubmit={handleSubmit}
        autoComplete="off">
        <Form type={isSwapped ? 'sign-up' : 'login'} />
      </FormContainer>
    </AuthPage>
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

Form.propTypes = {
  type: PropTypes.string.isRequired,
};
