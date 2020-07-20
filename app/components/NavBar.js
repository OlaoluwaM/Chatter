import React from 'react';
import { default as styled, keyframes } from 'styled-components';

import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { hexToRgb } from './utils/helpers';
import { navBarVariants } from './utils/framerVariants';

const { navVariants, navItemVariants } = navBarVariants;

const activeNavAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
  opacity: 1;
  transform: translateY(0)
  }
`;

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

    & > a {
      text-decoration: none;
      font-size: 1.3em;
      padding: 10px;
      position: relative;

      &.nav-item::after {
        content: '';
        position: absolute;
        background: ${({ theme }) => theme.baseColorLightest};
        width: 100%;
        height: 0.2em;
        bottom: 0;
        left: 0;
        border-radius: 25px;
        transition: 0.3s ease;
        opacity: 0;
        transform: translateY(10px);
      }
      &.nav-item.active-page::after {
        animation: ${activeNavAnimation} 0.2s 0.5s ease forwards;
      }
    }
  }
`;

const NavItem = styled(motion.li)`
  text-transform: capitalize;
  font-family: var(--primaryFont);
  font-weight: var(--bold);
`;

export default function NavBar() {
  return (
    <Nav variants={navVariants} initial='hidden' animate='visible'>
      <ul>
        <NavLink
          exact
          to='/'
          activeClassName='active-page'
          className='nav-item'>
          <NavItem variants={navItemVariants}>Home</NavItem>
        </NavLink>
        <NavLink to='/about' activeClassName='active-page' className='nav-item'>
          <NavItem variants={navItemVariants}>About</NavItem>
        </NavLink>
      </ul>
    </Nav>
  );
}
