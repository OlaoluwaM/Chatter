import { AnimatePresence } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import { ChatContext } from '../context/Context';
import { extractNeededMessageData } from '../utils/chatFunctions';
import { lightenDarkenColor, randomID } from '../utils/helper';
import ChatOverHead from './ChatOverhead';
import Input from './Input';
import MessageArea from './Messages';

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
  const condition = typeof chatManager?.userChannel === 'object';

  React.useEffect(() => {
    const channelHandler = new sb.ChannelHandler();
    const connectionHandler = new sb.ConnectionHandler();
    console.log(2, chatManager);

    const HANDLER_ID1 = randomID();
    const HANDLER_ID2 = randomID();

    try {
      channelHandler.onMessageReceived = handleMessageReceived;

      connectionHandler.onReconnectStarted = function () {
        console.log('reconnecting');
      };
      connectionHandler.onReconnectSucceeded = function () {
        console.log('reconnected');
      };
      connectionHandler.onReconnectFailed = function () {
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
  }, [condition]);

  const handleMessageReceived = (channel, message) => {
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

      prevMessageListQuery.load(function (prevMessages, error) {
        if (error) throw new Error(error.message);
        const ms = prevMessages.map(extractNeededMessageData);

        dispatch({
          type: 'New channel and message',
          channel,
          messages: ms,
        });
      });
    }
  };

  const onSendMessage = message => {
    const { userChannel } = chatManager;
    const { url } = userChannel;

    sb.GroupChannel.getChannel(url, (groupChannel, error) => {
      if (error) dispatch({ type: 'Error', error: error.message });

      groupChannel.sendUserMessage(message, '', '', (message, error) => {
        if (error) dispatch({ type: 'Error', error: error.message });
        dispatch({
          type: 'New message',
          messages: [extractNeededMessageData(message)],
        });
      });
    });
  };

  const isChatting = chatManager?.userChannel && chatManager.invitee;

  return (
    <ChatAreaWrapper>
      {/* {!chatManager.userChannel && (
        <DefaultDisplay text='Select a user or a channel to start chatting' />
      )} */}

      <AnimatePresence exitBeforeEnter={true}>
        {isChatting && (
          <ChatOverHead
            key={chatManager.invitee.userId}
            invitee={chatManager.invitee}
          />
        )}
      </AnimatePresence>

      <MessageArea messages={chatManager.messages || []} />
      <Input disabled={!isChatting} onSendMessage={onSendMessage} />
    </ChatAreaWrapper>
  );
}
