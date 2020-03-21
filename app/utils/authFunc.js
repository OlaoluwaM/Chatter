import { strongRegex, hash } from './helper';

/**
 *
 * @param {{}} data - Form data
 * @returns {{}}
 */

export function handleSignUp(data) {
  const users = JSON.parse(localStorage.getItem('Users')) || [];
  const { name, password } = data;

  data['loggedIn'] = true;
  data['Id'] = hash(name).toString(16);

  const { loggedIn, Id } = data;
  users.push({ name, password, Id, loggedIn });

  localStorage.setItem('Users', JSON.stringify(users));
  sessionStorage.setItem('CurrentUser', JSON.stringify(data));

  return { activeUserName: name, activeUserId: Id, isAuthenticated: true };
}

/**s
 *
 * @param {{}} data - Form data
 * @returns {{}}
 *
 */

export function handleLogin(data) {
  const users = JSON.parse(localStorage.getItem('Users'));
  const { name, password } = data;

  const userData = users.find(
    ({ name: dbUsername, password: dbPassword }) =>
      name === dbUsername && password === dbPassword
  );

  let index = users.indexOf(userData);

  userData.loggedIn = true;
  users.splice(index, 1, userData);

  localStorage.setItem('Users', JSON.stringify(users));
  sessionStorage.setItem('CurrentUser', JSON.stringify(userData));

  return { activeUserName: name, activeUserId: Id, isAuthenticated: true };
}

// Validation Functions -------------------------------------

/**
 *
 * @param {string} name - User's name, Sign Up
 * @returns {{}}
 */

function duplicateUserValidation(name) {
  const users = JSON.parse(localStorage.getItem('Users')) || [];

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
  if (value.match(strongRegex)) {
    return { text: 'Strength 100% 🙌', color: 'green' };
  } else return { text: 'Weak 😒', color: 'red' };
}

/**
 *
 * @param {string} name - User's name, Login
 * @returns {{}}
 */

function validateUserExists(name) {
  const users = JSON.parse(localStorage.getItem('Users')) || [];

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

  const users = JSON.parse(localStorage.getItem('Users')) || [];

  const userData = users.find(
    ({ name: dbUsername, password: sbPassword }) =>
      username === dbUsername && password === sbPassword
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
