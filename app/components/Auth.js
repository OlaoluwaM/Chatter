import React from 'react';
import styled from 'styled-components';
import Form from './Form';
import { motion } from 'framer-motion';
import { spring, spring2 } from '../utils/motionObj';

const AuthPage = styled.div.attrs({
  className: 'wrapper',
})`
  position: relative;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.main};
  align-items: center;
  justify-content: space-around;
  overflow: hidden;
`;

const SwitchText = styled(motion.p)`
  color: ${({ theme }) => theme.sub};
  text-transform: uppercase;
  font-family: var(--font1);
  font-size: 1.2rem;
  cursor: pointer;
  letter-spacing: 0.2rem;
  word-spacing: 0.2rem;
  font-weight: bolder;
  margin-bottom: 5px;
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
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spring, delay: 1.9 }}
        layoutTransition={spring2}
        onClick={() => setState(s => (s === 'login' ? 'sign-up' : 'login'))}>
        {state === 'login' ? ' Create an account' : ' Log into your account'}
      </SwitchText>
    </AuthPage>
  );
}
