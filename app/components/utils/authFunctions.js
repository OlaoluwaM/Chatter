'use strict';
import { Auth } from 'aws-amplify';
import { responseWrapper } from './helpers';

const passwordPatterRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}/
);

export async function signUp(formData) {
  const { username, password, email } = formData;
  try {
    const user = await Auth.signUp({
      username,
      password,
      attributes: {
        email,
      },
    });
    console.log({ user });
    return responseWrapper('success', user);
  } catch (error) {
    console.error(`An error occurred signing you up. ${error}`);
    return responseWrapper('error', error);
  }
}

export async function signIn(formData) {
  const { username, password } = formData;
  try {
    const user = await Auth.signIn(username, password);
    console.log(user);
    return responseWrapper('success', user);
  } catch (error) {
    console.error(`An error occurred logging you in. ${error}`);
    return responseWrapper('error', error);
  }
}

export async function signOut() {
  try {
    await Auth.signOut();
    return responseWrapper('success', 'You have been logged Out');
  } catch (error) {
    console.error(`An error occurred signing you out. ${error}`);
    return responseWrapper('error', error);
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
};
