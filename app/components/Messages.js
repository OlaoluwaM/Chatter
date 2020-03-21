import React from 'react';
import PropTypes from 'prop-types';
import { spring2 } from '../utils/motionObj';
import { AuthContext } from '../context/Context';
import { hexToRgb, isColor } from '../utils/helper';
import { motion, AnimatePresence } from 'framer-motion';
import { default as styled, css } from 'styled-components';

const MessageAreaWrapper = styled.ul.attrs({
  className: 'message-area',
})`
  width: 100%;
  margin: 0;
  position: relative;
  padding: 20px 17px;
  overflow-y: auto;
  background: inherit;
  overflow-x: hidden;
  flex-grow: 1;
  padding-bottom: 12px;

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
  ${({ bg }) =>
    isColor(bg)
      ? css`
          background: ${({ bg }) => bg};
        `
      : css`
          background: url(${bg}) center no-repeat;
          background-size: contain;
        `}
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
  ${({ myMessage, theme }) =>
    myMessage === 1
      ? css`
          flex-direction: row-reverse;
          text-align: right;

          & > ${MessageContent} {
            align-items: center;
          }

          & ${MessageText} {
            background: ${theme.sub};
            color: ${theme.main};
          }
        `
      : css`
          & ${MessageText} {
            background: ${hexToRgb(theme.black, 0.5)};
            color: ${theme.main};
          }
        `}
  &:last-of-type {
    overflow-anchor: auto;
  }
`;

function Message({ message, sender, exit }) {
  const { activeUserName: username } = React.useContext(AuthContext);

  const { profileUrl, userId } = sender;

  const isMyMessage = userId === username;

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
      myMessage={isMyMessage ? 1 : 0}
      custom={isMyMessage}
      exit={exit}>
      <Avatar bg={profileUrl} />
      <MessageContent>
        <Username>{userId ?? username}</Username>
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
            sender={sender}
            message={text}
            key={messageId}
            exit={{ y: -20, opacity: 0 }}
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
  sender: PropTypes.object.isRequired,
};
