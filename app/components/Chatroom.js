import React from 'react';
import styled from 'styled-components';
import ChatArea from './ChatArea';

const ChatRoomContainer = styled.div`
  width: 100%;
  height: 94%;
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
