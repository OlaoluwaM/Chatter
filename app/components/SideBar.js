import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { OverHead } from './UI-components';

const SideBarWrapper = styled.div`
  background: var(--main);
  color: var(--main);
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-top: 15px;
  flex-basis: 28%;
  width: 28%;
  overflow-y: auto;
  border-right: 1.5px solid #222;
`;

export default function SideBar() {
  return (
    <SideBarWrapper>
      <OverHead></OverHead>
    </SideBarWrapper>
  );
}
