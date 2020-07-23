'use strict';

const generalOrchestration = {
  visible: {
    opacity: 1,
    transition: { when: 'beforeChildren', staggerChildren: 0.2 },
  },
  hidden: {
    opacity: 1,
    transition: {
      when: 'afterChildren',
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
};

export const homePageVariants = {
  sectionVariants: {
    popOut: { ...generalOrchestration.visible },
    hidden: { ...generalOrchestration.hidden },
  },
  homeH1Variants: {
    popOut: {
      opacity: 1,
      y: 0,
      textShadow:
        '0 1px 0 #CCCCCC, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.15), 2px 2px 2px rgba(206,89,55,0)',

      transition: { type: 'tween', ease: 'easeOut' },
    },
    hidden: {
      opacity: 0,
      y: 100,
      textShadow:
        '0 0px 0 #CCCCCC, 0 0px 0 #c9c9c9, 0 0px 0 #bbb, 0 0px 0 #b9b9b9, 0 0px 0 #aaa, 0 0px 0px rgba(0,0,0,.1), 0 0 0px rgba(0,0,0,.1), 0 0px 0px rgba(0,0,0,.3), 0 0px 0px rgba(0,0,0,.2), 0 0px 10px rgba(0,0,0,.25), 0 0px 0px rgba(0,0,0,.2), 0 0px 0px rgba(0,0,0,.15), 0px 0px 0px rgba(206,89,55,0)',
      transition: { type: 'tween', ease: 'easeIn' },
    },
  },
  buttonVariants: {
    popOut: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 50 },
  },
  imageVariants: {
    popOut: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: 180 },
  },
};

export const navBarVariants = {
  navVariants: {
    visible: { ...generalOrchestration.visible },
    hidden: { ...generalOrchestration.hidden },
  },
  navItemVariants: {
    visible: { y: 0 },
    hidden: { y: -70 },
  },
};

export const authPageVariants = {
  sectionVariants: {
    popOut: { ...generalOrchestration.visible },
    hidden: { ...generalOrchestration.hidden },
  },
  formVariants: {
    up: {
      opacity: 1,
      transition: {
        ...generalOrchestration.visible,
        staggerChildren: 0.1,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        ...generalOrchestration.hidden,
        staggerChildren: 0.1,
      },
    },
  },
  inputVariants: {
    up: {
      opacity: 1,
      y: 0,
    },
    hidden: {
      opacity: 0,
      y: 60,
    },
  },
  formHeaderVariants: {
    visible: {
      opacity: 1,
      y: 0,
    },
    hidden: {
      opacity: 0,
      y: 40,
    },
  },
  errorMessageVariants: {
    visible: {
      opacity: 1,
      x: [0, 5, -5, 4, -4, 2, -2, 0],
      transition: { type: 'spring', duration: 0.2 },
    },
    hidden: {
      opacity: 0,
      x: -5,
    },
  },
  imageVariants: {
    visible: {
      x: 0,
      opacity: 1,
      transition: { delay: 0.3, duration: 0.2 },
    },
    hidden: { x: 100, opacity: 0 },
    transition: { delay: 0.3, duration: 0.2 },
  },
  switchTextVariants: {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 40 },
  },
};

export const loadingCompVariants = {
  overlayVariants: {
    visible: { ...generalOrchestration.visible },
    hidden: { ...generalOrchestration.hidden, opacity: 0 },
  },
  spinnerVariants: {
    visible: { scale: 1, opacity: 1 },
    hidden: { scale: 0, opacity: 0 },
  },
};

export const notificationCompVariants = {
  notificationStoreVariant: {
    visible: {
      ...generalOrchestration.visible,
      transitionEnd: { zIndex: 999999 },
    },
    hidden: {
      ...generalOrchestration.hidden,
      opacity: 0,
      transitionEnd: { zIndex: -11111 },
    },
  },
  notificationItemVariant: {
    visible: {
      opacity: 1,
      x: 0,
    },
    hidden: {
      opacity: 0,
      x: 150,
    },
  },
};
