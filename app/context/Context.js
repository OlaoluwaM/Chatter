import React from 'react';

export const AuthContext = React.createContext();
export const AuthProvider = AuthContext.Provider;

export const ChatContext = React.createContext();
export const ChatProvider = ChatContext.Provider;

// Theme

export const themeObj = {
  primaryColor: '#ffffff',
  primaryColorDark: '#EEEFEF',
  secondaryColor: '#5e0bdc',
  secondaryColorDark: '#260458',
  black: '#222222',
};
