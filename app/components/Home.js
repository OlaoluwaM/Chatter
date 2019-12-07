import React from 'react';
import { Link } from 'react-router-dom';
import { FaPaperPlane } from 'react-icons/fa';
import { Button } from './UI-components';
import styled from 'styled-components';

const HomePage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  height: 30%;
  justify-content: space-between;

  h1 {
    font-size: 3.7rem;
    font-family: var(--font1);
    color: var(--purple);
    font-weight: 100;
    margin-bottom: 0;
  }
`;

const iconStyles = {
  fill: 'var(--white)',
  marginRight: '15px',
};

export default function Home({ match }) {
  const url = match.url;

  return (
    <HomePage>
      <h1>Welcome to Chatter</h1>
      <Link to="/Auth">
        <Button
          style={{ backgroundColor: 'var(--purple)', color: 'var(--white)' }}>
          <FaPaperPlane style={iconStyles} />
          Chat
        </Button>
      </Link>
    </HomePage>
  );
}
