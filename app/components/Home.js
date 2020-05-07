import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/Context';
import { IoIosChatbubbles } from 'react-icons/io';
import { buttonVariant, headerVariant } from '../utils/motionObj';

const HomePage = styled.div.attrs({
  className: 'wrapper',
})`
  position: relative;
  background: ${({ theme }) => theme.primaryColor};

  & > svg {
    position: absolute;
  }

  & > div {
    z-index: 10;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 32%;
    background: transparent;
    color: ${({ theme }) => theme.secondaryColor};
    font-size: 1rem;

    h1 {
      text-align: center;
      font-size: 4.2em;
      padding: 10px;
      font-family: var(--font1);
      font-weight: lighter;
      margin-bottom: 0;
      margin-top: 0px;
      letter-spacing: 0.1rem;
      word-spacing: 0.2rem;
    }

    a {
      font-size: 1.2rem;
      width: 100%;
      text-decoration: none;
      display: flex;
      justify-content: center;
    }
  }
`;

const ChatButton = styled(motion.button).attrs({
  className: 'button',
})`
  color: ${({ theme }) => theme.secondaryColor};
  font-family: var(--font1);
  font-weight: 100;
  width: 250px;
  max-width: 43%;
  border: none;
  padding: 1.4rem 1.2rem;
  fill: ${({ theme }) => theme.secondaryColor};
  background: ${({ theme }) => theme.primaryColor};

  & > svg {
    fill: inherit;
    margin-right: 15px;
    transform: scale(1.3);
  }
`;

export default function Home() {
  const { isAuthenticated } = React.useContext(AuthContext);

  return (
    <HomePage>
      <motion.div>
        <motion.h1 variants={headerVariant} initial='hidden' animate='visible'>
          Welcome to Chatter
        </motion.h1>

        <Link to={isAuthenticated ? '/chat' : '/authenticate'}>
          <ChatButton
            variants={buttonVariant}
            initial='hidden'
            animate='visible'
            whileTap='tap'>
            {!isAuthenticated && 'Sign In'}
            {isAuthenticated && (
              <>
                <IoIosChatbubbles /> Chat
              </>
            )}
          </ChatButton>
        </Link>
      </motion.div>
    </HomePage>
  );
}
