import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import * as SendBird from 'sendbird';
import store from 'store';
import styled from 'styled-components';
import { AuthContext, ChatProvider } from '../context/Context';
import {
  chatManagerReducer,
  createUserMetaData,
  extractNeededMessageData,
} from '../utils/chatFunctions';
import { SENDBIRD_APP_ID } from '../utils/file';
import { hashCode } from '../utils/helper';
import ChatArea from './ChatArea';
import Settings from './Settings';
import Sidebar from './Sidebar';

const ChatRoomContainer = styled.div.attrs({
  className: 'wrapper',
})`
  display: flex;
  align-items: center;
  overflow: hidden;
`;

// TODO add general error page
// TODO add loading features
// TODO add date data to ChatArea
// TODO Make chatArea and settings area responsive

export default function Chatroom({ setAuth }) {
  const { activeUserName: username, isAuthenticated } = React.useContext(
    AuthContext
  );
  const [chatManager, dispatch] = React.useReducer(chatManagerReducer, null);
  const [sb] = React.useState(() => new SendBird({ appId: SENDBIRD_APP_ID }));
  const match = useRouteMatch();

  React.useEffect(() => {
    if (!isAuthenticated) return;
    try {
      const activeUserData = store
        .get('users')
        .find(({ username: name }) => name === username);
      const id = activeUserData.id;

      sb.connect(hashCode(id) + '', (user, error) => {
        if (error) throw new Error(error.message);

        const friendArray = user.metaData.friends ?? JSON.stringify([]);
        user.nickname = username;

        createUserMetaData(user, {
          friends: friendArray,
        });

        dispatch({ type: 'Connect', isConnected: true });
      });
      sb.updateCurrentUserInfo(username, '');
    } catch (e) {
      console.error(e);
      dispatch({ type: 'Error', error: e });
    }
    return () => {
      dispatch({ type: 'Reset' });
      sb.disconnect(() => {
        console.log('disconnected');
      });
    };
  }, []);

  const createOneToOneChannel = ({ inviteeHash, inviteeName }) => {
    const { userChannel } = chatManager;

    if (userChannel && userChannel.memberMap.hasOwnProperty(inviteeHash)) {
      return;
    } else {
      dispatch({ type: 'Exit Chat' });
      dispatch({ type: 'New Chat' });
    }

    sb.GroupChannel.createChannelWithUserIds(
      [inviteeHash],
      true,
      inviteeName,
      '',
      ' ',
      (channel, error) => {
        if (error) dispatch({ type: 'Error', error: error.message });

        const prevMessages = channel.createPreviousMessageListQuery();

        prevMessages.Limit = 30;
        prevMessages.reverse = false;

        prevMessages.load((messages, error) => {
          if (error) dispatch({ type: 'Error', error: error.message });

          const filteredMessages = messages.map(extractNeededMessageData);

          dispatch({
            type: 'New channel and message',
            channel,
            messages: filteredMessages,
          });
        });
      }
    );
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

  if (!isAuthenticated) {
    return <Redirect to='/' />;
  } else {
    return (
      <ChatRoomContainer>
        {success && (
          <ChatProvider value={chatContextObj}>
            <Sidebar inviteUser={createOneToOneChannel} />

            <Switch>
              <Route path={`${match.path}/settings`}>
                <Settings setAuth={setAuth} />
              </Route>

              <Route path={match.path}>
                <ChatArea />
              </Route>
            </Switch>
          </ChatProvider>
        )}

        {loading && !error && <p>Loading</p>}

        {error && <p>{chatManager.error}</p>}
      </ChatRoomContainer>
    );
  }
}
