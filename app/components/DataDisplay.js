import React from 'react';
import { default as styled, css } from 'styled-components';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/Context';

const DataContainer = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;

  div {
    height: 100%;
    padding: 6px;
  }
`;

const Avatar = styled.div`
  flex-basis: 25%;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    position: relative;
    border-radius: 50%;
    background: ${({ color }) => color};
    width: 50px;
    height: 50px;
  }

  div:after {
    content: '';
    position: absolute;
    border-radius: 50%;
    height: 10px;
    width: 10px;
    bottom: 0px;
    right: 4px;
    border: 1px solid ${({ theme }) => theme.black};
    background: ${({ status }) => (status === 'online' ? 'lightgreen' : 'red')};
  }
`;

const Content = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;

  p {
    margin: 0;
    text-transform: capitalize;
  }

  p:first-of-type {
    margin-bottom: 5px;
  }

  p:last-of-type {
    font-size: small;
    ${({ isCurrentUser }) =>
      isCurrentUser &&
      css`
        font-size: 1.2rem;
        margin-bottom: 0;
      `}
    font-weight: 200;
    font-family: var(--font2);
  }
`;

const ActionInfo = styled.div.attrs({
  className: 'action-area',
})`
  display: flex;
  flex-direction: ${({ dir }) => dir};
  justify-content: space-around;
  align-items: center;
  padding: 0;
  height: 100%;
  flex-basis: 30%;
  font-size: 1.6rem;
`;

export function UserDisplay(props) {
  const { isCurrentUser, data, subData, children, dir, motionProps } = props;

  const { userId, metaData, connectionStatus } = data;
  const { avatarColor } = metaData;

  return (
    <DataContainer {...motionProps}>
      <Avatar
        status={isCurrentUser ? 'online' : connectionStatus}
        color={avatarColor ? avatarColor : '#000'}>
        <div></div>
      </Avatar>

      <Content isCurrentUser={isCurrentUser}>
        <p>{userId}</p>
        {subData && <p>{subData}</p>}
      </Content>

      {children && <ActionInfo dir={dir}>{children}</ActionInfo>}
    </DataContainer>
  );
}

export function GroupDisplay({ data, subData, children, dir }) {
  return (
    <DataContainer>
      <Content>
        <p>{groupName}</p>
        {subData && <p>{subData}</p>}
      </Content>

      {children && <ActionInfo dir={dir}>{children}</ActionInfo>}
    </DataContainer>
  );
}

UserDisplay.propTypes = {
  data: PropTypes.object.isRequired,
  dir: PropTypes.string,
  subData: PropTypes.string,
  isCurrentUser: PropTypes.bool,
};

GroupDisplay.propTypes = {
  data: PropTypes.object.isRequired,
  dir: PropTypes.string,
  subData: PropTypes.string,
};

UserDisplay.defaultProps = {
  dir: 'row',
  isCurrentUser: false,
};

GroupDisplay.defaultProps = {
  dir: 'row',
};
