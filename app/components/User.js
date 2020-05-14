import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { MdBlock } from 'react-icons/md';
import { default as styled, ThemeContext } from 'styled-components';
import { AuthContext, ChatContext } from '../context/Context';
import { handleBlock, handleUnBlock } from '../utils/chatFunctions';
import { hexToRgb } from '../utils/helper';
import { menuItemVariant } from '../utils/motionObj';
import { UserDisplay } from './DataDisplay';

export const MenuItem = styled(motion.div).attrs({
  variants: menuItemVariant,
  positionTransition: true,
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
})`
  width: 94%;
  padding: 10px;
  background: transparent;
  border-radius: 5px;
  justify-self: center;
  align-self: center;
  cursor: pointer;
  height: 25%;
  transition: box-shadow 0.2s ease-out, background 0.1s ease;
  color: ${({ theme }) => theme.primaryColor};

  &.user {
    position: absolute;
    top: ${({ position }) => `calc((138px * ${position}) + 33px)`};

    &.active {
      border-radius: 10px;
      box-shadow: 20px 20px 60px #0e0033, -20px -20px 60px #170055;
    }

    &:not(.active):hover {
      background: ${({ theme }) => hexToRgb(theme.secondaryColorDark, 0.3)};
    }

    svg {
      transition: background 0.4s ease;
    }
  }
`;

const InitialSvgStyle = stroke => ({
  stroke: `${hexToRgb(stroke, 0.3)}`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 0,
  rotate: 0,
});

export default function User(props) {
  const { activeUserName: currentUserName } = React.useContext(AuthContext);
  const { sb, dispatch, chatManager } = React.useContext(ChatContext);
  const { primaryColor } = React.useContext(ThemeContext);
  const elementRef = React.useRef();

  const { userData, ind, funcs, friends, blocked } = props;
  const { blockedUsersList, setBlockMessage } = blocked;
  const { beFriend, unFriend, inviteUser } = funcs;

  const [isBlocked, setBlocked] = React.useState(() =>
    blockedUsersList.map(obj => obj.nickname).includes(userData.nickname)
  );

  const [isFriend, setIsFriend] = React.useState(() =>
    friends.includes(userData.nickname)
  );
  const isInChat = typeof chatManager?.userChannel === 'object';
  const active =
    isInChat && chatManager.invitee.nickname === userData.nickname
      ? 'active'
      : '';

  const blockUser = targetUser => {
    try {
      const message = isBlocked
        ? handleUnBlock(targetUser, sb)
        : handleBlock(targetUser, sb);

      setBlockMessage(message);
      setBlocked(isBlocked ? false : true);
    } catch (error) {
      console.error(error);
      dispatch({ type: 'Error', error });
    }
  };

  const handleInvite = (e, userData, blocked) => {
    if (blocked) return;
    inviteUser([currentUserName, userData.nickname]);
  };

  const handleFriendLogic = () => {
    if (isFriend) {
      setIsFriend(false);
      unFriend(userData, true);
    } else {
      setIsFriend(true);
      beFriend(userData);
    }
  };

  const handleClick = e => {
    const actionArea = e.currentTarget.querySelector('.action-area');
    if (actionArea.contains(e.target) || e.target === actionArea) return;

    const prevActive = document.querySelector('.user.active');
    if (prevActive === e.currentTarget) return;
    if (prevActive) prevActive.classList.remove('active');

    e.currentTarget.classList.add('active');
    handleInvite(e, userData, isBlocked);
  };

  const animateForFriendIcon = isFriend
    ? {
        ...InitialSvgStyle(primaryColor),
        rotate: 45,
        stroke: 'rgba(245, 10, 10, .7)',
      }
    : InitialSvgStyle(primaryColor);

  return (
    <MenuItem
      ref={elementRef}
      custom={ind}
      position={ind}
      status={userData.connectionStatus}
      className={`user ${active}`}
      onClick={handleClick}>
      <UserDisplay
        data={userData}
        subData={isBlocked ? 'Blocked' : userData.connectionStatus}>
        <AnimatePresence>
          {!isBlocked && (
            <motion.div
              key='friend'
              positionTransition={true}
              style={InitialSvgStyle(primaryColor)}
              animate={animateForFriendIcon}
              exit={{ opacity: 0 }}
              onTap={handleFriendLogic}>
              <FiPlus style={{ stroke: 'inherit' }} />
            </motion.div>
          )}

          {!isFriend && (
            <motion.div
              key='block'
              positionTransition={true}
              style={InitialSvgStyle(primaryColor)}
              animate={{ ...animateForFriendIcon, rotate: 0 }}
              exit={{ opacity: 0 }}
              onTap={() => blockUser(userData)}>
              <MdBlock style={{ fill: isBlocked ? 'red' : 'inherit' }} />
            </motion.div>
          )}
        </AnimatePresence>
      </UserDisplay>
    </MenuItem>
  );
}
