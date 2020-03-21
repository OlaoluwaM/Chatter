import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { hexToRgb } from '../utils/helper';
import { AuthContext } from '../context/Context';
import { navUlVariant, navItemVariant } from '../utils/motionObj';
import { Route, Link, __RouterContext } from 'react-router-dom';

const NavContainer = styled.nav`
  position: relative;
  width: 100%;
  height: 7%;
  overflow: hidden;
  display: grid;
  background: ${({ theme }) => theme.main};
`;

const NavUl = styled(motion.ul)`
  width: auto;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 180px));
  grid-auto-flow: column;
  gap: 10px;
  justify-content: end;
  margin: 0;
  padding: 0;
`;

const NavItem = styled(motion.li)`
  list-style-type: none;
  font-family: var(--font1);
  font-weight: 700;
  font-size: 1.1rem;
  height: 100%;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => hexToRgb(theme.black, 0.5)};
  letter-spacing: 0.1rem;

  a {
    color: inherit;
    text-decoration: none;
    padding-top: 2px;
  }
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
  const { isAuthenticated } = React.useContext(AuthContext);

  return (
    <NavContainer>
      <NavUl variants={navUlVariant} initial='hidden' animate='visible'>
        {!isAuthenticated && (
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
                pathname: '/authorize',
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
                pathname: '/authorize',
                state: {
                  formType: 'sign-up',
                },
              }}>
              Sign Up
            </CustomLink>
          </>
        )}

        {isAuthenticated && (
          <>
            <CustomLink
              motionProps={{
                variants: navItemVariant,
                whileHover: 'hover',
              }}
              to='/chat'>
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
