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

export const pathObj = {
  initial: '',
  error:
    'M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.151 17.943l-4.143-4.102-4.117 4.159-1.833-1.833 4.104-4.157-4.162-4.119 1.833-1.833 4.155 4.102 4.106-4.16 1.849 1.849-4.1 4.141 4.157 4.104-1.849 1.849z',
  success:
    'M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.959 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591z',
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
    opacity: 0.5,
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
  enabled: { opacity: 1 },
};

export const inputItemVariant = {
  visible: {
    opacity: 0.5,
    x: 0,
    transition: { type: 'tween' },
  },
  hidden: {
    opacity: 0,
    x: 30,
  },
  enabled: { opacity: 1 },
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
  hidden: { y: -50, opacity: 0 },
  exit: { y: 80, opacity: 0 },
};

export const simpleVariant = {
  showDisplay: { opacity: 1, transition: { delay: 0.5 } },
  show: { opacity: 1, transition: { delay: 0.7 } },
  hide: { opacity: 0 },
};

export const inputSvgValidatorVariants = {
  initial: {
    rotateY: 180,
    y: 30,
    opacity: 0,
    fill: 'rgba(255,255,255,1)',
    x: 0,
    rotate: 0,
  },
  appear: ({ isError, color }) => ({
    rotateY: 0,
    y: 0,
    opacity: 1,
    fill: color,
    rotate: !isError ? [0, 0, 0, 20, -20, 0] : 0,
    x: isError ? [0, 0, 0, 0, 5, -5, 3, -3, 1, -1, 0] : 0,
  }),
  hide: { rotateY: 180, y: 30, opacity: 0, rotate: 0, x: 0 },
};
