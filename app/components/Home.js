import React from 'react';
import styled from 'styled-components';

import vector from '../assets/croods.png';

const HomeContainer = styled.div.attrs({
  className: 'container',
})`
  background: ${({ theme }) => theme.baseColorDark};
  & > section {
    height: inherit;
    width: 100%;
    display: flex;
    align-items: center;
  }
`;

const Section1 = styled.section`
  background: url(${vector}) no-repeat;
  background-position: 93% 70%;
  background-size: 45%;
`;
const ForeFrontH1 = styled.h1`
  font-family: var(--primaryFont);
  font-weight: var(--bold);
  color: ${({ theme }) => theme.white};
  text-align: left;
  overflow-wrap: break-word;
  margin: 0;
  font-size: 7em;
  font-variant: small-caps;
  width: 55%;
  margin-left: 5%;
  text-shadow: 0 1px #808d93, -1px 0 #cdd2d5, -1px 2px #808d93, -2px 1px #cdd2d5,
    -2px 3px #808d93, -3px 2px #cdd2d5, -3px 4px #808d93, -4px 3px #cdd2d5,
    -4px 5px #808d93, -5px 4px #cdd2d5, -5px 6px #808d93, -6px 5px #cdd2d5,
    -6px 7px #808d93, -7px 6px #cdd2d5, -7px 8px #808d93, -8px 7px #cdd2d5,
    2px 2px 2px rgba(206, 89, 55, 0);
`;

export default function Home() {
  return (
    <HomeContainer>
      <Section1>
        <ForeFrontH1>Welcome To Chatter</ForeFrontH1>
      </Section1>
    </HomeContainer>
  );
}
