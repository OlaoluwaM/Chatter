import React from 'react';
import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import { MdBlock } from 'react-icons/md';
import { UserDisplay } from './DataDisplay';
import { menuItemVariant } from '../utils/motionObj';
import { hexToRgb, lightenDarkenColor } from '../utils/helper';
import { AuthContext, ChatContext } from '../context/Context';
import { handleUnBlock, handleBlock } from '../utils/chatFunctions';
import { default as styled, ThemeContext } from 'styled-components';

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
  y: 0,
});

export default function User(props) {
  const { activeUserName: currentUserName } = React.useContext(AuthContext);
  const { sb, dispatch, chatManager } = React.useContext(ChatContext);
  const { primaryColor } = React.useContext(ThemeContext);

  console.log(chatManager);

  const { userData, ind, funcs, friends, blocked } = props;
  const { blockedUsersList, setBlockMessage } = blocked;
  const { beFriend, unFriend, inviteUser } = funcs;

  const [isBlocked, setBlocked] = React.useState(() =>
    blockedUsersList.map(obj => obj.userId).includes(userData.userId)
  );

  const [isFriend, setIsFriend] = React.useState(() =>
    friends.includes(userData.userId)
  );

  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => {
    console.log('change');
    setIsActive(chatManager?.invitee?.userId === userData.userId);

    return () => setIsActive(false);
  }, [chatManager?.invitee?.userId]);

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
    const actionArea = e.currentTarget.querySelector('.action-area');
    if (!actionArea.contains(e.target)) {
      inviteUser([currentUserName, userData.userId]);
    } else return;
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

  return (
    <MenuItem
      custom={ind}
      position={ind}
      status={userData.connectionStatus}
      className={`user ${isActive ? 'active' : ''}`}
      onClick={e => handleInvite(e, userData, isBlocked)}>
      <UserDisplay
        data={userData}
        subData={isBlocked ? 'Blocked' : userData.connectionStatus}>
        {!isBlocked && (
          <motion.div
            style={InitialSvgStyle(primaryColor)}
            animate={
              isFriend
                ? {
                    ...InitialSvgStyle(primaryColor),
                    y: 2,
                    rotate: 45,
                    stroke: 'rgba(245, 10, 10, .7)',
                  }
                : InitialSvgStyle(primaryColor)
            }
            onTap={handleFriendLogic}>
            <FiPlus style={{ stroke: 'inherit' }} />
          </motion.div>
        )}

        {!isFriend && (
          <MdBlock
            style={{ fill: isBlocked ? 'red' : 'inherit' }}
            onClick={() => blockUser(userData)}
          />
        )}
      </UserDisplay>
    </MenuItem>
  );
}
