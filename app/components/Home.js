import React from 'react';
import { Link } from 'react-router-dom';
import { FaPaperPlane } from 'react-icons/fa';
import { Wrapper } from './UI-components';
import styled from 'styled-components';
import { AuthContext } from '../context/Context';

const HomePage = styled(Wrapper)`
  position: relative;
  background: var(--main);
  div {
    z-index: 10;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 85%;
    height: 33%;

    h1 {
      text-align: center;
      font-size: 3.7rem;
      font-family: var(--font1);
      color: var(--sub);
      font-weight: 100;
      margin-bottom: 0;
    }
  }
`;

const iconStyles = {
  fill: 'var(--main)',
  marginRight: '15px',
};

export default function Home() {
  const { user, authed } = React.useContext(AuthContext);

  return (
    <HomePage>
      <div>
        <h1>{authed ? `Welcome to Chatter ${user}` : 'Welcome to Chatter'}</h1>

        <Link to={authed ? '/Chat' : '/Auth'}>
          <button
            className='button'
            style={{ background: 'var(--sub)', color: 'var(--main)' }}>
            <FaPaperPlane style={iconStyles} />
            Chat
          </button>
        </Link>
      </div>
    </HomePage>
  );
}
