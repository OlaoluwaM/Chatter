import React from 'react';

export const CurrentUserContext = React.createContext();
export const NotificationContext = React.createContext();

const notificationColors = {
  success: '#2cb67d',
  error: '#d9534f',
  info: '#94a1b2',
  warning: '#FFDB24',
};

export const themeObj = {
  dark: {
    background: '#16161a',
    backgroundLighter: '#242629',
    backgroundDarker: '#010101',
    baseColor: '#7f5af0',
    whiteOrBlack: '#fffffe',
    gray: '#94a1b2',
    grayLight: '#D4C7FA',
    accentColor: '#2cb67d',
    notificationColors,
  },
  light: {
    background: '#EBEBEB',
    backgroundLighter: '#fffffe',
    backgroundDarker: '#D6D6D6',
    baseColor: '#6246ea',
    whiteOrBlack: '#16161a',
    gray: '#d1d1e9',
    grayLight: '#D4C7FA',
    accentColor: '#e45858',
    notificationColors,
  },
};
// export const themeObj
