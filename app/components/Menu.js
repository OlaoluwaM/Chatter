import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import {
  useBlockedUsers,
  useFriendList,
  useUserFilter,
} from '../custom-hooks/chatHooks';
import { hexToRgb } from '../utils/helper';
import { simpleVariant } from '../utils/motionObj';
import SearchUser from './SearchBar';
import User from './User';

const MenuContainer = styled(motion.menu)`
  height: 70%;
  width: 100%;
  position: absolute;
  overflow-y: auto;
  z-index: 3;
  padding: 10px;
  margin: 0;
  overflow-x: hidden;
  padding-top: 0px;

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => hexToRgb(theme.primaryColor, 0.3)};
  }
`;

const AlertText = styled(motion.p).attrs({
  variants: simpleVariant,
  initial: 'hide',
  animate: 'show',
  exit: 'hide',
})`
  color: ${({ theme }) => theme.secondaryColorDark};
  padding-left: 27px;
  margin-bottom: 0;
  position: absolute;
  top: 0;
`;

export default function Menu({ category, inviteUser }) {
  const [userList, setFilter] = useUserFilter();
  const [friendList, friendNames, setFriendNames] = useFriendList();
  const [blockedUsersList, setBlockMessage] = useBlockedUsers();

  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    switch (category) {
      case 'users':
        setUsers(userList);
        break;

      case 'friends':
        setUsers(friendList);
        break;

      case 'blocked':
        setUsers(blockedUsersList);
        break;
    }

    return () => {
      console.log('change');
      // setUsers([]);
    };
  }, [
    category,
    JSON.stringify(userList),
    JSON.stringify(friendList),
    JSON.stringify(blockedUsersList),
  ]);

  const searchForUser = input => {
    const filter = input?.toLowerCase() ?? null;

    if (category === 'friends') {
      setUsers(
        friendList.filter(({ nickname }) => {
          const lowerCaseNickname = nickname.toLowerCase();
          if (filter) {
            return (
              lowerCaseNickname.includes(filter) || filter === lowerCaseNickname
            );
          } else return true;
        })
      );
    } else setFilter(filter);
  };

  const { success, empty } = {
    success: users.length > 0,
    empty: users.length === 0,
  };

  const funcs = {
    beFriend(friend) {
      setFriendNames(arr => [...arr, friend.nickname]);
    },

    unFriend(friend) {
      const { nickname: friendName } = friend;
      setFriendNames(arr => arr.filter(Id => Id !== friendName));
    },

    inviteUser,
  };

  return (
    <>
      <AnimatePresence>
        <SearchUser
          key='input'
          motionProps={{
            positionTransition: true,
            initial: { opacity: 0 },
            animate: { opacity: 1, transition: { delay: 0.7 } },
            exit: { opacity: 0, transition: { delay: 0.7 } },
          }}
          category={category}
          searchForUser={searchForUser}
        />

        <MenuContainer
          key='container'
          exit={{ opacity: 0 }}
          layoutTransition={true}>
          {typeof users === 'string' && (
            <AlertText key='custom-m'>{users}</AlertText>
          )}

          <AnimatePresence key='users'>
            {success &&
              users.map((data, ind) => {
                const { userId } = data;
                return (
                  <User
                    key={userId}
                    funcs={funcs}
                    ind={ind}
                    userData={data}
                    friends={friendNames}
                    blocked={{ blockedUsersList, setBlockMessage }}
                  />
                );
              })}
          </AnimatePresence>

          {empty && <AlertText key='error-m'>User does not exist</AlertText>}
        </MenuContainer>
      </AnimatePresence>
    </>
  );
}
