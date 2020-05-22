import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DefaultDisplaySVG from '../utils/DefaultDisplaySVG';
import { motion } from 'framer-motion';
import { simpleVariant } from '../utils/motionObj';

const DefaultContainer = styled(motion.div)`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  & > p {
    position: absolute;
    bottom: 11%;
    color: ${({ theme }) => theme.primaryColor};
    font-family: var(--font1);
    font-size: 1.1rem;
    font-weight: 500;
  }
`;

export default function DefaultDisplay({ icon = true, text }) {
  return (
    <DefaultContainer
      variants={simpleVariant}
      initial='hide'
      animate='showDisplay'>
      {icon && <DefaultDisplaySVG />}
      <motion.p>{text}</motion.p>
    </DefaultContainer>
  );
}

DefaultDisplay.propTypes = {
  icon: PropTypes.bool,
  text: PropTypes.string.isRequired,
};
