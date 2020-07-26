import React from 'react';

export const CurrentUserContext = React.createContext();
export const NotificationContext = React.createContext();

const notificationColors = {
  success: '#2cb67d',
  error: '#d9534f',
  info: '#94a1b2',
  warning: '#FFDB24',
};

// TODO refactor so it is easier to switch between light and dark modes
export const themeObj = {
  black: '#16161a',
  blackLighter: '#242629',
  blackDarker: '#010101',
  baseColor: '#7f5af0',
  white: '#fffffe',
  gray: '#94a1b2',
  grayLight: '#D4C7FA',
  accentColor: '#2cb67d',
  notificationColors,
};
// export const themeObj
