import React from 'react';
import { getFriendList } from '../utils/chatFunctions';
import { AuthContext } from '../context/Context';

export function useFriendList(sb, dispatch, user) {
  const [friendList, setFriendList] = React.useState([]);

  const Userfriends = React.useMemo(() => getFriendList(user), [
    JSON.parse(user.metaData.friends).length,
  ]);

  React.useEffect(() => {
    const applicationUserListQuery = sb.createApplicationUserListQuery();

    applicationUserListQuery.next(function(users, error) {
      if (error) dispatch({ type: 'Error', error: error.message });
      setFriendList(users.filter(({ userId }) => Userfriends.includes(userId)));
    });
  }, [Userfriends.length]);

  return [friendList];
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
