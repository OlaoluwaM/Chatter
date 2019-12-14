import React from 'react';
import styled from 'styled-components';
import { AuthContext } from '../context/Context';
import { Route, Link, __RouterContext } from 'react-router-dom';

const NavContainer = styled.nav`
  position: relative;
  width: 100%;
  height: 6%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--main);
  padding: 0px 10px;

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
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: center;

  a {
    color: rgba(64, 32, 96, 0.5);
    text-decoration: none;
    transition: inherit;
    padding-top: 2px;
  }

  &.active > a,
  &:hover > a {
    border-top: 2px solid rgba(64, 32, 96, 1);
    color: rgba(64, 32, 96, 1);
  }
`;

function CustomLink({ to, exact, children, ...rest }) {
  return (
    <Route
      exact={exact}
      path={typeof to === 'object' ? to.pathname : to}
      children={({ match }) => (
        <NavItem {...rest} className={match ? 'active' : ''}>
          <Link to={to}>{children}</Link>
        </NavItem>
      )}
    />
  );
}

export default function Nav() {
  const { location } = React.useContext(__RouterContext);
  const { authed } = React.useContext(AuthContext);

  return (
    <NavContainer>
      <ul>
        <CustomLink to='/' exact={true}>
          Home
        </CustomLink>

        {authed && <CustomLink to='/Chat'>Chatroom</CustomLink>}
      </ul>

      {location.pathname !== '/Auth' &&
        location.pathname !== '/Chat' &&
        !authed && (
          <ul style={{ width: '25%' }}>
            <CustomLink
              to={{
                pathname: '/Auth',
                state: {
                  formType: 'login',
                },
              }}
              exact={true}>
              Login
            </CustomLink>

            <CustomLink
              exact={true}
              to={{
                pathname: '/Auth',
                state: {
                  formType: 'sign-up',
                },
              }}>
              Create an Account
            </CustomLink>
          </ul>
        )}

      {authed && <CustomLink to='/Logout'>Logout</CustomLink>}
    </NavContainer>
  );
}
