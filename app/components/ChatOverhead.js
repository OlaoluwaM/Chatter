import React from 'react';
import UserDisplay from './DataDisplay';
import { ChatContext } from '../context/Context';
import { AnimatePresence } from 'framer-motion';
import { CurrentUserDisplay } from './Sidebar';

export default function ChatOverHead() {
  const { chatManager } = React.useContext(ChatContext);
  // TODO finish component
  return (
    <AnimatePresence>
      <CurrentUserDisplay
        animate={isChatting ? 'visible' : 'hidden'}
        exit='hidden'>
        {isChatting && (
          <UserDisplay
            status={invitee.connectionStatus}
            color={invitee.metaData.avatarColor}
            userName={invitee.userId}
            subData={invitee.connectionStatus}
          />
        )}
      </CurrentUserDisplay>
    </AnimatePresence>
  );
}
