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
  margin-top: 15px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export default function ChatArea() {
  const { user } = React.useContext(AuthContext);
  const chatUser = React.useRef({ id: user, color: randomColor() });

  const [state, setState] = React.useState({
    messages: [],
    member: {},
  });

  const [drone, setDrone] = React.useState(() => {
    return new window.Scaledrone('QdpHluDuUEgfYxqm', {
      data: chatUser.current,
    });
  });

  const [chatErrorState, setChatErrorState] = React.useState({
    errorOccurred: false,
    text: '',
  });

  React.useEffect(() => {
    drone.on('open', error => {
      if (error) {
        console.error(error);
        setChatErrorState({
          errorOccurred: true,
          text: 'Something went wrong, reload the page to try again',
        });
      }

      const member = { ...chatUser.current };
      member.id = drone.clientId;

      setState(s => {
        const prevMessages = s.messages;
        return { messages: prevMessages, member };
      });
    });

    const room = drone.subscribe('observable-room');

    room.on('data', (data, member) => {
      setState(s => {
        const { messages, member: Cuser } = s;
        messages.push({ text: data, member });
        return { messages, member: Cuser };
      });

      document
        .querySelector('.message-area')
        .scrollTo(0, document.querySelector('.message-area').scrollHeight);
    });

    return () => {
      setDrone(null);
      setChatErrorState({ errorOccurred: false, text: '' });
    };
  }, []);

  const onSendMessage = message => {
    drone.publish({
      room: 'observable-room',
      message,
    });
  };

  const conditions = {
    success:
      Object.keys(state.member).length > 0 && !chatErrorState.errorOccurred,
    loading:
      Object.keys(state.member).length <= 0 && !chatErrorState.errorOccurred,
    error:
      Object.keys(state.member).length <= 0 && chatErrorState.errorOccurred,
  };

  return (
    <ChatAreaWrapper>
      <OverHead />
      <MessageArea
        conditions={conditions}
        messages={state.messages}
        currentMember={state.member}
      />
      <Input conditions={conditions} onSendMessage={onSendMessage} />
    </ChatAreaWrapper>
  );
}
