import React from 'react';
import { AiFillSetting } from 'react-icons/ai';
import styled from 'styled-components';
import { ChatContext } from '../context/Context';
import { hexToRgb, lightenDarkenColor } from '../utils/helper';
import { currentUserDisplayVariants } from '../utils/motionObj';
import { UserDisplay } from './DataDisplay';
import Menu from './Menu';
import { MenuItem } from './User';

// TODO create settings for logout username edit and deletion of account

const SidebarContainer = styled.nav`
  position: relative;
  height: 100%;
  flex-basis: 30%;
  width: 100%;
  background: ${({ theme }) =>
    lightenDarkenColor(theme.secondaryColorDark, -20)};
`;

export const CurrentUserDisplay = styled(MenuItem).attrs({
  variants: currentUserDisplayVariants,
  exit: 'hidden',
})`
  width: 100%;
  height: auto;
  margin: 0px;
  cursor: default;
  border-radius: 0;
  color: ${({ theme }) => theme.primaryColor};
`;

const SideBarCategory = styled.ul`
  width: 100%;
  height: 7%;
  margin: 0;
  margin-top: 8px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  list-style: none;
  padding: 0;
  font-family: var(--font1);
  font-weight: 600;
  text-transform: capitalize;

  li {
    color: ${({ theme }) => hexToRgb(theme.primaryColor, 0.3)};
    font-size: 0.9em;
    transition: 0.3s ease;
    cursor: pointer;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: color 0.3s ease;
    background: transparent;
    position: relative;

    &:after {
      content: '';
      position: absolute;
      width: 70%;
      height: 6%;
      border-radius: 10px;
      bottom: 0;
      transform-origin: center;
      transform: scaleX(0);
      background: ${({ theme }) => theme.secondaryColor};
      transition: transform 0.3s ease;
    }

    &.active {
      color: ${({ theme }) => theme.primaryColor};

      &:after {
        transform: scaleX(1);
      }
    }
  }
`;

function CurrentUser({ user }) {
  return (
    <CurrentUserDisplay
      variants={currentUserDisplayVariants}
      initial='hidden'
      animate='visible'>
      <UserDisplay isCurrentUser={true} data={user}>
        <AiFillSetting style={{ cursor: 'pointer' }} />
      </UserDisplay>
    </CurrentUserDisplay>
  );
}

export default function Sidebar({ inviteUser }) {
  const { sb } = React.useContext(ChatContext);

  const categories = ['users', 'friends', 'blocked'];
  const [category, setCategory] = React.useState(categories[0]);

  const toggleCategory = ind => setCategory(categories[ind]);

  return (
    <SidebarContainer>
      <CurrentUser user={sb.currentUser} />

      <SideBarCategory>
        {categories.map((text, ind) => (
          <li
            className={text === category ? 'active' : ''}
            onClick={() => toggleCategory(ind)}
            key={text}>
            {text}
          </li>
        ))}
      </SideBarCategory>

      <Menu
        category={category}
        categories={categories}
        inviteUser={inviteUser}
      />
    </SidebarContainer>
  );
}
