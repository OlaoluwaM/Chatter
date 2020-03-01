import React from 'react';
import styled from 'styled-components';
import { AuthContext } from '../context/Context';
import { Route, Link, __RouterContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { hexToRgb } from '../utils/helper';
import { navUlVariant, navItemVariant } from '../utils/motionObj';

const NavContainer = styled.nav`
  position: relative;
  width: 100%;
  height: 7%;
  overflow: hidden;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  background: ${({ theme }) => theme.main};
`;

const NavItem = styled(motion.li)`
  list-style-type: none;
  font-family: var(--font1);
  font-weight: 700;
  font-size: 1.1rem;
  height: 100%;
  display: flex;
  text-align: center;
  align-items: flex-end;
  justify-content: center;
  color: ${({ theme }) => hexToRgb(theme.black, 0.5)};
  letter-spacing: 0.1rem;

  a {
    color: inherit;
    text-decoration: none;
    padding-top: 2px;
  }
`;

const NavUl = styled(motion.ul).attrs({
  className: 'nav-ul',
})`
  flex-basis: ${({ children }) => `${children.length * 10 + 5}%`};
  width: 25%;
  height: 100%;
  display: grid;
  margin: 0;
  padding: 0;
`;

function CustomLink({ to, exact, children, ...rest }) {
  const { motionProps } = rest;
  return (
    <Route
      exact={exact}
      path={typeof to === 'object' ? to.pathname : to}
      children={({ match }) => (
        <NavItem {...motionProps} {...rest} className={match ? 'active' : ''}>
          <Link to={to}>{children}</Link>
        </NavItem>
      )}
    />
  );
}

export default function Nav() {
  const { location } = React.useContext(__RouterContext);
  const { authed } = React.useContext(AuthContext);

  const { pathname } = location;
  return (
    <NavContainer>
      <NavUl variants={navUlVariant} initial='hidden' animate='visible'>
        {!authed && (
          <>
            <CustomLink
              motionProps={{
                variants: navItemVariant,
                whileHover: 'hover',
              }}
              to='/'
              exact={true}>
              Home
            </CustomLink>

            <CustomLink
              motionProps={{
                variants: navItemVariant,
                whileHover: 'hover',
              }}
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
              motionProps={{
                variants: navItemVariant,
                whileHover: 'hover',
              }}
              exact={true}
              to={{
                pathname: '/Auth',
                state: {
                  formType: 'sign-up',
                },
              }}>
              Sign Up
            </CustomLink>
          </>
        )}

        {authed && (
          <>
            <CustomLink
              motionProps={{
                variants: navItemVariant,
                whileHover: 'hover',
              }}
              to='/Chat'>
              Chatroom
            </CustomLink>

            <CustomLink
              motionProps={{
                variants: navItemVariant,
                whileHover: 'hover',
              }}
              to='/Logout'>
              Logout
            </CustomLink>

            <CustomLink
              motionProps={{
                variants: navItemVariant,
                whileHover: 'hover',
              }}
              to='/DeleteAccount'>
              Delete account
            </CustomLink>
          </>
        )}
      </NavUl>
    </NavContainer>
  );
}
