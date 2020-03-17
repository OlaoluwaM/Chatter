import React from 'react';
import { ChatContext } from '../context/Context';
import { UserDisplay } from './DataDisplay';
import { AnimatePresence } from 'framer-motion';
import { CurrentUserDisplay } from './Sidebar';
import { formatTimeString } from '../utils/helper';
import { currentUserDisplayVariants } from '../utils/motionObj';

export default function ChatOverHead() {
  const [chat, setChat] = React.useState({ isChatting: false });

  const { sb, chatManager } = React.useContext(ChatContext);

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
      <CurrentUserDisplay key={chat.invitee} initial='hidden' animate='visible'>
        {chat.isChatting && (
          <UserDisplay
            motionProps={{
              variants: currentUserDisplayVariants,
              exit: 'hidden',
            }}
            data={chat.invitee}
            subData={subData}
          />
        )}
      </CurrentUserDisplay>
    </AnimatePresence>
  );
}
