import React from 'react';
import { getFriendList, createUserMetaData } from '../utils/chatFunctions';
import { AuthContext, ChatContext } from '../context/Context';

export function useFriendList(dispatch) {
  const { sb } = React.useContext(ChatContext);
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

    applicationUserListQuery.next(function(users, error) {
      if (error) dispatch({ type: 'Error', error: error.message });
      setFriendList(users.filter(({ userId }) => friendNames.includes(userId)));
    });
  }, [friendNames.length]);

  return [friendList, friendNames, setFriendNames];
}

export function useUserFilter(sb, dispatch) {
  const { user: currentUser } = React.useContext(AuthContext);
  const [userList, setUserList] = React.useState(null);
  const [filter, setFilter] = React.useState('');

  React.useEffect(() => {
    if (filter === currentUser) {
      setUserList("That's you!");
    } else if (filter === '' || filter === null) {
      setUserList(null);
    } else {
      const applicationUserListQuery = sb.createApplicationUserListQuery();

      applicationUserListQuery.next(function(users, error) {
        if (error) dispatch({ type: 'Error', error: error.message });

        setUserList(
          users.filter(
            ({ userId }) => userId.includes(filter) && userId !== currentUser
          )
        );
      });
    }
  }, [filter]);

  return [userList, setFilter];
}

export function useBlockedUsers(category, dispatch) {
  const { sb } = React.useContext(ChatContext);

  const [blockedUsersList, setBlockedList] = React.useState([]);
  const [blockMessage, setBlockMessage] = React.useState('initial');

  React.useEffect(() => {
    const blockedUserlistQuery = sb.createBlockedUserListQuery();

    blockedUserlistQuery.next(function(blockedUsers, error) {
      if (error) dispatch({ type: 'Error', error: error.message });
      console.log(blockedUsers);
      setBlockedList(blockedUsers);
    });
  }, [blockMessage]);

  return [blockedUsersList, setBlockMessage];
}
