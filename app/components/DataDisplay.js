import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React from 'react';
import { css, default as styled } from 'styled-components';
import { generateRandomColor, hexToRgb, isColor } from '../utils/helper';

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

export const colorStyles = bg => `background: ${bg}`;
export const avatarStyles = img => `
            background: url(${img}) center no-repeat;
            background-size: 100%;`;

const Avatar = styled.div`
  flex-basis: 20%;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    position: relative;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    border: 2px solid;
    ${({ bg }) => (isColor(bg) ? colorStyles(bg) : avatarStyles(bg))};
  }

  div:after {
    content: '';
    position: absolute;
    border-radius: 50%;
    height: 10px;
    width: 10px;
    bottom: -2px;
    right: 0px;
    border: 3px solid ${({ theme }) => theme.primaryColor};
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
    /* text-transform: capitalize; */
    color: inherit;
  }

  p:first-of-type {
    margin-bottom: 5px;
    font-size: 1.2em;
  }

  p:last-of-type {
    font-size: 0.7em;
    font-weight: 200;
    font-family: var(--font1);
    letter-spacing: 0.1em;
    filter: opacity(0.7);

    ${({ isCurrentUser }) =>
      isCurrentUser &&
      css`
        filter: opacity(1);
        font-size: 1.2rem;
        margin-bottom: 0;
      `};
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

  ${({ theme }) =>
    css`
      color: ${hexToRgb(theme.primaryColor, 0.3)};
      fill: ${hexToRgb(theme.primaryColor, 0.3)};
      stroke: ${hexToRgb(theme.primaryColor, 0.3)};

      & > svg:hover {
        color: ${theme.primaryColor};
        fill: ${theme.primaryColor};
        stroke: ${theme.primaryColor};
      }
    `}
`;

export function UserDisplay(props) {
  const { isCurrentUser, data, subData, children, dir, motionProps } = props;
  const { nickname, connectionStatus, profileUrl } = data;

  return (
    <DataContainer {...motionProps}>
      <Avatar
        status={isCurrentUser ? 'online' : connectionStatus}
        bg={profileUrl ?? generateRandomColor()}>
        <div></div>
      </Avatar>

      <Content isCurrentUser={isCurrentUser}>
        <p>{nickname}</p>
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

UserDisplay.defaultProps = {
  dir: 'row',
  isCurrentUser: false,
};
