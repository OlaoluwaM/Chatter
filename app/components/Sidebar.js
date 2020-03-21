import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { hexToRgb } from '../utils/helper';
import { UserDisplay } from './DataDisplay';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext, ChatContext } from '../context/Context';
import { handleUnBlock, handleBlock } from '../utils/chatFunctions';
import { default as styled, css, ThemeContext } from 'styled-components';
import { MdSettings, MdSearch, MdNotifications, MdBlock } from 'react-icons/md';
import {
  useUserFilter,
  useFriendList,
  useBlockedUsers,
} from '../custom-hooks/chatHooks';
import {
  menuItemVariant,
  simpleVariant,
  currentUserDisplayVariants,
} from '../utils/motionObj';

const SidebarContainer = styled.nav`
  position: relative;
  height: 100%;
  flex-basis: 30%;
  width: 100%;
  color: ${({ theme }) => theme.sub};
`;

const MenuContainer = styled(motion.menu)`
  height: 66%;
  width: 100%;
  position: absolute;
  overflow-y: auto;
  z-index: 3;
  padding: 10px;
  margin: 0;
  overflow-x: hidden;
  padding-top: 0px;

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => hexToRgb(theme.black, 0.4)};
  }
`;

const AlertText = styled(motion.p).attrs({
  variants: simpleVariant,
  initial: 'hide',
  animate: 'show',
  exit: 'hide',
})`
  color: ${({ theme }) => theme.darkSub};
  padding-left: 27px;
  margin-bottom: 0;
  position: absolute;
  top: 0;
`;

const MenuItem = styled(motion.div).attrs({
  variants: menuItemVariant,
  positionTransition: true,
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
})`
  width: 95%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  background: ${({ theme }) => theme.main};
  color: ${({ theme }) => theme.sub};
  justify-self: center;
  align-self: center;
  cursor: pointer;
  height: auto;

  ${({ status }) =>
    status === 'offline' &&
    css`
      filter: opacity(0.4) brightness(0.4);
    `}
  &.user {
    position: absolute;
    top: ${({ position }) => `calc(88px * ${position})`};

    svg {
      transition: background 0.4s ease;
    }
  }
`;

export const CurrentUserDisplay = styled(MenuItem).attrs({
  variants: currentUserDisplayVariants,
  exit: 'hidden',
})`
  width: 96%;
  height: auto;
  background: ${({ theme }) => theme.main};
  color: ${({ theme }) => theme.sub};
  margin: 7px;
  cursor: default;
`;

const SideBarCategory = styled.ul`
  width: 100%;
  margin: 0;
  margin-top: 60px;
  margin-bottom: 3px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.8rem;
  list-style: none;
  padding: 10px;
  font-family: var(--font1);
  font-weight: 600;
  text-transform: capitalize;
  color: ${({ theme }) => hexToRgb(theme.black, 0.4)};

  li {
    transition: 0.3s ease;
    cursor: pointer;
    margin-left: 28px;
    &:not(:first-of-type) {
      margin-left: 40px;
    }
  }
`;

const SearchBarForm = styled(motion.form)`
  width: 100%;
  display: flex;
  padding: 10px;
  padding-top: 0;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 12px;

  & > input {
    border: none;
    border-bottom: 1.5px double ${({ theme }) => hexToRgb(theme.black, 0.4)};
    flex-basis: 75%;
    outline: transparent;
    background: transparent;
    text-indent: 12px;
    transition: 0.5s ease;
    font-family: var(--font2);
    font-size: 1.1rem;
    font-weight: 100;
    border-radius: 2px;
    padding: 3px;

    &:focus {
      border-color: ${({ theme }) => theme.darkSub};
    }
  }

  & > div {
    background: ${({ theme }) => theme.main};
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    font-size: 1.4rem;
    transform: scaleX(-1);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    svg {
      stroke-width: 1.1px;
      stroke: ${({ theme }) => theme.sub};
      fill: ${({ theme }) => theme.sub};
    }
  }
`;
const InitialSvgStyle = color => ({
  stroke: color,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 0,
  rotate: 0,
  y: 0,
});

function CurrentUser({ user }) {
  return (
    <CurrentUserDisplay
      variants={currentUserDisplayVariants}
      initial='hidden'
      animate='visible'>
      <UserDisplay isCurrentUser={true} data={user}>
        <MdSettings style={{ cursor: 'pointer' }} />
        <MdNotifications style={{ cursor: 'pointer' }} />
      </UserDisplay>
    </CurrentUserDisplay>
  );
}

function SearchUser({ category, searchForUser, motionProps }) {
  const [input, setInput] = React.useState('');

  React.useEffect(() => {
    setInput('');
  }, [category]);

  const handleSubmit = e => {
    e.preventDefault();
    searchForUser(input);
  };

  const handleInputChange = e => {
    if (e.target.value === '') {
      searchForUser('');
    }
    setInput(e.target.value);
  };

  return (
    <SearchBarForm {...motionProps} onSubmit={handleSubmit}>
      <input onChange={handleInputChange} value={input} />
      <div onClick={() => searchForUser(input)}>
        <MdSearch />
      </div>
    </SearchBarForm>
  );
}

