import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { capitalize } from '../utils/helper';
import { useSpring, animated } from 'react-spring';

const WrapperDiv = styled.div`
  cursor: pointer;
  z-index: 30;
`;

const TooltipBox = styled(animated.div)`
  position: absolute;
  right: -200px;
  top: -25px;
  display: flex;
  width: max-content;
  height: max-content;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  background: var(--sub);
  color: var(--main);
  font-family: var(--font2);
  font-size: 1.2rem;
  padding: 15px;
`;

function useHover() {
  const [hovering, setHovering] = React.useState(false);

  const onMouseOver = () => setHovering(true);
  const onMouseOut = () => setHovering(false);

  const attr = {
    onMouseOver,
    onMouseOut,
  };

  return [hovering, attr];
}

export default function Tooltip({ text, children }) {
  const [hovering, attr] = useHover();

  const showAnim = useSpring({
    from: { opacity: 0, transform: 'translateX(10px)' },
    to: hovering && { opacity: 1, transform: 'translateX(0px)' },
    reset: true,
    reverse: hovering === false ? true : false,
  });

  return (
    <WrapperDiv {...attr}>
      {hovering && <TooltipBox style={showAnim}>{capitalize(text)}</TooltipBox>}
      {children}
    </WrapperDiv>
  );
}

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
};
Tooltip.defaultProps = {
  text: 'message',
};
