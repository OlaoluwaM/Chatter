import React from 'react';
import PropTypes from 'prop-types';
import { default as styled, css } from 'styled-components';

const MessageAreaWrapper = styled.ul`
  width: 100%;
  flex-grow: 1;
  margin: 0;
  padding: 20px 0px;
  overflow-y: auto;
  background: #f5f5f5;
`;

const Avatar = styled.span`
  height: 35px;
  width: 35px;
  border-radius: 50%;
  display: inline-block;
  margin: 0 10px -10px;
  background: ${({ bg }) => bg};
`;

const MessageContent = styled.div`
  display: inline-block;
`;
const Username = styled.div`
  display: block;
  color: grey;
  font-size: 14px;
  padding-bottom: 4px;
`;
const MessageText = styled.div`
  padding: 10px;
  max-width: 400px;
  margin: 0;
  border-radius: 12px;
  background-color: cornflowerblue;
  color: white;
  display: inline-block;
`;

const MessageWrapper = styled.li`
  display: flex;
  margin-top: 30px;
  ${({ myMessage }) =>
    myMessage &&
    css`
      flex-direction: row-reverse;
      text-align: right;
      & > ${MessageContent} {
        align-items: center;
      }
      & ${MessageText} {
        background: orangered;
      }
    `}
`;

function Message({ message, currentMember }) {
  const { member, text } = message;
  // const isMyMessage = member.id === currentMember.id;
  const isMyMessage = member.id === currentMember.id;
  // clientData;
  // clientData;
  return (
    <MessageWrapper myMessage={isMyMessage}>
      <Avatar bg={member.color} />
      <MessageContent>
        <Username>{member.id}</Username>
        <MessageText>{text}</MessageText>
      </MessageContent>
    </MessageWrapper>
  );
}

export default function MessageArea({ messages, currentMember }) {
  const [messagesToRender, setMessages] = React.useState(messages);
  React.useEffect(() => setMessages(messages), [messages]);

  return (
    <MessageAreaWrapper>
      {messagesToRender.map((message, ind) => (
        <Message currentMember={currentMember} message={message} key={ind} />
      ))}
    </MessageAreaWrapper>
  );
}

MessageArea.propTypes = {
  messages: PropTypes.array.isRequired,
  currentMember: PropTypes.object.isRequired,
};

Message.propTypes = {
  message: PropTypes.object.isRequired,
  currentMember: PropTypes.object.isRequired,
};
