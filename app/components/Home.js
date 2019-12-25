import React from 'react';
import { Link } from 'react-router-dom';
import { FaPaperPlane } from 'react-icons/fa';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { AuthContext } from '../context/Context';
import { headerVariant, buttonVariant } from '../utils/motionObj';

const HomePage = styled.div.attrs({
  className: 'wrapper',
})`
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
      font-size: 4rem;
      font-family: var(--font1);
      color: var(--sub);
      font-weight: lighter;
      margin-bottom: 0;
      margin-top: 18px;
      letter-spacing: 0.1rem;
      word-spacing: 0.2rem;
    }
  }
`;

const iconStyles = {
  fill: 'var(--main)',
  marginRight: '15px',
};

const buttonStyles = {
  fontFamily: 'var(--font1)',
  fontWeight: 100,
  background: 'var(--sub)',
  color: 'var(--main)',
  textTransform: 'uppercase',
  fontSize: '1.3rem',
};

export default function Home() {
  const { user, authed } = React.useContext(AuthContext);

  return (
    <HomePage>
      <div>
        <motion.h1 variants={headerVariant} initial='hidden' animate='visible'>
          {authed ? `Welcome to Chatter ${user}` : 'Welcome to Chatter'}
        </motion.h1>

        <Link to={authed ? '/Chat' : '/Auth'}>
          <motion.button
            variants={buttonVariant}
            initial='hidden'
            animate='visible'
            className='button'
            style={buttonStyles}>
            <FaPaperPlane style={iconStyles} />
            Chat
          </motion.button>
        </Link>
      </div>
    </HomePage>
  );
}
