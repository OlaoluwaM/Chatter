import React from 'react';
import styled from 'styled-components';
import homeImage from '../assets/croods.png';

import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { homeH1Variants } from './utils/framerVariants';

const SectionHome = styled(motion.section).attrs({
  className: 'container',
})`
  background: ${({ theme }) => theme.white};
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  & > a {
    text-decoration: none;
    position: absolute;
    bottom: 17%;
    left: 10%;
    color: ${({ theme }) => theme.baseColorDark};
    display: inline-block;
    padding: 1.7em 5em;
    border: none;
    border-radius: 10px;
    border-radius: 50px;
    background: #f8f9fa;
    box-shadow: 20px 20px 60px #d3d4d5, -20px -20px 60px #ffffff;
    font-family: var(--secondaryFont);
    font-weight: var(--light);
    font-size: 0.9em;
    font-variant: small-caps;
  }
`;

const ForeFrontH1 = styled(motion.h1)`
  font-family: var(--primaryFont);
  font-weight: var(--bold);
  color: ${({ theme }) => theme.baseColor};
  text-align: left;
  overflow-wrap: break-word;
  margin: 0;
  font-size: 7em;
  font-variant: small-caps;
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
  return (
    <SectionHome>
      <ForeFrontH1
        variants={homeH1Variants}
        initial='hidden'
        animate='popOut'
        exit='hidden'>
        Welcome To Chatter
      </ForeFrontH1>
      <NavLink to='/authenticate'>Sign Up</NavLink>
      <Image
        animate={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: 180 }}
        transition={{ type: 'tween', delay: 0.5 }}
        alt='Image of people chatting'
        src={homeImage}
      />
    </SectionHome>
  );
}
