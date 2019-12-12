import React from 'react';
import styled from 'styled-components';
import { randomColor, randomName } from '../utils/helper';
import MessageArea from './Messages';
import { OverHead } from './UI-components';
import Input from './Input';

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
    messages: [
      {
        text: 'This is a test message!',
        member: {
          color: 'blue',
          id: 'bluemoon',
        },
      },
    ],
    member: {
      id: randomName(),
      color: randomColor(),
    },
  });

  // React.useEffect(() => {
  //   drone = new window.Scaledrone('QdpHluDuUEgfYxqm', {
  //     data: state.member,
  //   });
  //   drone.on('open', error => {
  //     if (error) {
  //       return console.error(error);
  //     }
  //     const member = { ...state.member };
  //     member.id = drone.clientId;
  //     setState({ member });
  //   });
  // }, []);

  const onSendMessage = message => {
    let newOne = [...state.messages, { text: message, member: state.member }];
    setState(s => ({ messages: newOne, member: s.member }));
  };

  return (
    <ChatAreaWrapper>
      <OverHead />
      <MessageArea messages={state.messages} currentMember={state.member} />
      <Input onSendMessage={onSendMessage} />
    </ChatAreaWrapper>
  );
}
