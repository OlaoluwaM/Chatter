import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import styled from 'styled-components';
import { inputContainerVariant, inputItemVariant } from '../utils/motionObj';

const InputContainer = styled(motion.form)`
  width: 91%;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
  background: transparent;
  align-self: center;
  overflow-y: hidden;
  position: absolute;
  bottom: 0;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    width: 98%;
    height: 5px;
    border-radius: 50px;
    background: ${({ theme }) => theme.primaryColor};
  }

  & > *,
  &::after {
    opacity: 'inherit';
  }
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
  margin-left: 65px;

  &:hover,
  &:focus {
    opacity: 1;
  }
`;

const SendButton = styled(motion.button)`
  outline: none;
  border: none;
  background: transparent;
  font-size: 1.3rem;
  margin-right: 52px;
  display: flex;
  fill: ${({ theme }) => theme.primaryColor};
  justify-content: center;
  align-items: center;
  cursor: pointer;

  & > svg {
    transition: fill 0.3s linear;
    fill: inherit;

    &:hover {
      opacity: 1;
    }
  }
`;

export default function Input({ disabled, onSendMessage }) {
  const [message, setMessage] = React.useState({ text: '' });

  const handleSubmit = e => {
    e.preventDefault();
    if (disabled) return;
    const { text } = message;
    onSendMessage(text);
    setMessage({ text: '' });
  };

  return (
    <InputContainer
      variants={inputContainerVariant}
      initial='hidden'
      animate={disabled ? 'visible' : 'enabled'}
      onSubmit={handleSubmit}>
      <InputArea
        variants={inputItemVariant}
        onChange={e => setMessage({ text: e.target.value })}
        type='text'
        value={message.text}
        placeholder='Say Hi!'
        autoFocus={true}
        disabled={disabled}
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
