import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { IoIosChatbubbles } from 'react-icons/io';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { hexToRgb } from '../utils/helper';
import { AuthContext } from '../context/Context';
import { headerVariant, buttonVariant, spring2 } from '../utils/motionObj';

const HomePage = styled.div.attrs({
  className: 'wrapper',
})`
  position: relative;
  background: ${({ theme }) => theme.main};

  & > svg {
    position: absolute;
  }

  & > div:first-of-type {
    z-index: 10;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 70%;
    height: 27%;
    background: transparent;
    color: ${({ theme }) => theme.sub};

    h1 {
      text-align: center;
      font-size: 5rem;
      font-family: var(--font1);
      font-weight: lighter;
      margin-bottom: 0;
      margin-top: 0px;
      letter-spacing: 0.1rem;
      word-spacing: 0.2rem;
    }
  }
`;

const ChatButton = styled(motion.button).attrs({
  className: 'button',
})`
  color: ${({ theme }) => theme.sub};
  font-family: var(--font1);
  font-weight: 100;
  font-size: 1.3rem;
  text-transform: uppercase;
  fill: ${({ theme }) => theme.sub};
  border-radius: 50px;

  border: none;
  background: ${({ theme }) => theme.main};

  & > svg {
    fill: inherit;
    margin-right: 15px;
    transform: scale(1.3);
  }
`;

export default function Home() {
  const { user, authed } = React.useContext(AuthContext);

  return (
    <HomePage>
      <div className='home-content'>
        <motion.h1 variants={headerVariant} initial='hidden' animate='visible'>
          Welcome to Chatter
        </motion.h1>
        <Link to={authed ? '/Chat' : '/Auth'}>
          <ChatButton
            variants={buttonVariant}
            initial='hidden'
            animate='visible'
            whileTap='tap'>
            {authed && (
              <>
                <IoIosChatbubbles /> Chat
              </>
            )}
            {!authed && 'Sign In'}
          </ChatButton>
        </Link>
      </div>
    </HomePage>
  );
}