function AvailableUser(props) {
  const { user: currentUserName } = React.useContext(AuthContext);
  const { sb, dispatch } = React.useContext(ChatContext);
  const { sub } = React.useContext(ThemeContext);

  const { userData, ind, funcs, friends, blocked } = props;
  const { blockedUsersList, setBlockMessage } = blocked;
  const { beFriend, unFriend, inviteUser } = funcs;

  const [isBlocked, setBlocked] = React.useState(() =>
    blockedUsersList.map(obj => obj.userId).includes(userData.userId)
  );

  const [isFriend, setIsFriend] = React.useState(() =>
    friends.includes(userData.userId)
  );

  const blockUser = targetUser => {
    try {
      const message = isBlocked
        ? handleUnBlock(targetUser, sb)
        : handleBlock(targetUser, sb);
      console.log(message);
      setBlockMessage(message);
      setBlocked(isBlocked ? false : true);
    } catch (error) {
      console.error(error);
      dispatch({ type: 'Error', error });
    }
  };

  const handleInvite = (e, userData, blocked) => {
    if (blocked) return;
    const actionArea = e.currentTarget.querySelector('.action-area');
    if (!actionArea.contains(e.target)) {
      inviteUser([currentUserName, userData.userId]);
    } else return;
  };

  const handleFriend = () => {
    if (isFriend) {
      setIsFriend(false);
      unFriend(userData, true);
    } else {
      setIsFriend(true);
      beFriend(userData);
    }
  };

  return (
    <MenuItem
      custom={ind}
      position={ind}
      status={userData.connectionStatus}
      className='user'
      onClick={e => handleInvite(e, userData, isBlocked)}>
      <UserDisplay
        data={userData}
        subData={isBlocked ? 'Blocked' : userData.connectionStatus}>
        {!isBlocked && (
          <motion.div
            style={InitialSvgStyle(sub)}
            animate={
              isFriend
                ? {
                    ...InitialSvgStyle(sub),
                    y: 2,
                    rotate: 45,
                    stroke: 'rgba(245, 10, 10, .7)',
                  }
                : InitialSvgStyle(sub)
            }
            onTap={handleFriend}>
            <FiPlus style={{ stroke: 'inherit' }} />
          </motion.div>
        )}

        {!isFriend && (
          <MdBlock
            style={{ fill: isBlocked ? 'red' : sub }}
            onClick={() => blockUser(userData)}
          />
        )}
      </UserDisplay>
    </MenuItem>
  );
}

function Menu({ category, inviteUser }) {
  const { sb, dispatch } = React.useContext(ChatContext);

  const [userList, setFilter] = useUserFilter(sb, dispatch);
  const [friendList, friendNames, setFriendNames] = useFriendList(dispatch);
  const [blockedUsersList, setBlockMessage] = useBlockedUsers(
    category,
    dispatch
  );

  const [items, setItems] = React.useState(null);

  React.useEffect(() => {
    switch (category) {
      case 'users':
        setItems(userList);
        break;

      case 'friends':
        setItems(friendList.length > 0 ? friendList : 'No one yet');
        break;

      case 'blocked':
        setItems(blockedUsersList.length > 0 ? blockedUsersList : 'No one yet');
        break;
    }

    return () => {
      setItems(null);
    };
  }, [category, userList]);

  const searchForUser = input => {
    if (category !== 'friends') {
      setFilter(input);
    } else {
      if (input === '') {
        setItems(friendList.length > 0 ? friendList : 'No one yet');
      } else {
        setItems(
          friendList.filter(
            ({ userId }) => userId.includes(input) || input === userId
          )
        );
      }
    }
  };

  const { success, empty } = {
    success: Array.isArray(items) && items.length > 0,
    empty: Array.isArray(items) && items.length === 0,
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
        {category !== 'blocked' && (
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
        )}

        <MenuContainer
          key='container'
          exit={{ opacity: 0 }}
          layoutTransition={true}>
          {typeof items === 'string' && (
            <AlertText key='custom-m'>{items}</AlertText>
          )}

          <AnimatePresence key='items'>
            {success &&
              items.map((data, ind) => {
                const { userId } = data;
                return (
                  <AvailableUser
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

export default function Sidebar({ inviteUser }) {
  const { sb } = React.useContext(ChatContext);

  const categories = ['users', 'friends', 'blocked'];
  const [category, setCategory] = React.useState(categories[0]);

  const toggleCategory = ind => setCategory(categories[ind]);

  return (
    <SidebarContainer>
      <CurrentUser user={sb.currentUser} />

      <SideBarCategory>
        {categories.map((text, ind) => (
          <li
            className={text === category ? 'active' : ''}
            onClick={() => toggleCategory(ind)}
            key={text}>
            {text}
          </li>
        ))}
      </SideBarCategory>

      <Menu
        category={category}
        categories={categories}
        inviteUser={inviteUser}
      />
    </SidebarContainer>
  );
}
