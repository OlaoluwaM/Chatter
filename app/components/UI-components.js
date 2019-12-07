import styled from 'styled-components';
import { animated } from 'react-spring';

export const Button = styled(animated.button)`
  border: 1.4px solid var(--white);
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
