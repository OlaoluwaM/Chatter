import React from 'react';
import styled from 'styled-components';
import { hexToRgb } from '../utils/helper';
import { MdSettings } from 'react-icons/md';
import { UserDisplay, GroupDisplay } from './DataDisplay';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext, ChatContext } from '../context/Context';
import {
  menuVariants,
  menuItemVariant,
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
  height: auto;
  width: 100%;
  position: absolute;
  overflow-y: auto;
  z-index: 3;
  display: grid;
  grid-template-rows: ${({ children }) => `repeat(${children.length}, auto)`};
  padding: 10px;
  margin: 0;
  padding-top: 0px;
  color: ${({ theme }) => theme.black};

  &::-webkit-scrollbar-thumb {
    background: transparent;
  }
`;

const MenuItem = styled(motion.div).attrs({
  variants: menuItemVariant,
  exit: 'hidden',
})`
  width: 100%;
  padding: 3%;
  height: 91%;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  background: ${({ theme }) => theme.main};
  color: ${({ theme }) => theme.sub};
  justify-self: center;
  align-self: center;
  cursor: pointer;
`;

export const CurrentUserDisplay = styled(MenuItem).attrs({
  variants: currentUserDisplayVariants,
})`
  width: 96%;
  height: auto;
  padding: 3%;
  background: ${({ theme }) => theme.main};
  color: ${({ theme }) => theme.sub};
  margin: 7px;
  cursor: default;
`;

const SideBarCategory = styled.ul`
  width: 100%;
  margin: 0;
  margin-top: 45px;
  margin-bottom: -5px;
  display: flex;
  justify-content: space-around;
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
  }
`;

export default function Sidebar({ inviteUser }) {
  const { user: currentUser, color } = React.useContext(AuthContext);
  const { chatManager } = React.useContext(ChatContext);

  const categories = ['users', 'groups', 'friends'];

  const [category, setCategory] = React.useState(categories[0]);
  const [items, setItems] = React.useState(null);
  const { sb, dispatch } = React.useContext(ChatContext);

  React.useEffect(() => {
    if (category === categories[2]) return;

    const applicationUserListQuery = sb.createApplicationUserListQuery();
    const groupChannelListQuery = sb.GroupChannel.createMyGroupChannelListQuery();

    const queryArray = [applicationUserListQuery, groupChannelListQuery];

    const categoryObj = categories.reduce((obj, curr, currInd) => {
      if (currInd === 2) return obj;
      obj[curr] = queryArray[currInd];
      return obj;
    }, {});

    categoryObj[category].next(function(value, error) {
      if (error) dispatch({ type: 'Error', error: error.message });

      setItems(value.filter(({ userId }) => userId !== currentUser));
    });

    return () => setItems(null);
  }, [category]);

  const toggleCategory = ind => setCategory(categories[ind]);

  const { success, loading, empty } = {
    success: Array.isArray(items) && items.length > 0,
    loading: !Array.isArray(items) && items === null,
    empty: Array.isArray(items) && items.length === 0,
  };

  return (
    <SidebarContainer>
      <CurrentUserDisplay
        variants={currentUserDisplayVariants}
        initial='hidden'
        animate='visible'>
        <UserDisplay type='overhead' data={chatManager.user}>
          <MdSettings style={{ cursor: 'pointer' }} />
        </UserDisplay>
      </CurrentUserDisplay>

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

      {loading && <p>Loading</p>}

      {success && (
        <AnimatePresence>
          <MenuContainer
            variants={menuVariants}
            initial='hidden'
            animate='visible'
            exit='hidden'>
            {items.map((data, ind) => {
              if (category === 'groups') {
                return (
                  <MenuItem key={ind}>
                    <GroupDisplay data={data} />
                  </MenuItem>
                );
              } else {
                return (
                  <MenuItem
                    key={data.userId}
                    onTap={() => inviteUser([currentUser, data.userId])}>
                    <UserDisplay type='user' data={data} />
                  </MenuItem>
                );
              }
            })}
          </MenuContainer>
        </AnimatePresence>
      )}

      {empty && <p>Nothing yet</p>}
    </SidebarContainer>
  );
}
