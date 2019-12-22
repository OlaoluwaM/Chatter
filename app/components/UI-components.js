import styled from 'styled-components';
import { motion } from 'framer-motion';

// For Components I use in multiple files

export const Wrapper = styled(motion.div)`
  width: 100%;
  height: 94%;
`;

export const OverHead = styled(motion.div)`
  width: 100%;
  flex-basis: 12vh;
  height: 12vh;
  min-height: 12%;
  display: flex;
  background: rgba(0, 0, 0, 1);
`;
