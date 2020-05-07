import React from 'react';
import User from './User';
import styled from 'styled-components';
import SearchUser from './SearchBar';
import { hexToRgb } from '../utils/helper';
import { ChatContext } from '../context/Context';
import { simpleVariant } from '../utils/motionObj';
import { motion, AnimatePresence } from 'framer-motion';
import {
  useUserFilter,
  useFriendList,
  useBlockedUsers,
} from '../custom-hooks/chatHooks';

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
    background: ${({ theme }) => hexToRgb(theme.primaryColor, 0.8)};
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
  const { sb, dispatch } = React.useContext(ChatContext);

  const [userList, setFilter] = useUserFilter();
  const [friendList, friendNames, setFriendNames] = useFriendList();
  const [blockedUsersList, setBlockMessage] = useBlockedUsers();

  const [users, setUsers] = React.useState(null);

  React.useEffect(() => {
    switch (category) {
      case 'users':
        setUsers(userList);
        break;

      case 'friends':
        setUsers(friendList.length > 0 ? friendList : 'No one yet');
        break;

      case 'blocked':
        setUsers(blockedUsersList.length > 0 ? blockedUsersList : 'No one yet');
        break;
    }

    return () => {
      setUsers(null);
    };
  }, [category, userList]);

  const searchForUser = input => {
    if (category !== 'friends') {
      setFilter(input);
    } else {
      if (input === '') {
        setUsers(friendList.length > 0 ? friendList : 'No one yet');
      } else {
        setUsers(
          friendList.filter(
            ({ userId }) => userId.includes(input) || input === userId
          )
        );
      }
    }
  };

  const { success, empty } = {
    success: Array.isArray(users) && users.length > 0,
    empty: Array.isArray(users) && users.length === 0,
  };

  const funcs = {
    beFriend(friend) {
      setFriendNames(arr => [...arr, friend.userId]);
    },

    unFriend(friend) {
      const { userId: friendName } = friend;
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
