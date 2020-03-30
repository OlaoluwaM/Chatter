import { themeObj } from '../context/Context';

export const spring2 = {
  type: 'spring',
  mass: 1,
  tension: 180,
  friction: 12,
};

export const spring = {
  type: 'spring',
  damping: 20,
  stiffness: 300,
};

export const tween = {
  type: 'tween',
  duration: 0.2,
  ease: 'easeIn',
};
// For Form.js -----------------------------------------------------------------------------------

export const containerVariant = {
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.2,
    },
  },

  hidden: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
    },
  },
};

export const itemVariant = {
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...spring2 },
  },
  hidden: {
    opacity: 0,
    y: -70,
    transition: { ...tween },
  },
};

// -----------------------------------------------------------------------------

export const InputInfoVariant = {
  visible: {
    opacity: 1,
    y: 0,
  },
  hidden: {
    opacity: 0,
    y: -10,
    transition: { ...spring },
  },
};

export const colorPickerVariant = {
  visible: {
    opacity: 1,
    x: 0,
    transition: { ...spring },
  },
  hidden: {
    opacity: 0,
    x: 100,
    transition: { ...spring },
  },
};

export const regularTexVariant = {
  visible: {
    opacity: 1,
    y: 0,
  },
  hidden: {
    opacity: 0,
    y: 50,
  },
};

export const headerVariant = {
  visible: {
    y: 0,
    opacity: 1,
    transition: { ...spring, delay: 1.2 },
  },
  hidden: {
    y: -50,
    opacity: 0,
  },
};

export const buttonVariant = {
  visible: {
    opacity: 1,
    boxShadow: '20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff',
    transform: 'scale(1)',
    transition: { ...spring, delay: 0.5 },
  },
  hidden: {
    opacity: 0,
    boxShadow: '0px 0px 0px #d9d9d9, 0px 0px 0px #ffffff',
    transform: 'scale(0.7)',
  },
  tap: {
    boxShadow: '0px 0px 0px #d9d9d9, 0px 0px 0px #ffffff',
    transform: 'scale(0.9)',
  },
};

export const inputContainerVariant = {
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
      delayChildren: 1,
      staggerDirection: -1,
    },
  },

  hidden: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
    },
  },
};

export const inputItemVariant = {
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'tween' },
  },
  hidden: {
    opacity: 0,
    x: 30,
  },
};

// NAV

export const navUlVariant = {
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      delayChildren: 0.5,
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
      staggerChildren: 0.1,
    },
  },
};

export const navItemVariant = {
  visible: {
    opacity: 1,
    x: 0,
    transition: { ...spring },
  },
  hidden: {
    opacity: 0,
    x: 20,
  },
  hover: {
    color: themeObj.secondaryColorDark,
    transition: { type: 'tween', ease: 'linear' },
  },
};

export const menuVariants = {
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
      delayChildren: 0.6,
    },
  },
  hidden: {
    opacity: 0,
  },
};

export const menuItemVariant = {
  visible: i => ({
    opacity: 1,
    x: 0,
    transition: {
      ...spring,
      delay: i * 0.1,
    },
  }),
  hidden: i => ({
    opacity: 0,
    x: -40,
    transition: {
      ...spring,
      delay: 0.03 * i,
    },
  }),
};

export const currentUserDisplayVariants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: -50 },
};

export const simpleVariant = {
  showDisplay: { opacity: 1, transition: { delay: 0.5 } },
  show: { opacity: 1, transition: { delay: 0.7 } },
  hide: { opacity: 0 },
};
