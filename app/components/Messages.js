import React from 'react';
import PropTypes from 'prop-types';
import { default as styled, css } from 'styled-components';
import { animated, useSpring, config } from 'react-spring';
import { AuthContext } from '../context/Context';

const MessageAreaWrapper = styled.ul.attrs({
  className: 'message-area',
})`
  width: 100%;
  flex-grow: 1;
  margin: 0;
  position: relative;
  padding: 20px 17px;
  overflow-y: auto;
  background: #f5f5f5;
  overflow-x: hidden;
  * {
    overflow-anchor: none;
  }
`;

const TextWrapper = styled(animated.div)`
  width: 70%;
  height: 70%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  h1 {
    font-family: var(--font2);
    font-size: 3.5rem;
    font-weight: 500;
    color: var(--sub);
    margin-top: -5px;
    width: 80%;
  }
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
  background-color: rgb(191, 159, 223);
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
        background: rgb(140, 83, 198);
      }
    `}
  &:last-of-type {
    overflow-anchor: auto;
  }
`;

function Message({ message, currentMember }) {
  const { member, text } = message;
  const isMyMessage = member.id === currentMember.id;
  const slideInDirection = isMyMessage ? 50 : -50;
  const { user } = React.useContext(AuthContext);

  const slideInAnim = useSpring({
    from: { opacity: 0, transform: `translateX(${slideInDirection}px)` },
    to: { opacity: 1, transform: `translateX(0px)` },
    config: config.wobbly,
  });

  return (
    <MessageWrapper style={slideInAnim} mymessage={isMyMessage ? 1 : 0}>
      <Avatar bg={member.clientData ? member.clientData.color : '#000000'} />
      <MessageContent>
        <Username>{member.clientData ? member.clientData.id : user}</Username>
        <MessageText>{text}</MessageText>
      </MessageContent>
    </MessageWrapper>
  );
}

export default function MessageArea({ conditions, messages, currentMember }) {
  const [messagesToRender, setMessages] = React.useState(messages);

  const { success, loading, error } = conditions;

  const fadeInAnim = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  return (
    <MessageAreaWrapper>
      {loading && (
        <TextWrapper style={fadeInAnim}>
          <h1>Setting up chat Environment</h1>
        </TextWrapper>
      )}
      {error && (
        <TextWrapper style={fadeInAnim}>
          <h1>{chatState.error.text}</h1>
        </TextWrapper>
      )}
      {success && (
        <React.Fragment>
          {messagesToRender.map((message, ind) => (
            <Message
              currentMember={currentMember}
              message={message}
              key={ind}
            />
          ))}
        </React.Fragment>
      )}
    </MessageAreaWrapper>
  );
}

MessageArea.propTypes = {
  conditions: PropTypes.object.isRequired,
  messages: PropTypes.array.isRequired,
  currentMember: PropTypes.object.isRequired,
};

Message.propTypes = {
  message: PropTypes.object.isRequired,
  currentMember: PropTypes.object.isRequired,
};
