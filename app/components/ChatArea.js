import React from 'react';
import styled from 'styled-components';
import { randomColor, randomName } from '../utils/helper';
import MessageArea from './Messages';
import { OverHead } from './UI-components';
import Input from './Input';
import { AuthContext } from '../context/Context';

const ChatAreaWrapper = styled.div`
  background: var(--main);
  height: 100%;
  flex-grow: 1;
  width: 71%;
  margin-top: 15px;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export default function ChatArea() {
  const { user } = React.useContext(AuthContext);
  const chatUser = React.useRef({ id: user, color: randomColor() });

  const [state, setState] = React.useState({
    messages: [],
    member: {
      id: randomName(),
      color: randomColor(),
    },
  });

  const [drone, setDrone] = React.useState(() => {
    return new window.Scaledrone('QdpHluDuUEgfYxqm', {
      data: chatUser.current,
    });
  });

  React.useEffect(() => {
    drone.on('open', error => {
      if (error) {
        return console.error(error);
      }

      const member = { ...chatUser.current };
      member.id = drone.clientId;

      setState(s => {
        const { messages } = s;
        return { messages, member };
      });
    });

    const room = drone.subscribe('observable-room');

    room.on('data', (data, member) => {
      setState(s => {
        const { messages, member: Cuser } = s;
        messages.push({ text: data, member });
        return { messages, member: Cuser };
      });
    });

    return () => setDrone(null);
  }, []);

  const onSendMessage = message => {
    drone.publish({
      room: 'observable-room',
      message,
    });
  };

  return (
    <ChatAreaWrapper>
      <OverHead />
      {drone === null || !drone ? (
        <h1>Loading</h1>
      ) : (
        <MessageArea messages={state.messages} currentMember={state.member} />
      )}

      <Input isDisabled={drone === null} onSendMessage={onSendMessage} />
    </ChatAreaWrapper>
  );
}
