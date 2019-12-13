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
  const [state, setState] = React.useState({
    messages: [],
    member: {
      id: randomName(),
      color: randomColor(),
    },
  });

  const drone = React.useRef();
  const { user } = React.useContext(AuthContext);

  React.useEffect(() => {
    const chatUser = { id: user, color: randomColor() };
    drone.current = new window.Scaledrone('QdpHluDuUEgfYxqm', {
      data: chatUser,
    });

    drone.current.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = { ...chatUser };

      member.id = drone.current.clientId;
      setState(s => {
        const { messages } = s;
        return { messages, member };
      });
    });

    const room = drone.current.subscribe('observable-room');
    room.on('data', (data, member) => {
      setState(s => {
        const { messages, member: Cuser } = s;
        messages.push({ text: data, member });
        return { messages, member: Cuser };
      });
    });
    return () => (drone.current = '');
  }, []);

  console.log(state);
  const onSendMessage = message => {
    drone.current.publish({
      room: 'observable-room',
      message,
    });
  };

  return (
    <ChatAreaWrapper>
      <OverHead />
      <MessageArea messages={state.messages} currentMember={state.member} />
      <Input onSendMessage={onSendMessage} />
    </ChatAreaWrapper>
  );
}
