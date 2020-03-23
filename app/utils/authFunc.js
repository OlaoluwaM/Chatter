import { strongRegex, sessionTimeout } from './helper';
import store from 'store';

/**
 *
 * @param {{}} data - Form data
 * @returns {{}}
 */

export function handleSignUp(data) {
  const users = store.get('users') ?? [];
  const { name, password } = data;

  const newUser = { name, password };
  users.push(newUser);

  store.set('users', users);
  sessionStorage.setItem('CurrentUser', name);

  return { activeUserName: name, isAuthenticated: true };
}

/**s
 *
 * @param {{}} data - Form data
 * @returns {{}}
 *
 */

export function handleLogin(data) {
  const users = store.get('users') ?? [];
  const { name, password } = data;

  const userData = users.find(
    ({ name: dbUsername, password: dbPassword }) =>
      name === dbUsername && password === dbPassword
  );

  sessionStorage.setItem('CurrentUser', name);

  return { activeUserName: name, isAuthenticated: true };
}

// Validation Functions -------------------------------------

/**
 *
 * @param {string} name - User's name, Sign Up
 * @returns {{}}
 */

function duplicateUserValidation(name) {
  const users = store.get('users') ?? [];

  if (users.some(({ name: id }) => id === name)) {
    return { text: 'User Already Exists', color: 'red' };
  } else {
    return { text: `${name} is available`, color: 'green' };
  }
}

/**
 *
 * @param {string} value - User's password, Sign Up
 * @returns {{}}
 */

function passwordEqualityValidation(value) {
  const pW1 = document.querySelector('input[name="password"]').value,
    pW2 = value;

  if (pW1 !== pW2) {
    return { text: 'Your passwords do not match', color: 'red' };
  } else {
    return { text: 'Looking Good', color: 'green' };
  }
}

/**
 *
 * @param {string} value - User's password, Sign Up
 * @returns {{}}
 */

function passwordStrengthValidation(value) {
  if (!!value.match(strongRegex)) {
    return { text: 'Strength 100% 🙌', color: 'green' };
  } else return { text: 'Weak 😒', color: 'red' };
}

/**
 *
 * @param {string} name - User's name, Login
 * @returns {{}}
 */

function validateUserExists(name) {
  const users = store.get('users') ?? [];

  if (users.length > 0 && users.find(({ name: id }) => id === name)) {
    return { text: `Welcome back ${name}`, color: 'green' };
  } else {
    return { text: 'User does not exist', color: 'red' };
  }
}

/**
 *
 * @param {{}} value - User's password, Login
 * @returns {{}}
 */

export function validateUserPasswordIntegrity(value) {
  const username = document.querySelector('input[name="name"]').value;
  const password = value;

  const users = store.get('users') ?? [];

  const userData = users.find(
    ({ name: dbUsername, password: dbPassword }) =>
      username === dbUsername && password === dbPassword
  );

  const userDataCorrect = userData !== undefined;

  if (userDataCorrect) {
    return { text: 'Correct 👍', color: 'green' };
  } else return { text: 'Incorrect', color: 'red' };
}

/**
 *
 * @param {string} name - Input field name
 * @param {string} inputValue
 * @param {boolean} isLoginForm - To know if the input if for a login or sign-up form
 * @returns {{}}
 */

export function inputValidation(name, inputValue, isLoginForm) {
  if (!inputValue || inputValue === '' || inputValue.length < 2) return;

  switch (name) {
    case 'name':
      return isLoginForm
        ? validateUserExists(inputValue)
        : duplicateUserValidation(inputValue);

    case 'password':
      return !isLoginForm
        ? passwordStrengthValidation(inputValue)
        : validateUserPasswordIntegrity(inputValue);

    case 'confirmPassword':
      return !isLoginForm && passwordEqualityValidation(inputValue);
  }
}
