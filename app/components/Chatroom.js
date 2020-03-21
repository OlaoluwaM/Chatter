import React from 'react';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';
import * as SendBird from 'sendbird';
import styled from 'styled-components';
import { SENDBIRD_APP_ID } from '../utils/file';
import { AuthContext, ChatProvider } from '../context/Context';
import {
  createUserMetaData,
  createGroupParamEntries,
  chatManagerReducer,
  extractNeededMessageData,
} from '../utils/chatFunctions';

const ChatRoomContainer = styled.div.attrs({
  className: 'wrapper',
})`
  display: flex;
  align-items: center;
  overflow: hidden;
  background: ${({ theme }) => theme.darkMain};
`;

export default function Chatroom() {
  const { user: userId, color } = React.useContext(AuthContext);

  const [chatManager, dispatch] = React.useReducer(chatManagerReducer, null);
  const [sb] = React.useState(() => new SendBird({ appId: SENDBIRD_APP_ID }));

  React.useEffect(() => {
    try {
      sb.connect(userId, (user, error) => {
        if (error) throw new Error(error.message);

        const array = user.metaData.friends ?? JSON.stringify([]);

        createUserMetaData(user, {
          avatarColor: color,
          friends: array,
        });

        dispatch({ type: 'Connect', isConnected: user !== null });
      });
    } catch (e) {
      console.error(e);
      dispatch({ type: 'Error', error: e });
    }

    return () => {
      dispatch({ type: 'Reset' });
      sb.disconnect();
    };
  }, []);

  const createOneToOneChannel = users => {
    const { '0': currentUser, '1': invitee } = users;
    const { userChannel } = chatManager;

    if (userChannel && userChannel.memberMap.hasOwnProperty(invitee)) {
      return;
    } else if (userChannel) {
      dispatch({ type: 'New Chat' });
    }

    const gCParams = new sb.GroupChannelParams();

    gCParams.addUserId(invitee);
    const obj = Object.fromEntries(createGroupParamEntries(currentUser));
    Object.assign(gCParams, obj);

    sb.GroupChannel.createChannel(gCParams, (channel, error) => {
      if (error) dispatch({ type: 'Error', error: error.message });

      const prevMessages = channel.createPreviousMessageListQuery();
      (prevMessages.Limit = 30), (prevMessages.reverse = false);

      prevMessages.load((messages, error) => {
        if (error) dispatch({ type: 'Error', error: error.message });

        const filteredMessages = messages.map(extractNeededMessageData);

        dispatch({
          type: 'New channel and message',
          channel,
          messages: filteredMessages,
        });
      });
    });
  };

  const chatManagerIsSetup = chatManager?.connected ?? false;

  const { success, loading, error } = {
    success: sb && chatManagerIsSetup && !chatManager.error,
    loading: !sb && chatManagerIsSetup && !chatManager.error,
    error: chatManagerIsSetup && chatManager.error !== undefined,
  };

  const chatContextObj = {
    sb,
    chatManager,
    dispatch,
  };

  return (
    <ChatRoomContainer>
      {success && (
        <ChatProvider value={chatContextObj}>
          <Sidebar inviteUser={createOneToOneChannel} />
          <ChatArea />
        </ChatProvider>
      )}

      {loading && !error && <p>Loading</p>}

      {error && <p>{chatManager.error}</p>}
    </ChatRoomContainer>
  );
}
