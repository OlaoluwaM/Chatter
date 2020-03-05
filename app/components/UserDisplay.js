import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { AuthContext } from '../context/Context';
import { motion } from 'framer-motion';

const UserDataContainer = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;

  div {
    display: flex;
    justify-content: space-around;
    height: 100%;
    padding: 8px;
  }
`;

const AvatarColorHolder = styled.div`
  flex-basis: 25%;
  align-items: center;

  div {
    background: ${({ color }) => color};
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1.5px solid ${({ theme }) => theme.main};
  }
`;

const Content = styled.div`
  flex-grow: 1;
  align-items: flex-start;
  flex-direction: column;

  p {
    margin: 0;
  }
`;

const optionalInfo = styled.div`
  flex-direction: ${({ dir }) => dir};
  align-items: center;
`;

export default function UserDisplay(props) {
  const { user: userId, color } = React.useContext(AuthContext);

  const {
    avatarColor,
    userName,
    subData,
    optionalGroup,
    children,
    direction = 'row',
    motionProps,
  } = props;

  return (
    <UserDataContainer {...motionProps}>
      <AvatarColorHolder color={avatarColor ? avatarColor : color}>
        <div></div>
      </AvatarColorHolder>
      <Content>
        <p>{userName ? userName : userId}</p>
        {subData && <p>{subData}</p>}
      </Content>
      {optionalGroup && <optionalInfo dir={direction}>{children}</optionalInfo>}
    </UserDataContainer>
  );
}

UserDisplay.PropTypes = {
  avatarColor: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  subData: PropTypes.string,
  optionalGroup: PropTypes.bool,
  direction: PropTypes.bool,
  motionProps: PropTypes.object,
};
