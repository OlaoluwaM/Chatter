import React from 'react';
import * as SendBird from 'sendbird';
import styled from 'styled-components';
import ChatArea from './ChatArea';
import Sidebar from './Sidebar';
import { filterObject } from '../utils/helper';
import { SENDBIRD_APP_ID } from '../utils/file';
import { AuthContext, ChatProvider } from '../context/Context';
import {
  createUserMetaData,
  createGroupParamEntries,
  chatManagerReducer,
} from '../utils/chatFunctions';
import { addMessage } from '../utils/chatFunctions';

const ChatRoomContainer = styled.div.attrs({
  className: 'wrapper',
})`
  display: flex;
  align-items: center;
  overflow: hidden;
`;

export default function Chatroom() {
  const { user: userId, color } = React.useContext(AuthContext);

  const [sb] = React.useState(() => new SendBird({ appId: SENDBIRD_APP_ID }));
  const [gCParams] = React.useState(() => new sb.GroupChannelParams());

  const [chatManager, dispatch] = React.useReducer(chatManagerReducer, null);

  React.useEffect(() => {
    try {
      sb.connect(userId, (user, error) => {
        if (error) throw new Error(error.message);

        createUserMetaData(user, { avatarColor: color });

        const filteredUserObj = filterObject(user, [
          'userId',
          'connectionStatus',
          'lastSeenAt',
          'isBlockedByMe',
          'isBlockingMe',
          'metaData',
          'isActive',
          'friendDiscoveryKey',
          'friendName',
        ]);

        dispatch({ type: 'New user', user: filteredUserObj });
      });
    } catch (e) {
      console.error(e);
      dispatch({ type: 'Error', error: e });
    }

    return () => {
      sb.disconnect();
      dispatch({ type: 'Reset' });
    };
  }, []);

  const createOneToOneChannel = users => {
    const { '0': currentUser, '1': invitee } = users;

    gCParams.addUserId(invitee);
    const obj = Object.fromEntries(createGroupParamEntries(currentUser));
    Object.assign(gCParams, obj);

    sb.GroupChannel.createChannel(gCParams, (channel, error) => {
      if (error) dispatch({ type: 'Error', error: error.message });

      const prevMessages = channel.createPreviousMessageListQuery();
      (prevMessages.Limit = 30), (prevMessages.reverse = false);

      prevMessages.load((messages, error) => {
        if (error) dispatch({ type: 'Error', error: error.message });

        const filteredMessages = messages.map(addMessage);
        console.log(filteredMessages);

        dispatch({
          type: 'New channel and message',
          channel,
          messages: filteredMessages,
        });
      });
    });
  };

  const chatManagerIsSetup =
    chatManager !== null ? Object.keys(chatManager).length > 0 : false;

  const conditions = {
    success: sb && chatManagerIsSetup && !chatManager.error,
    loading: !sb && chatManagerIsSetup && !chatManager.error,
    error: chatManagerIsSetup && chatManager.error !== undefined,
  };

  const { success, loading, error } = conditions;
  console.log(chatManager);

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
