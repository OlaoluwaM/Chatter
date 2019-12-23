import React from 'react';
import styled from 'styled-components';
import { AuthContext } from '../context/Context';
import { Route, Link, __RouterContext } from 'react-router-dom';
import { motion } from 'framer-motion';

const NavContainer = styled.nav`
  position: relative;
  width: 100%;
  height: 7%;
  padding: 0px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--main);
`;

const NavItem = styled(motion.li)`
  list-style-type: none;
  font-family: var(--font1);
  font-weight: 700;
  font-size: 1.1rem;
  transition: 0.5s ease;
  height: 100%;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  color: rgba(0, 0, 0, 0.5);
  letter-spacing: 0.1rem;

  a {
    color: inherit;
    text-decoration: none;
    transition: inherit;
    padding-top: 2px;
  }

  &.active,
  &:hover {
    color: rgba(140, 83, 198, 1);
  }
`;

const NavUl = styled.ul`
  flex-basis: 25%;
  width: 25%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0;
  padding: 0;

  & > ${NavItem} {
    width: ${({ children }) => `calc(100%/ ${children.length})`};
    flex-basis: ${({ children }) => `calc(100%/ ${children.length})`};
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
      <NavUl>
        <CustomLink to='/' exact={true}>
          Home
        </CustomLink>

        {authed && <CustomLink to='/Chat'>Chatroom</CustomLink>}
      </NavUl>

      {location.pathname !== '/Auth' &&
        location.pathname !== '/Chat' &&
        !authed && (
          <NavUl>
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
              Sign Up
            </CustomLink>
          </NavUl>
        )}

      {authed && (
        <NavUl>
          <CustomLink to='/Logout'>Logout</CustomLink>
          <CustomLink to='/DeleteAccount'>Delete account</CustomLink>
        </NavUl>
      )}
    </NavContainer>
  );
}
