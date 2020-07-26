'use strict';
import { Auth } from 'aws-amplify';
import { generateErrorWrapper } from './helpers';

const passwordPatterRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}/
);

export async function signUp({ username, password, email }) {
  try {
    return await Auth.signUp({
      username,
      password,
      attributes: {
        email,
      },
    });
  } catch (error) {
    throw generateErrorWrapper('An error occurred signing you up.', error);
  }
}

export async function confirmSignUp({ username, code }) {
  try {
    await Auth.confirmSignUp(username, code);
  } catch (error) {
    throw generateErrorWrapper('An error occurred confirming sign up', error);
  }
}

export async function signIn({ username, password }) {
  try {
    return await Auth.signIn(username, password);
  } catch (error) {
    throw generateErrorWrapper('An error occurred logging you in', error);
  }
}

export async function signOut() {
  try {
    await Auth.signOut();
    return 'You have been logged out';
  } catch (error) {
    throw generateErrorWrapper('An error occurred signing you out.', error);
  }
}

export async function resendConfirmationCode(username) {
  try {
    await Auth.resendSignUp(username);
    return 'Code resent successfully';
  } catch (error) {
    throw generateErrorWrapper('error resending code', error);
  }
}

export const validationObj = {
  password(isLogin) {
    if (isLogin) return { required: 'Please provide your password.' };

    const formatMessage = `Your password must be a combination of numeric,uppercase, lowercase and special characters.At least on of each these components must be present.`;

    return {
      required: 'Please provide a password.',
      minLength: {
        value: 8,
        message: 'Your password must be at least 8 characters long.',
      },
      pattern: {
        value: passwordPatterRegex,
        message: formatMessage,
      },
    };
  },

  confirmPassword(passwordValue) {
    return {
      required: 'Please confirm your password.',
      validate: value => value === passwordValue,
    };
  },

  email() {
    return {
      required: 'Please provide your password.',
    };
  },

  username(isLogin) {
    if (isLogin) {
      return {
        required: 'Please provide a username.',
        minLength: {
          value: 5,
          message: 'Your username must be at least 5 characters long.',
        },
      };
    }
    return { required: 'Please provide your username.' };
  },

  confirmCode() {
    return { required: 'Please provide the code sent to your email' };
  },
};
