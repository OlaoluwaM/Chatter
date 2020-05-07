import React from 'react';
import styled from 'styled-components';
import { TiTimes } from 'react-icons/ti';
import { ChatContext } from '../context/Context';
import { UserDisplay } from './DataDisplay';
import { AnimatePresence } from 'framer-motion';
import { formatTimeString } from '../utils/chatFunctions';
import { CurrentUserDisplay } from './Sidebar';
import { currentUserDisplayVariants } from '../utils/motionObj';

const Overhead = styled(CurrentUserDisplay)`
  height: 14%;
  position: relative;
`;

const svgStyle = {
  width: '35px',
  height: '40px',
  fill: 'red',
  marginLeft: '30px',
  cursor: 'pointer',
};

export default function ChatOverHead() {
  const [isChatting, setIsChatting] = React.useState({ chatting: false });

  const { sb, chatManager, dispatch } = React.useContext(ChatContext);

  const newChat = typeof chatManager.userChannel !== 'string';

  React.useEffect(() => {
    setIsChatting({ chatting: true, invitee: chatManager.invitee });

    return () => setIsChatting(false);
  }, [newChat]);

  const invitee = isChatting?.invitee;

  const subData =
    isChatting.chatting && invitee
      ? invitee.connectionStatus !== 'online'
        ? formatTimeString(invitee.lastSeenAt)
        : invitee.connectionStatus
      : null;

  console.log(isChatting.chatting, subData);
  return (
    <Overhead key={invitee} initial='hidden' animate='visible'>
      <AnimatePresence exitBeforeEnter>
        {isChatting.chatting && subData && (
          <UserDisplay
            motionProps={{
              variants: currentUserDisplayVariants,
              exit: 'hidden',
              layoutTransition: true,
            }}
            data={invitee}
            subData={subData}>
            <TiTimes
              style={svgStyle}
              onClick={() => {
                chatManager.userChannel.leave();
                dispatch({ type: 'Exit Chat' });
              }}
            />
          </UserDisplay>
        )}
      </AnimatePresence>
    </Overhead>
  );
}
