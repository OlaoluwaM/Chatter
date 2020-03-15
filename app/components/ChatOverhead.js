import React from 'react';
import { ChatContext } from '../context/Context';
import { UserDisplay } from './DataDisplay';
import { AnimatePresence } from 'framer-motion';
import { CurrentUserDisplay } from './Sidebar';

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

  return (
    <CurrentUserDisplay
      initial='hidden'
      animate={chat.isChatting ? 'visible' : 'hidden'}>
      {chat.isChatting && <UserDisplay isOverhead={true} data={chat.invitee} />}
    </CurrentUserDisplay>
  );
}
