import React from 'react';
import Input from './Input';
import styled from 'styled-components';
import MessageArea from './Messages';
import { AuthContext, ChatContext } from '../context/Context';
import { randomID } from '../utils/helper';
import { addMessage } from '../utils/chatFunctions';

const ChatAreaWrapper = styled.div`
  background: ${({ theme }) => theme.main};
  height: 100%;
  flex-grow: 1;
  margin-top: 15px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export default function ChatArea() {
  const { sb, chatManager, dispatch } = React.useContext(ChatContext);

  const [channelHandler] = React.useState(() => new sb.ChannelHandler());

  React.useEffect(() => {
    const HANDLER_ID = randomID();

    try {
      channelHandler.onMessageReceived = (channel, message) => {
        console.log(addMessage(message));
        if (chatManager !== null && chatManager.hasOwnProperty('userChannel')) {
          console.log(111);
          dispatch({ type: 'New message', messages: [addMessage(message)] });
        } else {
          console.log(222);
          dispatch({
            type: 'New channel and message',
            channel,
            messages: [addMessage(message)],
          });
        }
      };

      sb.addChannelHandler(HANDLER_ID, channelHandler);
    } catch (error) {
      console.error(error);
      dispatch({ type: 'Error', error });
    }

    return () => {
      sb.removeChannelHandler(HANDLER_ID);
    };
  });

  const onSendMessage = message => {
    const { userChannel } = chatManager;
    const { url } = userChannel;

    sb.GroupChannel.getChannel(url, (groupChannel, error) => {
      if (error) dispatch({ type: 'Error', error: error.message });

      groupChannel.sendUserMessage(message, '', '', (message, error) => {
        if (error) dispatch({ type: 'Error', error: error.message });

        dispatch({ type: 'New message', messages: [addMessage(message)] });
      });
    });
  };

  return (
    <ChatAreaWrapper>
      <MessageArea messages={chatManager.messages || []} />
      <Input onSendMessage={onSendMessage} />
    </ChatAreaWrapper>
  );
}
