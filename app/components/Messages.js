import React from 'react';
import PropTypes from 'prop-types';
import { default as styled, css } from 'styled-components';
import { animated, useSpring } from 'react-spring';

const MessageAreaWrapper = styled.ul`
  width: 100%;
  flex-grow: 1;
  margin: 0;
  padding: 20px 0px;
  overflow-y: auto;
  background: #f5f5f5;
  overflow-x: hidden;
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

const MessageWrapper = styled(animated.li)`
  display: flex;
  margin-top: 30px;
  ${({ mymessage }) =>
    mymessage === 1 &&
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
  console.log(message, currentMember);

  const { member, text } = message;
  const isMyMessage = member.id === currentMember.id;
  const slideInDirection = isMyMessage ? 50 : -50;

  const slideInAnim = useSpring({
    from: { opacity: 0, transform: `translateX(${slideInDirection}px)` },
    to: { opacity: 1, transform: `translateX(0px)` },
  });

  return (
    <MessageWrapper style={slideInAnim} mymessage={isMyMessage ? 1 : 0}>
      <Avatar bg={member.clientData.color} />
      <MessageContent>
        <Username>{member.clientData.id}</Username>
        <MessageText>{text}</MessageText>
      </MessageContent>
    </MessageWrapper>
  );
}

export default function MessageArea({ messages, currentMember }) {
  const [messagesToRender, setMessages] = React.useState(messages);
  console.log(messages, currentMember);

  React.useEffect(() => {
    setMessages(messages);
  }, [messages]);

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
