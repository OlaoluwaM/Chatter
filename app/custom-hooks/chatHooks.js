import React from 'react';
import { AuthContext, ChatContext } from '../context/Context';
import { createUserMetaData, getFriendList } from '../utils/chatFunctions';

export function useFriendList() {
  const { sb, dispatch } = React.useContext(ChatContext);
  const { currentUser } = sb;

  const [friendList, setFriendList] = React.useState([]);
  const [friendNames, setFriendNames] = React.useState(() =>
    getFriendList(currentUser)
  );

  React.useEffect(() => {
    createUserMetaData(sb.currentUser, {
      friends: JSON.stringify(friendNames),
    });

    const applicationUserListQuery = sb.createApplicationUserListQuery();

    applicationUserListQuery.next(function (users, error) {
      if (error) dispatch({ type: 'Error', error: error.message });

      setFriendList(
        users.filter(({ nickname }) => friendNames.includes(nickname))
      );
    });
  }, [JSON.stringify(friendNames)]);

  return [friendList, friendNames, setFriendNames];
}

export function useUserFilter() {
  const { activeUserName } = React.useContext(AuthContext);
  const { chatManager, sb, dispatch } = React.useContext(ChatContext);

  const [userList, setUserList] = React.useState([]);
  const [filter, setFilter] = React.useState(null);

  const prevUserList = usePrevUserList(filter);
  const currentUser = activeUserName.toLowerCase();

  React.useEffect(() => {
    if (!filter && prevUserList) {
      setUserList(() => {
        const invitee = chatManager?.invitee ? [chatManager?.invitee] : [];
        const filtered = prevUserList.filter(
          ({ nickname }) => nickname !== invitee[0]?.nickname
        );
        return [...invitee, ...filtered];
      });
      return;
    }

    const applicationUserListQuery = sb.createApplicationUserListQuery();

    applicationUserListQuery.next(function (users, error) {
      if (error) dispatch({ type: 'Error', error: error.message });

      setUserList(() => {
        const invitee = chatManager?.invitee;
        const prevList = invitee ? [invitee] : [];

        const newList = users.filter(({ nickname }) => {
          const nicknameLowerCase = nickname.toLowerCase();

          return (
            nicknameLowerCase.includes(filter) &&
            nicknameLowerCase !== currentUser &&
            nicknameLowerCase !== invitee?.nickname.toLowerCase()
          );
        });
        return [...prevList, ...newList];
      });
    });
  }, [filter, JSON.stringify(prevUserList)]);

  return [userList, setFilter];
}

function usePrevUserList(filter) {
  const { activeUserName: currentUser } = React.useContext(AuthContext);
  const { sb, dispatch } = React.useContext(ChatContext);
  const [prevUserList, setPrevUserList] = React.useState([]);

  React.useEffect(() => {
    if (filter) return;
    const channelListQuery = sb.GroupChannel.createMyGroupChannelListQuery();
    channelListQuery.includeEmpty = true;
    channelListQuery.order = 'latest_last_message';
    channelListQuery.limit = 15;

    if (channelListQuery.hasNext) {
      channelListQuery.next(function (channelList, error) {
        if (error) dispatch({ type: 'Error', error: error.message });

        const prevChats = channelList
          .map(
            channel =>
              channel.members.length > 1 &&
              channel.members.filter(
                ({ nickname }) => nickname !== currentUser
              )[0]
          )
          .filter(Boolean);

        setPrevUserList(prevChats);
      });
    }
  }, [filter]);

  return prevUserList;
}

export function useBlockedUsers() {
  const { sb, dispatch } = React.useContext(ChatContext);
  const timeout = React.useRef();

  const [blockedUsersList, setBlockedList] = React.useState([]);
  const [blockMessage, setBlockMessage] = React.useState('initial');

  React.useEffect(() => {
    const blockedUserListQuery = sb.createBlockedUserListQuery();

    timeout.current = setTimeout(() => {
      blockedUserListQuery.next(function (blockedUsers, error) {
        if (error) dispatch({ type: 'Error', error: error.message });

        setBlockedList(blockedUsers);
      });
    }, 500);

    return () => clearTimeout(timeout.current);
  }, [blockMessage]);

  return [blockedUsersList, setBlockMessage];
}
