import React from 'react';
import styled from 'styled-components';
import { InputContainer } from './Form-Components';
import { TwitterPicker } from 'react-color';
import { motion, AnimatePresence } from 'framer-motion';
import { colorPickerVariant, tween } from '../utils/motionObj';
import { getContrast } from '../utils/helper';
import { AuthContext } from '../context/Context';

const popOver = {
  position: 'relative',
  zIndex: 2,
  top: '-25px',
};

const containerStyles = {
  alignItems: 'flex-end',
  paddingLeft: '15px',
  marginTop: '0px',
  flexDirection: 'row',
};

const RevealButton = styled(motion.input)`
  cursor: pointer;
  color: ${({ color }) => getContrast(color)};
  background: ${({ color }) => color};
  border: 5px double ${({ color }) => getContrast(color)};
  flex-basis: auto;
  width: auto;
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

export default function ColorPicker({ MotionProps, setAuthColor, btnText }) {
  const { color } = React.useContext(AuthContext);
  const [displayColorPicker, setDisplay] = React.useState(false);
  const [inputValue, setValue] = React.useState(color);

  const handleClick = () => setDisplay(dcp => !dcp);

  const handleColorChange = color => {
    setValue(color.hex);
    console.log(color);
    setAuthColor(auth => {
      const { user, authed } = auth;
      return { user, color: color.hex, authed };
    });
  };

  return (
    <InputContainer {...MotionProps} style={containerStyles}>
      <div
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <TwitterPicker
          color={inputValue}
          triangle='hide'
          onChangeComplete={handleColorChange}
        />
        <p className='color-display' style={{ color: `${inputValue}` }}>
          {btnText}
        </p>
      </div>
    </InputContainer>
  );
}
