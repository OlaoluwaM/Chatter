import React from 'react';
import styled from 'styled-components';
import { Route, Link } from 'react-router-dom';

const NavContainer = styled.nav`
  position: relative;
  width: 100%;
  height: 6%;
  display: flex;
  align-items: center;
  background: none;

  ul {
    width: 18%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 0;
    padding: 0;
    padding-top: 8px;
  }
`;

const NavItem = styled.li`
  list-style-type: none;
  font-family: var(--font2);
  font-weight: 300;
  font-size: 1.1rem;
  transition: 0.3s ease;
  height: 100%;
  flex-basis: 100%;
  width: 100%;
  margin-left: 25px;
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: center;

  a {
    color: var(--sub);
    text-decoration: none;
    transition: inherit;
  }
`;

function Icon() {}

function CustomLink({ to, exact, children }) {
  return (
    <Route
      exact={exact}
      path={to}
      children={({ match }) => (
        <NavItem className={match ? 'active' : ''}>
          <Link to={to}>{children}</Link>
        </NavItem>
      )}
    />
  );
}

export default function Nav() {
  const [toggle, setToggle] = React.useState(false);

  return (
    <NavContainer>
      <ul>
        <CustomLink to="/" exact={true}>
          Home
        </CustomLink>
        <CustomLink to="/Chat">Chatroom</CustomLink>
      </ul>
    </NavContainer>
  );
}
