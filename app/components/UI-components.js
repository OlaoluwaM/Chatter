import styled from 'styled-components';
import { animated } from 'react-spring';

// For Components I use in multiple files

export const Button = styled(animated.button)`
  border: 1.4px solid var(--sub);
  font-size: 1.1rem;
  color: inherit;
  padding: 20px 40px;
  width: 270px;
  text-transform: uppercase;
  cursor: pointer;
  font-family: var(--font2);
  border-radius: 50px;
  background: transparent;
  outline: none;
`;

export const OverHead = styled.div`
  width: 100%;
  flex-basis: 12%;
  height: 12%;
  display: flex;
  background: rgb(115, 57, 172);
`;
