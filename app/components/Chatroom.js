import React from 'react';
import styled from 'styled-components';
import ChatArea from './ChatArea';
import { Wrapper } from './UI-components';

const ChatRoomContainer = styled(Wrapper)`
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
