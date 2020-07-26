import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { makeHTMLId } from './utils/helpers';
import { NotificationContext } from './context/context';
import { CloseOutline as Close } from '@styled-icons/evaicons-outline/CloseOutline';
import { notificationCompVariants } from './utils/framerVariants';
import {
  motion,
  AnimateSharedLayout,
  AnimatePresence,
  usePresence,
} from 'framer-motion';

const {
  notificationStoreVariant,
  notificationItemVariant,
} = notificationCompVariants;

const possiblePositions = [
  'top-right',
  'top-left',
  'bottom-left',
  'bottom-right',
];

const NotificationStore = styled(motion.div)`
  position: fixed;
  width: 25%;
  font-family: var(--primaryFont);
  font-weight: var(--thin);
  font-size: 0.9em;
  transition: height 0.9s ease;
`;

const NotificationItem = styled(motion.div)`
  position: relative;
  pointer-events: auto;
  overflow: hidden;
  background: ${({ theme }) => theme.whiteOrBlack};
  margin: 0 0 1em;
  width: 97%;
  height: auto;
  border-radius: 3px;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
  color: ${({ theme }) => theme.background};
  display: flex;
  animation-delay: ${({ time }) => `${time * 0.2}s`};

  &:last-of-type {
    margin-bottom: 0;
  }

  & > span.ribbon {
    flex-basis: 8px;
    flex-shrink: 0;
    background: ${({ theme, type }) => theme['notificationColors'][type]};
  }

  & > div.content-area {
    padding: 1em;
    flex-grow: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    text-align: left;
    overflow-wrap: anywhere;

    p {
      margin: 0;
      text-transform: capitalize;
    }
  }

  & > button.close-button {
    flex-basis: 15%;
    flex-shrink: 0;
    position: relative;
    background: transparent;
    border: none;
    padding: 0;

    & > svg {
      position: absolute;
      top: 5px;
      right: 5px;
      cursor: pointer;
      width: 20px;
      height: 20px;
    }
  }
`;

const CloseButton = styled(Close)`
  color: ${({ theme }) => theme['notificationColors'].error};
  stroke-width: 15px;
`;

function Notification({ toast, closeFunction, ind }) {
  const { id, toast: toastObj } = toast;
  const { message, type } = toastObj;

  return (
    <NotificationItem
      id={`notification_${id}`}
      className='animate__animated animate__backInRight'
      time={ind}
      layout
      transition={{
        layoutY: { type: 'tween', duration: 0.3, delay: 0.8 },
      }}
      type={type}>
      <span className='ribbon'></span>
      <div className='content-area'>
        <p>{message}</p>
      </div>
      <button className='close-button'>
        <CloseButton onClick={() => closeFunction(id)} />
      </button>
    </NotificationItem>
  );
}

export default function Notifications(props) {
  const {
    notificationList,
    position = possiblePositions[0],
    autoDismiss = true,
  } = props;

  const autoDismissRef = React.useRef();
  const { deleteNotification: deleteNotificationHandler } = React.useContext(
    NotificationContext
  );

  React.useEffect(() => {
    if (autoDismiss && notificationList.length) {
      (async () => {
        const { id, toast } = notificationList[0];
        const { dismissTime = 30000 } = toast;

        const response = await new Promise((res, rej) => {
          autoDismissRef.current = setTimeout(() => {
            try {
              deleteNotificationHandler(id);
              res(`Closed notification with id: ${id}`);
            } catch (error) {
              rej(`An error occurred closing notification: ${id}`);
            }
          }, dismissTime);
        });
        console.log(response);
      })();
    } else console.log('No more notifications');

    return () => clearInterval(autoDismissRef.current);
  }, [notificationList.length, autoDismiss]);

  return (
    <AnimateSharedLayout>
      <NotificationStore
        className={position}
        variants={notificationStoreVariant}
        initial='hidden'
        layout
        transition={{
          layoutY: {
            type: 'tween',
            duration: 0.17,
          },
        }}
        animate={!!notificationList.length ? 'visible' : 'hidden'}>
        {!!notificationList.length &&
          notificationList.map((notification, i) => (
            <Notification
              key={notification.id}
              toast={notification}
              ind={i}
              closeFunction={deleteNotificationHandler}
            />
          ))}
      </NotificationStore>
    </AnimateSharedLayout>
  );
}

Notifications.propTypes = {
  notificationList: PropTypes.array.isRequired,
  position: PropTypes.oneOf(possiblePositions),
  autoDismiss: PropTypes.bool,
};

Notification.propTypes = {
  toast: PropTypes.exact({
    id: PropTypes.string.isRequired,
    toast: PropTypes.exact({
      message: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['success', 'error', 'warning', 'info']).isRequired,
      dismissTime: PropTypes.number,
    }).isRequired,
  }).isRequired,
  closeFunction: PropTypes.func.isRequired,
  ind: PropTypes.number.isRequired,
};
