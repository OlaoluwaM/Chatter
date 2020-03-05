import React from 'react';
import styled from 'styled-components';
import ChatArea from './ChatArea';
import Sidebar from './Sidebar';
import * as SendBird from 'sendbird';
import { filterObject } from '../utils/helper';
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
        console.log(color);
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
      dispatch({ type: 'Reset' });
      sb.disconnect();
    };
  }, []);

  const createOneToOneChannel = users => {
    const { '0': currentUser, '1': invitee } = users;
    const { userChannel } = chatManager;

    if (userChannel && userChannel.memberMap.hasOwnProperty(invitee)) return;

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
  console.log(chatManager);
  const chatManagerIsSetup =
    chatManager !== null ? Object.keys(chatManager).length > 0 : false;

  const conditions = {
    success: sb && chatManagerIsSetup && !chatManager.error,
    loading: !sb && chatManagerIsSetup && !chatManager.error,
    error: chatManagerIsSetup && chatManager.error !== undefined,
  };

  const { success, loading, error } = conditions;

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
