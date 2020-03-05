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
    x: 0,
    transition: { ...spring2 },
  },
  hidden: {
    opacity: 0,
    x: 110,
    transition: { ...tween },
  },
};

// -----------------------------------------------------------------------------

export const InputInfoVariant = {
  visible: {
    opacity: 1,
    x: 0,
    transition: { ...spring2 },
  },
  hidden: {
    opacity: 0,
    x: 50,
    transition: { ...spring2 },
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
    opacity: 1,
    y: 0,
    transition: { ...spring },
  },
  hidden: {
    opacity: 0,
    y: -100,
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
    color: themeObj.darkSub,
    transition: { type: 'tween', ease: 'linear' },
  },
};

export const sideBarVariant = {
  visible: {
    flexBasis: '30%',
    width: '100%',
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.2,
    },
  },
  hidden: {
    flexBasis: 0,
    width: '0%',
  },
};

export const menuVariants = {
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
  hidden: {
    opacity: 0,
  },
};

export const menuItemVariant = {
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      ...spring2,
    },
  },
  hidden: {
    opacity: 0,
    x: '-100%',
  },
};
