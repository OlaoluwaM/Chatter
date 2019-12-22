import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { capitalize } from '../utils/helper';
import { motion, AnimatePresence } from 'framer-motion';

const WrapperDiv = styled(motion.div)`
  cursor: pointer;
  z-index: 30;
`;

const TooltipBox = styled(motion.div)`
  position: absolute;
  right: -210px;
  top: -28px;
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

export default function Tooltip({ text, children, MotionProps, style }) {
  const [hovering, attr] = useHover();

  const tooltip = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: 90 },
  };

  return (
    <WrapperDiv {...attr} {...MotionProps} style={style}>
      <AnimatePresence>
        {hovering && (
          <TooltipBox variants={tooltip} animate='visible' exit='hidden'>
            {capitalize(text)}
          </TooltipBox>
        )}
      </AnimatePresence>
      {children}
    </WrapperDiv>
  );
}

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  MotionProps: PropTypes.object,
  style: PropTypes.object,
};

Tooltip.defaultProps = {
  text: 'message',
};
