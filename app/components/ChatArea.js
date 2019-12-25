import React from 'react';
import Input from './Input';
import styled from 'styled-components';
import MessageArea from './Messages';
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
  const { user, authed, color } = React.useContext(AuthContext);
  const chatUser = React.useRef({ id: user, color });

  const [state, setState] = React.useState({
    messages: JSON.parse(localStorage.getItem(`${user}M`)) || [],
    member: chatUser,
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
        setChatErrorState({
          errorOccurred: true,
          text: 'Something went wrong, try reloading',
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
    console.log(room);

    room.on('data', (data, member) => {
      const userMessages = JSON.parse(localStorage.getItem(`${user}M`)) || [];
      console.log(member, data);
      try {
        if (member.id === user || user === member.clientData.id) {
          userMessages.push({ text: data, member: { ...member.clientData } });
          localStorage.setItem(`${user}M`, JSON.stringify(userMessages));
        }
      } catch (error) {
        console.error(error);
        setChatErrorState({
          errorOccurred: true,
          text: 'Something went wrong, try reloading',
        });
      }

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
    //   if (!authed && user === '') {
    // };
  }, []);

  console.log(state.member);
  const onSendMessage = message => {
    drone.publish({
      room: 'observable-room',
      message,
    });
  };

  const conditions = {
    success: drone && !chatErrorState.errorOccurred,
    loading: !drone && !chatErrorState.errorOccurred,
    error: chatErrorState.errorOccurred,
  };

  return (
    <ChatAreaWrapper>
      <MessageArea
        conditions={conditions}
        messages={state.messages}
        currentMember={state.member}
        chatErrorState={chatErrorState}
      />
      <Input conditions={conditions} onSendMessage={onSendMessage} />
    </ChatAreaWrapper>
  );
}
