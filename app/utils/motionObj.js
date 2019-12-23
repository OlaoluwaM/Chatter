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
      dealyChildren: 0.1,
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
    x: 100,
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
