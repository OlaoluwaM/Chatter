import React from 'react';
import { TiTimes } from 'react-icons/ti';
import { ChatContext } from '../context/Context';
import { UserDisplay } from './DataDisplay';
import { AnimatePresence } from 'framer-motion';
import { formatTimeString } from '../utils/helper';
import { CurrentUserDisplay } from './Sidebar';
import { currentUserDisplayVariants } from '../utils/motionObj';

const svgStyle = {
  width: '35px',
  height: '40px',
  fill: 'red',
  marginLeft: '30px',
  cursor: 'pointer',
};

export default function ChatOverHead() {
  const [chat, setChat] = React.useState({ isChatting: false });

  const { sb, chatManager, dispatch } = React.useContext(ChatContext);

  const newChat = typeof chatManager.userChannel !== 'string';

  React.useEffect(() => {
    if (newChat) {
      const { currentUser: user } = sb;
      setChat({
        isChatting: true,
        invitee: chatManager.userChannel.members.find(
          ({ userId }) => userId !== user.userId
        ),
      });
    } else {
      setChat({ isChatting: false });
    }
  }, [newChat]);

  const subData = chat.isChatting
    ? chat.invitee.connectionStatus === 'offline'
      ? formatTimeString(chat.invitee.lastSeenAt)
      : chat.invitee.connectionStatus
    : null;

  return (
    <AnimatePresence exitBeforeEnter>
      {subData && (
        <CurrentUserDisplay
          key={chat.invitee}
          initial='hidden'
          animate='visible'>
          {chat.isChatting && (
            <UserDisplay
              motionProps={{
                variants: currentUserDisplayVariants,
                exit: 'hidden',
              }}
              data={chat.invitee}
              subData={subData}>
              <TiTimes
                style={svgStyle}
                onClick={() => dispatch({ type: 'Exit Chat' })}
              />
            </UserDisplay>
          )}
        </CurrentUserDisplay>
      )}
    </AnimatePresence>
  );
}
