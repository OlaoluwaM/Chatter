import React from 'react';
import styled from 'styled-components';

import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { navVariants, navItemVariants } from './utils/framerVariants';

const Nav = styled(motion.nav)`
  height: auto;
  position: absolute;
  top: 0;
  width: 100%;
  padding: 1em 0;
  z-index: 10;
  background: transparent;

  & > ul {
    list-style: none;
    margin: 0 auto 0 0;
    padding: 0;
    width: 30%;
    height: inherit;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    & a {
      text-decoration: none;
      color: ${({ theme }) => theme.baseColorDark};
      font-size: 1.3em;
      padding: 10px;
    }
  }
`;

const NavItem = styled(motion.li)`
  text-transform: lowercase;
  font-family: var(--primaryFont);
  font-weight: var(--bold);
`;

export default function NavBar() {
  return (
    <Nav variants={navVariants} initial='hidden' animate='visible'>
      <ul>
        <NavLink to='/'>
          <NavItem variants={navItemVariants}>Home</NavItem>
        </NavLink>
        <NavLink to='/about'>
          <NavItem variants={navItemVariants}>About</NavItem>
        </NavLink>
      </ul>
    </Nav>
  );
}
