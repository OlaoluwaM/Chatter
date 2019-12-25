import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { inputContainerVariant, inputItemVariant } from '../utils/motionObj';

const InputContainer = styled(motion.form)`
  width: 100%;
  height: 12vh;
  flex-basis: 12vh;
  min-height: 12vh;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
  display: flex;
  padding-left: 15px;
  justify-content: flex-start;
  align-items: center;
  background: var(--main);
`;

const InputArea = styled(motion.input)`
  position: relative;
  flex-basis: 60%;
  width: 60%;
  border-radius: 5px;
  text-indent: 14px;
  font-family: var(--font2);
  font-size: 1.1rem;
  color: #000;
  height: 50%;
  border: 2px solid rgba(153, 102, 204, 0.4);
  justify-self: center;
  outline: none;
  background: var(--main);

  &:disabled {
    opacity: 0.5;
  }

  &:hover,
  &:focus {
    border: 2px solid rgba(153, 102, 204, 1);
  }
`;

const SendButton = styled(motion.input)`
  outline: none;
  border: none;
  background: var(--sub);
  color: var(--main);
  font-size: 1.1rem;
  font-family: var(--font2);
  padding: 10px;
  width: 100px;
  border-radius: 30px;
  margin-left: 30px;
  font-weight: 400;

  &:disabled {
    opacity: 0.5;
  }
`;

export default function Input({ conditions, onSendMessage }) {
  const [message, setMessage] = React.useState({ text: '' });

  const handleSubmit = e => {
    const { text } = message;
    e.preventDefault();
    if (text.length >= 1) {
      onSendMessage(text);
    }
    setMessage({ text: '' });
  };

  const { success } = conditions;
  return (
    <InputContainer
      variants={inputContainerVariant}
      initial='hidden'
      animate='visible'
      disabled={!success}
      onSubmit={handleSubmit}>
      <InputArea
        variants={inputItemVariant}
        onChange={e => setMessage({ text: e.target.value })}
        type='text'
        value={message.text}
        placeholder='Enter a message'
        autoFocus={true}
        disabled={success ? false : true}
      />
      <SendButton
        variants={inputItemVariant}
        type='submit'
        disabled={success ? false : true}
        value='Send'
      />
    </InputContainer>
  );
}

Input.propTypes = {
  conditions: PropTypes.object.isRequired,
  onSendMessage: PropTypes.func.isRequired,
};
