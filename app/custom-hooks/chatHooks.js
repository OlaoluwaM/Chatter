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
    setFriendNames(getFriendList(currentUser));

    return () => {
      setFriendList([]);
      setFriendNames(null);
    };
  }, []);

  React.useEffect(() => {
    createUserMetaData(sb.currentUser, {
      friends: JSON.stringify(friendNames),
    });

    const applicationUserListQuery = sb.createApplicationUserListQuery();

    applicationUserListQuery.next(function (users, error) {
      if (error) dispatch({ type: 'Error', error: error.message });
      setFriendList(users.filter(({ userId }) => friendNames.includes(userId)));
    });
  }, [friendNames.length]);

  return [friendList, friendNames, setFriendNames];
}

export function useUserFilter() {
  const { activeUserName: currentUser } = React.useContext(AuthContext);
  const { chatManager, sb, dispatch } = React.useContext(ChatContext);
  const prevUserList = usePrevUserList();

  console.log(prevUserList, prevUserList.length);
  const [userList, setUserList] = React.useState(null);
  const [filter, setFilter] = React.useState('');

  React.useEffect(() => {
    setUserList(prevUserList);
  }, [prevUserList.length]);

  React.useEffect(() => {
    if (filter === currentUser) {
      setUserList("That's you!");
    } else if (filter === '' || filter === null) {
      setUserList(list =>
        chatManager?.invitee
          ? filterUser(list, chatManager?.invitee.userId)
          : null
      );
    } else {
      const applicationUserListQuery = sb.createApplicationUserListQuery();

      applicationUserListQuery.next(function (users, error) {
        if (error) dispatch({ type: 'Error', error: error.message });

        setUserList(() => {
          const invitee = chatManager?.invitee;
          const prevList = invitee ? [invitee] : [];
          const newList = users.filter(
            ({ userId }) =>
              userId.includes(filter) &&
              userId !== currentUser &&
              userId !== invitee?.userId
          );
          return [...prevList, ...newList];
        });
      });
    }
  }, [filter]);

  return [userList, setFilter];
}

function usePrevUserList() {
  const { activeUserName: currentUser } = React.useContext(AuthContext);
  const { sb, dispatch } = React.useContext(ChatContext);
  const [prevUserList, setPrevUserList] = React.useState(null);

  React.useEffect(() => {
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
              channel.members.filter(({ userId }) => userId !== currentUser)[0]
          )
          .filter(Boolean);

        console.log(prevChats, channelList);
        setPrevUserList(prevChats);
      });
    }
  }, []);

  return prevUserList ?? [];
}

export function useBlockedUsers() {
  const { sb, dispatch } = React.useContext(ChatContext);

  const [blockedUsersList, setBlockedList] = React.useState([]);
  const [blockMessage, setBlockMessage] = React.useState('initial');

  React.useEffect(() => {
    console.log('updated');
    const blockedUserlistQuery = sb.createBlockedUserListQuery();

    const t = setTimeout(() => {
      blockedUserlistQuery.next(function (blockedUsers, error) {
        if (error) dispatch({ type: 'Error', error: error.message });
        console.log(blockedUsers);
        setBlockedList(blockedUsers);
      });
    }, 500);

    return () => clearTimeout(t);
  }, [blockMessage]);

  return [blockedUsersList, setBlockMessage];
}
