import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';
import { default as styled, ThemeContext } from 'styled-components';
import { inputContainerVariant, inputItemVariant } from '../utils/motionObj';
import { hexToRgb } from '../utils/helper';

const InputContainer = styled(motion.form)`
  width: 91%;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
  background: transparent;
  opacity: 0.7;
  border-top: 1px solid ${({ theme }) => theme.primaryColor};
  align-self: center;
  overflow: hidden;
`;

const InputArea = styled(motion.input)`
  position: relative;
  width: 62%;
  flex-basis: 62%;
  border-radius: 3px;
  text-indent: 14px;
  font-family: var(--font2);
  font-size: 1.2rem;
  color: ${({ theme }) => theme.primaryColor};
  height: 5vh;
  border: none;
  justify-self: center;
  align-self: flex-start;
  outline: none;
  background: transparent;
  margin-left: 80px;

  &:disabled {
    opacity: 0.3;
  }

  &:hover,
  &:focus {
    opacity: 1;
  }
`;

const SendButton = styled(motion.button)`
  outline: none;
  border: none;
  background: transparent;
  fill: ${({ fill }) => hexToRgb(fill, 0.4)};
  font-size: 1.3rem;
  margin-left: 40px;
  margin-right: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  & > svg {
    transition: 0.3s linear;
    fill: inherit;
  }
  & > svg:hover {
    fill: ${({ fill }) => fill};
  }
  &:disabled {
    opacity: 0.5;
  }
`;

export default function Input({ onSendMessage }) {
  const { primaryColor } = React.useContext(ThemeContext);
  const [message, setMessage] = React.useState({ text: '' });

  const handleSubmit = e => {
    const { text } = message;
    e.preventDefault();
    onSendMessage(text);
    setMessage({ text: '' });
  };

  return (
    <InputContainer
      variants={inputContainerVariant}
      initial='hidden'
      animate='visible'
      onSubmit={handleSubmit}>
      <InputArea
        variants={inputItemVariant}
        onChange={e => setMessage({ text: e.target.value })}
        type='text'
        value={message.text}
        placeholder='Say Hi!'
        autoFocus={true}
      />

      <SendButton fill={primaryColor} variants={inputItemVariant} type='submit'>
        <FaPaperPlane />
      </SendButton>
    </InputContainer>
  );
}

Input.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
};
