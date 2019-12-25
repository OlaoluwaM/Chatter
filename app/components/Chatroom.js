import React from 'react';
import styled from 'styled-components';
import ChatArea from './ChatArea';

const ChatRoomContainer = styled.div.attrs({
  className: 'wrapper',
})`
  display: flex;
  align-items: center;
  overflow: hidden;
`;

export default function Chatroom() {
  return (
    <ChatRoomContainer>
      <ChatArea />
    </ChatRoomContainer>
  );
}
