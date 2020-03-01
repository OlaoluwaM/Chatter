import React from 'react';
import PropTypes from 'prop-types';
import { spring2 } from '../utils/motionObj';
import { AuthContext } from '../context/Context';
import { default as styled, css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

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
    color: ${({ theme }) => theme.main};
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
  border: 1.5px double ${({ theme }) => theme.main};
  background: ${({ bg }) => bg};
`;

const MessageContent = styled.div`
  display: inline-block;
  font-weight: 300;
`;

const Username = styled.div`
  display: block;
  color: ${({ theme }) => theme.main};
  font-size: 15px;
  padding-bottom: 5px;
  font-weight: 100;
`;

const MessageText = styled.div`
  padding: 10px;
  max-width: 400px;
  overflow-wrap: break-word;
  margin: 0;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.main};
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
  const { user, color } = React.useContext(AuthContext);
  const { metaData, userId } = currentMember;
  const { avatar_color } = metaData;

  const isMyMessage = userId === user;

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
      <Avatar bg={avatar_color ? avatar_color : color} />
      <MessageContent>
        <Username>{userId ? userId : user}</Username>
        <MessageText>{message}</MessageText>
      </MessageContent>
    </MessageWrapper>
  );
}

export default function MessageArea(props) {
  const { messages } = props;

  return (
    <MessageAreaWrapper>
      <AnimatePresence>
        {messages.map(({ messageId, sender, text }) => (
          <Message
            currentMember={sender}
            message={text}
            key={messageId}
            exit={{ opacity: 0 }}
          />
        ))}
      </AnimatePresence>
    </MessageAreaWrapper>
  );
}

MessageArea.propTypes = {
  messages: PropTypes.array.isRequired,
};

Message.propTypes = {
  message: PropTypes.string.isRequired,
  currentMember: PropTypes.object.isRequired,
};
