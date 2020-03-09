import React from 'react';
import { ChatContext } from '../context/Context';
import { UserDisplay } from './DataDisplay';
import { AnimatePresence } from 'framer-motion';
import { CurrentUserDisplay } from './Sidebar';

export default function ChatOverHead() {
  const [chat, setChat] = React.useState({ isChatting: false });

  const { chatManager } = React.useContext(ChatContext);
  const newChat = typeof chatManager.userChannel !== 'string';

  React.useEffect(() => {
    if (newChat) {
      const { userChannel, user } = chatManager;
      setChat({
        isChatting: true,
        invitee: userChannel.members.find(
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
      {chat.isChatting && <UserDisplay type='user' data={chat.invitee} />}
    </CurrentUserDisplay>
  );
}
