import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InputContainer = styled.form`
  width: 100%;
  height: 12%;
  flex-basis: 12%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
  display: flex;
  padding-left: 15px;
  justify-content: flex-start;
  align-items: center;
  background: var(--main);
`;

const InputArea = styled.input`
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
  transition: 0.3s ease;
  background: var(--main);

  &:hover,
  &:focus {
    border: 2px solid rgba(153, 102, 204, 1);
  }
  &:disabled {
    opacity: 0.3;
  }
`;
const SendButton = styled.button`
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
    opacity: 0.3;
  }
`;

export default function Input({ conditions, onSendMessage }) {
  const [message, setMessage] = React.useState({ text: '' });

  const handleSubmit = e => {
    const { text } = message;
    e.preventDefault();
    onSendMessage(text);
    setMessage({ text: '' });
  };

  const { success } = conditions;
  return (
    <InputContainer disabled={!success} onSubmit={handleSubmit}>
      <InputArea
        onChange={e => setMessage({ text: e.target.value })}
        type='text'
        value={message.text}
        placeholder='Enter a message'
        autoFocus={true}
        disabled={success ? false : true}
      />
      <SendButton
        as='input'
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
