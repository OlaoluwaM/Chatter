import React from 'react';
import PropTypes from 'prop-types';
import { default as styled, css } from 'styled-components';
import { AuthContext } from '../context/Context';
import { motion, AnimatePresence } from 'framer-motion';
import { spring2 } from '../utils/motionObj';

const MessageAreaWrapper = styled.ul.attrs({
  className: 'message-area',
})`
  width: 100%;
  flex-grow: 1;
  margin: 0;
  position: relative;
  padding: 20px 17px;
  overflow-y: auto;
  background-image: linear-gradient(135deg, #ce9ffc 10%, #7367f0 100%);
  overflow-x: hidden;
  * {
    overflow-anchor: none;
  }
`;

const TextWrapper = styled(motion.div)`
  width: 100%;
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
    font-weight: 100;
    color: var(--main);
    width: 100%;
    text-align: center;
  }
`;

const Avatar = styled.span`
  height: 35px;
  width: 35px;
  border-radius: 50%;
  display: inline-block;
  margin: 0 10px -10px;
  border: 1.5px double var(--main);
  background: ${({ bg }) => bg};
`;

const MessageContent = styled.div`
  display: inline-block;
  font-weight: 300;
`;

const Username = styled.div`
  display: block;
  color: var(--main);
  font-size: 15px;
  padding-bottom: 5px;
  font-weight: 100;
`;

const MessageText = styled.div`
  padding: 10px;
  max-width: 400px;
  margin: 0;
  border-radius: 12px;
  background-color: var(--main);
  color: var(--sub);
  display: inline-block;
`;

const MessageWrapper = styled(motion.li)`
  font-family: var(--font2);
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
        background: rgb(115, 57, 172);
        color: white;
      }
    `}
  &:last-of-type {
    overflow-anchor: auto;
  }
`;

function Message({ message, currentMember, exit }) {
  const { user } = React.useContext(AuthContext);
  const { member, text } = message;
  const isMyMessage =
    member.id === currentMember.id ||
    member.id === user ||
    member.clientData.id === user;

  const messageVariant = {
    visible: {
      opacity: 1,
      x: 0,
      transition: { ...spring2 },
    },
    hidden: isMyMessage => ({
      opacity: 0,
      x: isMyMessage ? 50 : -50,
      transition: { ...spring2 },
    }),
  };

  return (
    <MessageWrapper
      variants={messageVariant}
      initial='hidden'
      animate='visible'
      mymessage={isMyMessage ? 1 : 0}
      custom={isMyMessage}
      exit={exit}>
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

  console.log(messages, currentMember);
  return (
    <MessageAreaWrapper>
      <AnimatePresence>
        {loading && (
          <TextWrapper
            key='loading-text'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <h1>Setting up chat environment</h1>
          </TextWrapper>
        )}
        {error && (
          <TextWrapper
            key='error-text'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <h1>{chatState.error.text}</h1>
          </TextWrapper>
        )}
        {success && (
          <>
            {messagesToRender.map((message, ind) => (
              <Message
                currentMember={currentMember}
                message={message}
                key={ind}
                exit={{ opacity: 0 }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
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
