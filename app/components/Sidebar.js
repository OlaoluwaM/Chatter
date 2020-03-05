import React from 'react';
import { AuthContext, ChatContext } from '../context/Context';
import { default as styled, ThemeContext } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import UserDisplay from './UserDisplay';
import {
  sideBarVariant,
  menuVariants,
  menuItemVariant,
} from '../utils/motionObj';

const SidebarContainer = styled(motion.nav)`
  position: relative;
  height: 100%;
  color: ${({ theme }) => theme.sub};
`;

const MenuContainer = styled(motion.menu)`
  height: max-content;
  width: 100%;
  position: absolute;
  overflow-y: auto;
  z-index: 3;
  display: grid;
  grid-template-rows: ${({ children }) => `repeat(${children.length}, 18%)`};
  padding: 10px;
  margin: 0;
  color: ${({ theme }) => theme.black};

  &::-webkit-scrollbar-thumb {
    background: transparent;
  }
`;

const MenuItem = styled(motion.div).attrs({
  variants: menuItemVariant,
})`
  width: 100%;
  padding: 3%;
  height: 94%;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  background: ${({ theme }) => theme.main};
  color: ${({ theme }) => theme.sub};
  place-self: center;
  cursor: pointer;
`;

const CurrentUserDisplay = styled(MenuItem)`
  width: 96%;
  height: auto;
  padding: 3%;
  background: ${({ theme }) => theme.main};
  color: ${({ theme }) => theme.sub};
  margin: 7px;
  cursor: default;
`;

export default function Sidebar({ inviteUser }) {
  const themeObj = React.useContext(ThemeContext);
  const { user: currentUser, color } = React.useContext(AuthContext);

  const [onlineUsers, setOnlineUsers] = React.useState([]);
  const { sb, dispatch } = React.useContext(ChatContext);

  React.useEffect(() => {
    const ApplicationUserListQuery = sb.createApplicationUserListQuery();

    ApplicationUserListQuery.next(function(users, error) {
      if (error) dispatch({ type: 'Error', error: error.message });

      setOnlineUsers(
        users.filter(
          ({ userId, connectionStatus }) =>
            connectionStatus === 'online' && userId !== currentUser
        )
      );
    });
  }, []);

  return (
    <SidebarContainer
      variants={sideBarVariant}
      initial='hidden'
      animate='visible'
      style={{ flexBasis: '0%', width: '0%' }}>
      <CurrentUserDisplay
        variants={{
          hidden: { opacity: 0, y: -30 },
          visible: { opacity: 1, y: 0 },
        }}>
        <UserDisplay avatarColor={color} userName={currentUser} />
      </CurrentUserDisplay>
      <MenuContainer variants={menuVariants}>
        {onlineUsers.length > 0 &&
          onlineUsers.map(({ userId }, ind) => (
            <MenuItem
              key={userId}
              onTap={() => inviteUser([currentUser, userId])}>
              <p>{userId}</p>
            </MenuItem>
          ))}
      </MenuContainer>
    </SidebarContainer>
  );
}
