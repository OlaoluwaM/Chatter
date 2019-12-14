import React from 'react';
import styled from 'styled-components';
import Form from './Form';

const AuthPage = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 94%;
  background: var(--main);
  align-items: center;
  justify-content: space-around;
  overflow: hidden;
`;

const SwitchText = styled.p`
  color: var(--sub);
  text-transform: uppercase;
  font-family: var(--font1);
  font-size: 1.2rem;
  cursor: pointer;
  font-weight: bolder;
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
        onClick={() => setState(s => (s === 'login' ? 'sign-up' : 'login'))}>
        {state === 'login' ? ' Create an account' : ' Log into your account'}
      </SwitchText>
    </AuthPage>
  );
}
