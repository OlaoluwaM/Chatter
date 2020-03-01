import React from 'react';
import { default as styled, ThemeContext } from 'styled-components';
import { motion, useCycle, AnimatePresence } from 'framer-motion';
import { AuthContext, ChatContext } from '../context/Context';
import { hexToRgb, percentageOf } from '../utils/helper';
import { NavArrowSVG } from './SVGIcons';

const allocatedSpace = percentageOf(
  0.25 * window.innerWidth,
  window.innerWidth
);

const SidebarContainer = styled(motion.nav)`
  width: 100%;
  flex-basis: ${`${allocatedSpace}%`};
  height: 100%;
  background: ${({ theme }) => hexToRgb(theme.main, 0.5)};
  color: ${({ theme }) => theme.sub};
  display: grid;
`;

const IconContainer = styled(motion.div)`
  position: absolute;
  width: 5%;
  height: 6%;
  z-index: 2;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

const Menu = styled(motion.div)`
  display: grid;
  grid-template-rows: auto;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.black};

  & div {
    width: 100%;
    cursor: pointer;
    background: ${({ theme }) => theme.sub};
  }
`;

export default function Sidebar({ inviteUser }) {
  const themeObj = React.useContext(ThemeContext);
  const { user: currentUser, authed } = React.useContext(AuthContext);

  const [isOpen, setOpen] = React.useState(true);
  const [onlineUsers, setOnlineUsers] = React.useState([]);
  const { sb, dispatch } = React.useContext(ChatContext);

  const [flex, cycleFlex] = useCycle(allocatedSpace, 0);

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

    sb.setChannelInvitationPreference(true, (response, error) => {
      if (error) setChatErrorText({ errorOccurred: true, text: error.message });
      console.log(response);
    });
  }, []);

  return (
    <SidebarContainer animate={{ flexBasis: flex, width: `100%` }}>
      <IconContainer
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 1, x: 15, transition: { delay: 1 } }}
        onTap={() => authed && cycleFlex()}
        onTapStart={() => setOpen(o => !o)}>
        <NavArrowSVG color={themeObj.sub} />
      </IconContainer>
      <Menu>
        {/* <AnimatePresence> */}
        {onlineUsers.length > 0 &&
          onlineUsers.map(({ userId }, ind) => (
            <motion.div
              key={userId}
              onTap={() => inviteUser([currentUser, userId])}>
              <p>{userId}</p>
            </motion.div>
          ))}
        {/* </AnimatePresence> */}
      </Menu>
    </SidebarContainer>
  );
}
