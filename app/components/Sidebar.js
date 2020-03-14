import React from 'react';
import styled from 'styled-components';
import { hexToRgb } from '../utils/helper';
import {
  getFriendList,
  addFriend,
  removeFriend,
  handlefriendLogic,
} from '../utils/chatFunctions';
import { UserDisplay } from './DataDisplay';
import { useUserFilter, useFriendList } from '../custom-hooks/chatHooks';
import { FiUserPlus, FiUserMinus } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext, ChatContext } from '../context/Context';
import { MdSettings, MdSearch, MdNotifications, MdBlock } from 'react-icons/md';
import {
  menuVariants,
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
  height: 64%;
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
})`
  color: ${({ theme }) => theme.darkSub};
  padding-left: 27px;
  margin-bottom: 0;
  position: absolute;
  top: 0;
`;

const MenuItem = styled(motion.div).attrs({
  variants: menuItemVariant,
  exit: 'hidden',
  initial: 'hidden',
  animate: 'visible',
})`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  background: ${({ theme, blocked }) =>
    !blocked ? theme.main : hexToRgb(theme.black, 0.5)};
  color: ${({ theme }) => theme.sub};
  justify-self: center;
  align-self: center;
  cursor: pointer;
  height: auto;
`;

export const CurrentUserDisplay = styled(MenuItem).attrs({
  variants: currentUserDisplayVariants,
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

function CurrentUser({ user }) {
  return (
    <CurrentUserDisplay
      variants={currentUserDisplayVariants}
      initial='hidden'
      animate='visible'>
      <UserDisplay isOverhead={true} data={user}>
        <MdSettings style={{ cursor: 'pointer' }} />
        <MdNotifications style={{ cursor: 'pointer' }} />
      </UserDisplay>
    </CurrentUserDisplay>
  );
}

function SearchUser({ searchForUser, motionProps }) {
  const [input, setInput] = React.useState('');

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
  const { sb, dispatch, chatManager } = React.useContext(ChatContext);

  const { user: currentUserData } = chatManager;
  const { userData, ind, funcs } = props;
  const { beFriend, unFriend, inviteUser } = funcs;

  const [isBlocked, setBlocked] = React.useState(false);
  const [isFriend, setIsFriend] = React.useState(() =>
    getFriendList(currentUserData).includes(userData.userId)
  );

  const handleBlock = targetUser => {
    sb.blockUser(targetUser, (user, error) => {
      if (error) dispatch({ type: 'Error', error: error.message });
      console.log(`${user} has been blocked`);
      setBlocked(true);
    });
  };

  const handleUnBlock = blockedUser => {
    sb.unblockUser(blockedUser, (user, error) => {
      if (error) dispatch({ type: 'Error', error: error.message });
      console.log(`${user} has been unblocked`);
      setBlocked(false);
    });
  };

  const handleInvite = (e, userData) => {
    if (e.target.matches('.action-area') || e.target.matches('svg')) return;
    inviteUser([currentUserName, userData.userId]);
  };

  return (
    <MenuItem
      blocked={isBlocked}
      custom={ind}
      onClick={e => handleInvite(e, userData)}>
      <UserDisplay data={userData}>
        {isFriend && (
          <FiUserMinus
            style={{ fill: 'red' }}
            onClick={() => {
              setIsFriend(false);
              unFriend(userData, true);
            }}
          />
        )}

        {!isFriend && (
          <FiUserPlus
            onClick={() => {
              setIsFriend(true);
              beFriend(userData);
            }}
          />
        )}

        {!isBlocked && (
          <MdBlock
            style={{ stroke: 'red' }}
            onClick={() => handleBlock(userData)}
          />
        )}

        {isBlocked && <p onClick={() => handleUnBlock(userData)}>k</p>}
      </UserDisplay>
    </MenuItem>
  );
}

function Menu({ category, inviteUser }) {
  const { user: currentUserName } = React.useContext(AuthContext);

  const { sb, dispatch, chatManager } = React.useContext(ChatContext);
  const { user: currentUserObj } = chatManager;

  const [items, setItems] = React.useState(null);
  const [userList, setFilter] = useUserFilter(sb, dispatch);

  const [friendList] = useFriendList(sb, dispatch, currentUserObj);

  React.useEffect(() => {
    if (category !== 'friends') {
      setItems(userList);
    } else {
      setItems(friendList.length > 0 ? friendList : 'Nobody Yet');
    }

    return () => setItems(null);
  }, [category, userList]);

  const searchForUser = input => {
    if (category !== 'friends') {
      setFilter(input);
    } else {
      if (input === '') {
        setItems(friendList.length > 0 ? friendList : 'Nobody yet');
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
    beFriend(targetUser) {
      handlefriendLogic(targetUser, currentUserObj);
    },
    unFriend(friend) {
      handlefriendLogic(friend, currentUserObj, true);
    },
    inviteUser,
  };

  return (
    <>
      <SearchUser searchForUser={searchForUser} />
      <MenuContainer>
        {typeof items === 'string' && <AlertText>{items}</AlertText>}

        <AnimatePresence>
          {success &&
            items.map((data, ind) => {
              const { userId } = data;
              return (
                <AvailableUser
                  key={userId}
                  funcs={funcs}
                  ind={ind}
                  userData={data}
                />
              );
            })}
        </AnimatePresence>

        {empty && <AlertText>User does not exist</AlertText>}
      </MenuContainer>
    </>
  );
}

export default function Sidebar({ inviteUser }) {
  const { chatManager } = React.useContext(ChatContext);

  const categories = ['users', 'friends'];
  const [category, setCategory] = React.useState(categories[0]);

  const toggleCategory = ind => setCategory(categories[ind]);

  return (
    <SidebarContainer>
      <CurrentUser user={chatManager.user} />

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
