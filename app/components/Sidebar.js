import { motion } from 'framer-motion';
import React from 'react';
import { AiFillSetting } from 'react-icons/ai';
import { Link, NavLink, Route, Switch, useRouteMatch } from 'react-router-dom';
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
  font-family: var(--font1);
  background: ${({ theme }) =>
    lightenDarkenColor(theme.secondaryColorDark, -20)};

  & > h3 {
    width: 100%;
    margin: 0;
    text-align: center;
    margin-top: 7%;
    margin-bottom: 7%;
    font-size: 1.6rem;
    color: ${({ theme }) => hexToRgb(theme.primaryColor, 0.3)};
  }
`;

export const CurrentUserDisplay = styled(MenuItem).attrs({
  variants: currentUserDisplayVariants,
  exit: 'hidden',
})`
  width: 100%;
  height: auto;
  margin: 0px;
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

    &.active::after {
      transform: scaleX(1);
    }
  }
`;

const UserDataContainer = styled(motion.div)`
  height: 38%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 2em;

  & > img {
    width: 40%;
    border-radius: 50%;
    height: auto;
    margin-bottom: 10%;
  }

  & > p {
    width: 100%;
    margin: 0;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.primaryColor};
  }
`;

const SettingOptions = styled(motion.ul)`
  height: 45%;
  width: 100%;
  padding: 0;
  margin: 0;
  margin-top: 20px;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;
  font-size: 1em;

  & > a {
    color: ${({ theme }) => hexToRgb(theme.primaryColor, 0.3)};
    transition: color 0.3s ease, background 0.3s ease;
    width: 80%;
    height: 20%;
    margin-bottom: 5%;
    position: relative;
    padding-left: 25%;
    cursor: pointer;
    background: transparent;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    text-decoration: none;

    & > li {
      color: inherit;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      text-align: left;
    }

    &:hover,
    &.active {
      background: ${({ theme }) => theme.secondaryColorDark};
    }
  }
`;

function CurrentUser({ user }) {
  const { url } = useRouteMatch();

  return (
    <CurrentUserDisplay
      variants={currentUserDisplayVariants}
      initial='hidden'
      animate='visible'>
      <UserDisplay isCurrentUser={true} data={user}>
        <Link
          to={{
            pathname: `${url}/settings`,
            state: user,
          }}>
          <AiFillSetting />
        </Link>
      </UserDisplay>
    </CurrentUserDisplay>
  );
}

function ChatSideBar({ inviteUser, currentUser }) {
  const categories = ['users', 'friends', 'blocked'];
  const [category, setCategory] = React.useState(categories[0]);

  const toggleCategory = ind => setCategory(categories[ind]);

  return (
    <>
      <CurrentUser user={currentUser} />

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
    </>
  );
}

function SettingsSidebar({ currentUser }) {
  const { url } = useRouteMatch();
  const { profileUrl, nickname } = currentUser;
  const altText = `${nickname}'s profile Image`;

  return (
    <>
      <h3>Settings</h3>

      <UserDataContainer>
        <img src={profileUrl} alt={altText} />
        <p>{nickname}</p>
      </UserDataContainer>

      <SettingOptions>
        <NavLink activeClassName='active' exact to={url}>
          <li>Update Profile</li>
        </NavLink>

        <NavLink activeClassName='active' to={`${url}/logout`}>
          <li>Logout</li>
        </NavLink>

        <NavLink activeClassName='active' to={`${url}/delete-account`}>
          <li>Delete Account</li>
        </NavLink>

        <NavLink activeClassName='active' exact to='/chat'>
          <li>Return to chat</li>
        </NavLink>
      </SettingOptions>
    </>
  );
}

export default function Sidebar({ inviteUser }) {
  const { path } = useRouteMatch();
  const { sb } = React.useContext(ChatContext);
  const { currentUser } = sb;

  return (
    <SidebarContainer>
      <Switch>
        <Route path={`${path}/settings`}>
          <SettingsSidebar currentUser={currentUser} />
        </Route>

        <Route path={path}>
          <ChatSideBar currentUser={currentUser} inviteUser={inviteUser} />
        </Route>
      </Switch>
    </SidebarContainer>
  );
}
