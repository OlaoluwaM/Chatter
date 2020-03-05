import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { hexToRgb } from '../utils/helper';
import { AuthContext } from '../context/Context';
import { FaPaperPlane } from 'react-icons/fa';
import { inputContainerVariant, inputItemVariant } from '../utils/motionObj';

const InputContainer = styled(motion.form)`
  width: 91%;
  flex-basis: 7vh;
  height: 7vh;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
  background: ${({ theme }) => theme.main};
  opacity: 0.7;
  border-radius: 15px;
  align-self: center;
`;

const InputArea = styled(motion.input)`
  position: relative;
  width: 62%;
  flex-basis: 62%;
  border-radius: 3px;
  text-indent: 14px;
  font-family: var(--font2);
  font-size: 1.2rem;
  color: ${({ theme }) => theme.black};
  height: 5vh;
  border: none;
  justify-self: center;
  outline: none;
  background: transparent;
  margin-left: 80px;

  &:disabled {
    opacity: 0.3;
  }

  &:hover,
  &:focus {
    opacity: 1;
    /* border: 2px solid #bfbfbf; */
  }
`;

const SendButton = styled(motion.button)`
  outline: none;
  border: none;
  background: transparent;
  fill: ${({ theme }) => theme.darkMain};
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
    fill: ${({ theme }) => theme.sub};
  }
  &:disabled {
    opacity: 0.5;
  }
`;

export default function Input({ onSendMessage }) {
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

      <SendButton variants={inputItemVariant} type='submit'>
        <FaPaperPlane />
      </SendButton>
    </InputContainer>
  );
}

Input.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
};
