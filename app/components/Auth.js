import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import { hexToRgb } from '../utils/helper';
import { spring } from '../utils/motionObj';
import Form from './Form';

// TODO use loader instead of 'Authenticating text'

const AuthPage = styled.div.attrs({
  className: 'wrapper',
})`
  position: relative;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.primaryColor};
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const SwitchText = styled(motion.p)`
  color: ${({ theme }) => hexToRgb(theme.secondaryColor, 0.3)};
  text-transform: capitalize;
  font-family: var(--font1);
  font-size: 1.1rem;
  letter-spacing: 0.1rem;
  word-spacing: 0.1rem;
  cursor: pointer;
  font-weight: bolder;
  position: fixed;
  bottom: 12px;
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => hexToRgb(theme.secondaryColor, 1)};
  }
`;

export default function Auth({ location, setAuth }) {
  const initialValue = location.state ? location.state.formType : 'login';
  const [state, setState] = React.useState(initialValue);

  React.useEffect(() => {
    if (location.state) setState(location.state.formType);
  }, [location]);

  return (
    <AuthPage>
      <Form setAuth={setAuth} formType={state} />
      <SwitchText
        initial={{ opacity: 0, y: 90 }}
        animate={{ opacity: 1, y: -10 }}
        transition={{ ...spring, delay: 1.3 }}
        layoutTransition={{ type: 'spring', delay: 0 }}
        onClick={() => setState(s => (s === 'login' ? 'sign-up' : 'login'))}>
        {state === 'login' ? ' Create an account' : ' Log into your account'}
      </SwitchText>
    </AuthPage>
  );
}
