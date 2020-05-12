import React from 'react';
import { TiTimes } from 'react-icons/ti';
import styled from 'styled-components';
import { ChatContext } from '../context/Context';
import { formatTimeString } from '../utils/chatFunctions';
import { currentUserDisplayVariants } from '../utils/motionObj';
import { UserDisplay } from './DataDisplay';
import { CurrentUserDisplay } from './Sidebar';

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

export default function ChatOverHead({ invitee }) {
  const { dispatch } = React.useContext(ChatContext);

  const subData = invitee
    ? invitee.connectionStatus !== 'online'
      ? formatTimeString(invitee.lastSeenAt)
      : invitee.connectionStatus
    : null;

  return (
    <Overhead initial='hidden' animate='visible'>
      {subData && (
        <UserDisplay
          key={invitee}
          motionProps={{
            variants: currentUserDisplayVariants,
            layoutTransition: true,
          }}
          data={invitee}
          subData={subData}>
          <TiTimes
            style={svgStyle}
            onClick={() => {
              dispatch({ type: 'Exit Chat' });
            }}
          />
        </UserDisplay>
      )}
    </Overhead>
  );
}
