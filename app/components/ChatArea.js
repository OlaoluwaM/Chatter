import React from 'react';
import Input from './Input';
import styled from 'styled-components';
import MessageArea from './Messages';
import DefaultDisplay from './DefaultDisplay';
import ChatOverHead from './ChatOverhead';
import { ChatContext } from '../context/Context';
import { extractNeededMessageData } from '../utils/chatFunctions';
import { randomID, lightenDarkenColor } from '../utils/helper';

const ChatAreaWrapper = styled.div`
  background: ${({ theme }) =>
    lightenDarkenColor(theme.secondaryColorDark, -15)};
  height: 100%;
  flex-grow: 1;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  padding-bottom: 8px;
`;

export default function ChatArea() {
  const { sb, chatManager, dispatch } = React.useContext(ChatContext);

  React.useEffect(() => {
    const channelHandler = new sb.ChannelHandler();
    const connectionHandler = new sb.ConnectionHandler();

    const HANDLER_ID1 = randomID();
    const HANDLER_ID2 = randomID();

    try {
      channelHandler.onMessageReceived = (channel, message) => {
        const messages = [extractNeededMessageData(message)];

        if (chatManager?.hasOwnProperty('userChannel')) {
          dispatch({
            type: 'New message',
            messages,
          });
        } else {
          console.log('once');
          const prevMessageListQuery = channel.createPreviousMessageListQuery();
          prevMessageListQuery.limit = 50;
          prevMessageListQuery.reverse = false;

          prevMessageListQuery.load(function(prevMessages, error) {
            if (error) throw new Error(error.message);
            const ms = prevMessages.map(extractNeededMessageData);

            dispatch({
              type: 'New channel and message',
              channel,
              messages: [...ms, ...messages],
            });
          });
        }
      };

      connectionHandler.onReconnectStarted = function() {
        console.log('reconnecting');
      };
      connectionHandler.onReconnectSucceeded = function() {
        console.log('reconnected');
      };
      connectionHandler.onReconnectFailed = function() {
        console.log('reload');
      };

      sb.addChannelHandler(HANDLER_ID1, channelHandler);
      sb.addConnectionHandler(HANDLER_ID2, connectionHandler);
    } catch (error) {
      console.error(error);
      dispatch({ type: 'Error', error });
    }

    return () => {
      sb.removeChannelHandler(HANDLER_ID1);
      sb.removeConnectionHandler(HANDLER_ID2);
    };
  }, []);

  const onSendMessage = message => {
    const { userChannel } = chatManager;
    const { url } = userChannel;

    sb.GroupChannel.getChannel(url, (groupChannel, error) => {
      if (error) dispatch({ type: 'Error', error: error.message });

      groupChannel.sendUserMessage(message, '', '', (message, error) => {
        if (error) dispatch({ type: 'Error', error: error.message });
        console.log(groupChannel);
        dispatch({
          type: 'New message',
          messages: [extractNeededMessageData(message)],
        });
      });
    });
  };

  return (
    <ChatAreaWrapper>
      {!chatManager.userChannel && (
        <DefaultDisplay text='Select a user or a channel to start chatting' />
      )}

      {chatManager.userChannel && chatManager.invitee && (
        <>
          <ChatOverHead />
          <MessageArea messages={chatManager.messages || []} />
          <Input onSendMessage={onSendMessage} />
        </>
      )}
    </ChatAreaWrapper>
  );
}
