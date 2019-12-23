import React from 'react';
import styled from 'styled-components';
import { InputContainer } from './Form-Components';
import { TwitterPicker } from 'react-color';
import { motion, AnimatePresence } from 'framer-motion';
import { colorPickerVariant, spring } from '../utils/motionObj';

const popOver = {
  position: 'relative',
  zIndex: 2,
  top: '-25px',
};

const containerStyles = {
  alignItems: 'flex-start',
  paddingLeft: '15px',
  marginTop: '-10px',
  flexDirection: 'row',
};

const RevealButton = styled(motion.input)`
  cursor: pointer;
  color: var(--main);
  background: var(--sub);
  border: 5px double var(--main);
  flex-basis: 31%;
  width: 31%;
  height: auto;
  padding: 10px;
  font-family: var(--font1);
  font-size: 1.3rem;
  font-weight: 500;
  text-align: center;
  border-radius: 15px;
  outline: none;
  margin-right: 50px;
  text-transform: lowercase;
`;

export default function ColorPicker({ MotionProps }) {
  const [displayColorPicker, setDisplay] = React.useState(false);

  const handleClick = () => setDisplay(dcp => !dcp);

  return (
    <InputContainer {...MotionProps} style={containerStyles}>
      <AnimatePresence>
        <RevealButton
          key='revealButtn'
          layoutTransition={spring}
          exit={{ opacity: 0 }}
          type='button'
          value='Pick Color'
          onClick={handleClick}
        />
        {displayColorPicker && (
          <motion.div
            key='colorPickerContainer'
            variants={colorPickerVariant}
            animate={displayColorPicker ? 'visible' : 'hidden'}
            exit='hidden'
            style={popOver}>
            <TwitterPicker triangle='hide' />
          </motion.div>
        )}
      </AnimatePresence>
    </InputContainer>
  );
}
