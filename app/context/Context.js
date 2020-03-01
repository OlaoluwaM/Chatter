import React from 'react';

export const AuthContext = React.createContext();
export const AuthProvider = AuthContext.Provider;

export const ChatContext = React.createContext();
export const ChatProvider = ChatContext.Provider;

// Theme

export const themeObj = {
  main: '#ffffff',
  whiteShade2: '#DFE4EB',
  sub: '#5e0bdc',
  darkSub: '#4909aa',
  black: '#222222',
};
