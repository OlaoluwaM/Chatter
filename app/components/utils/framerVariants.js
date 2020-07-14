'use strict';
// import { themeObj } from '../context/context';

const generalOrchestration = {
  visible: { when: 'beforeChildren', staggerChildren: 0.2 },
  hidden: {
    when: 'afterChildren',
    staggerChildren: 0.2,
    staggerDirection: -1,
  },
};

export const homeH1Variants = {
  popOut: {
    opacity: 1,
    y: 0,
    //TODO fix text shadow effect
    textShadow: `0 1px #808d93, -1px 0 #cdd2d5, -1px 2px #808d93, -2px 1px #cdd2d5,
    -2px 3px #808d93, -3px 2px #cdd2d5, -3px 4px #808d93, -4px 3px #cdd2d5,
    -4px 5px #808d93, -5px 4px #cdd2d5, -5px 6px #808d93, -6px 5px #cdd2d5,
    -6px 7px #808d93, -7px 6px #cdd2d5, -7px 8px #808d93, -8px 7px #cdd2d5,
    2px 2px 2px rgba(206, 89, 55, 0)`,
    transition: { type: 'tween', ease: 'easeOut', delay: 1.2 },
  },
  hidden: {
    opacity: 0,
    y: 100,
    textShadow: `0 0px #808d93, 0px 0 #cdd2d5, 0px 0px #808d93, 0px 0px #cdd2d5,
    0px 0px #808d93, 0px 0px #cdd2d5, 0px 0px #808d93, 0px 0px #cdd2d5,
    0px 0px #808d93, 0px 0px #cdd2d5, 0px 0px #808d93, 0px 0px #cdd2d5,
    0px 0px #808d93, 0px 0px #cdd2d5, 0px 0px #808d93, 0px 0px #cdd2d5,
    0px 0px 0px rgba(206, 89, 55, 0)`,
    transition: { type: 'tween', ease: 'easeIn' },
  },
};

export const navVariants = {
  visible: {
    opacity: 1,
    transition: {
      ...generalOrchestration.visible,
      delay: 1.5,
    },
  },
  hidden: {
    opacity: 0,
    transition: generalOrchestration.hidden,
  },
};

export const navItemVariants = {
  visible: {
    y: 0,
  },
  hidden: {
    y: -70,
  },
};

export const authFormVariants = {
  up: {
    opacity: 1,
    transition: {
      ...generalOrchestration.visible,
      staggerChildren: 0.1,
    },
  },
  hidden: {
    opacity: 0,
    transition: { ...generalOrchestration.hidden, staggerChildren: 0.1 },
  },
};

export const authInputVariants = {
  up: {
    opacity: 1,
    y: 0,
  },
  hidden: {
    opacity: 0,
    y: 60,
  },
};

export const authFormHeader = {
  visible: {
    opacity: 1,
    y: 0,
  },
  hidden: {
    opacity: 0,
    y: 40,
  },
};

export const authErrorMessage = {
  visible: {
    opacity: 1,
    x: [0, 5, -5, 4, -4, 2, -2, 0],
    transition: { type: 'spring', duration: 0.2 },
  },
  hidden: {
    opacity: 0,
    x: -5,
  },
};
