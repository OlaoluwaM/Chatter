import React from 'react';
import styled from 'styled-components';
import homeImage from '../assets/croods.png';

import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { homePageVariants } from './utils/framerVariants';
import { CurrentUserContext } from './context/context';

const {
  sectionVariants,
  homeH1Variants,
  buttonVariants,
  imageVariants,
} = homePageVariants;

const SectionHome = styled(motion.section).attrs({
  className: 'container',
})`
  background: ${({ theme }) => theme.background};
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  & > button {
    position: absolute;
    bottom: 17%;
    color: #fffffe;
    left: 10%;
    display: block;
    text-align: center;
    min-width: 9%;
    width: 11%;
    max-width: 12%;
    min-height: 7%;
    height: 8%;
    max-height: 9%;
    border: none;
    border-radius: 15px;
    background: ${({ theme }) => theme.baseColor};
    font-family: var(--secondaryFont);
    font-weight: var(--light);
    font-size: 1.1em;
    font-variant: small-caps;
    a {
      width: 100%;
      height: 100%;
      text-decoration: none;
      color: inherit;
      margin: auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

const ForeFrontH1 = styled(motion.h1)`
  font-family: var(--primaryFont);
  font-weight: var(--bold);
  color: ${({ theme }) => theme.whiteOrBlack};
  text-align: left;
  overflow-wrap: break-word;
  margin: 0;
  font-size: 7em;
  width: 55%;
  margin-left: 5%;
`;

const Image = styled(motion.img)`
  width: 46%;
  margin-right: 1.2em;
  height: auto;
  top: 24%;
  right: 2%;
  position: absolute;
`;

export default function Home() {
  const { authenticated } = React.useContext(CurrentUserContext);
  console.log(authenticated);

  return (
    <SectionHome
      variants={sectionVariants}
      initial='hidden'
      animate='popOut'
      exit='hidden'>
      <ForeFrontH1 variants={homeH1Variants}>Welcome To Chatter</ForeFrontH1>
      <motion.button type='button' variants={buttonVariants}>
        {!authenticated ? (
          <NavLink to='/authenticate'>Sign Up</NavLink>
        ) : (
          <NavLink to='/chatroom'>Talk to others</NavLink>
        )}
      </motion.button>
      <Image
        variants={imageVariants}
        alt='Image of people chatting'
        src={homeImage}
      />
    </SectionHome>
  );
}
