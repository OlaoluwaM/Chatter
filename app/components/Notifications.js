import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { CloseOutline as Close } from '@styled-icons/evaicons-outline/CloseOutline';
import { NotificationContext } from './context/context';
import { notificationCompVariants } from './utils/framerVariants';
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion';

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
`;

const NotificationItem = styled(motion.div)`
  position: relative;
  pointer-events: auto;
  overflow: hidden;
  background: ${({ theme }) => theme.white};
  margin: 0 0 1em;
  width: 97%;
  height: auto;
  border-radius: 3px;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
  color: ${({ theme }) => theme.black};
  display: flex;

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

function Notification({ toast, closeFunction }) {
  const {
    id,
    toast: { message, type },
  } = toast;

  return (
    <NotificationItem variants={notificationItemVariant} layout type={type}>
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
      autoDismissRef.current = setInterval(() => {
        deleteNotificationHandler(notificationList[0].id);
      }, notificationList[0].toast?.dismissTime ?? 30000);
    } else console.info('No more lists to delete', autoDismissRef.current);

    return () => clearInterval(autoDismissRef.current);
  }, [notificationList.length, autoDismiss]);

  return (
    <AnimatePresence>
      <AnimateSharedLayout>
        <NotificationStore
          className={position}
          variants={notificationStoreVariant}
          initial='hidden'
          animate={notificationList.length === 0 ? 'hidden' : 'visible'}
          exit='hidden'
          layout>
          {!!notificationList.length &&
            notificationList.map(notification => (
              <Notification
                key={notification.id}
                toast={notification}
                closeFunction={deleteNotificationHandler}
              />
            ))}
        </NotificationStore>
      </AnimateSharedLayout>
    </AnimatePresence>
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
};
