import store from 'store';
import { generateRandomId, strongRegex } from './helper';

const ERROR_COLOR = 'rgba(240, 20, 20, 0.9)';
const SUCCESS_COLOR = 'rgba(40, 210, 40, .9)';

/**
 *
 * @param {{}} data - Form data
 * @returns {{}}
 */

export function handleSignUp(data) {
  const users = store.get('users') ?? [];
  const { username, password } = data;
  const id = generateRandomId();

  const newUser = { username, password, id };
  users.push(newUser);

  store.set('users', users);
  sessionStorage.setItem('CurrentUser', username);

  console.log(users);
  return { activeUserName: username, isAuthenticated: true };
}

/**s
 *
 * @param {{}} data - Form data
 * @returns {{}}
 *
 */

export function handleLogin({ username }) {
  sessionStorage.setItem('CurrentUser', username);
  return { activeUserName: username, isAuthenticated: true };
}

// Validation Functions -------------------------------------

/**
 *
 * @param {string} name - User's name, Sign Up
 * @returns {{}}
 */

function duplicateUserValidation(username) {
  const users = store.get('users') ?? [];

  if (users.some(({ username: id }) => id === username)) {
    return { text: 'User Already Exists', color: ERROR_COLOR, type: 'error' };
  } else {
    return {
      text: `${username} is available`,
      color: SUCCESS_COLOR,
      type: 'success',
    };
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
    return {
      text: 'Your passwords do not match',
      color: ERROR_COLOR,
      type: 'error',
    };
  } else {
    return { text: 'Looking Good', color: SUCCESS_COLOR, type: 'success' };
  }
}

/**
 *
 * @param {string} value - User's password, Sign Up
 * @returns {{}}
 */

function passwordStrengthValidation(value) {
  if (!!value.match(strongRegex)) {
    return { text: 'Strength 100% 🙌', color: SUCCESS_COLOR, type: 'success' };
  } else return { text: 'Weak 😒', color: ERROR_COLOR, type: 'error' };
}

/**
 *
 * @param {string} name - User's name, Login
 * @returns {{}}
 */

function validateUserExists(username) {
  const users = store.get('users') ?? [];

  if (users.length > 0 && users.find(({ username: id }) => id === username)) {
    return {
      text: `Welcome back ${username}`,
      color: SUCCESS_COLOR,
      type: 'success',
    };
  } else {
    return { text: 'User does not exist', color: ERROR_COLOR, type: 'error' };
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
    return { text: 'Correct 👍', color: SUCCESS_COLOR, type: 'success' };
  } else return { text: 'Incorrect', color: ERROR_COLOR, type: 'error' };
}

/**
 * Checks whether inputted url is valid and points to an image
 * @param {string} value - url
 * @returns {{}}
 */

function urlValidator(value) {
  const regex = new RegExp(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/, 'i');
  const isValid = regex.test(value);

  if (isValid) {
    return { text: 'Valid url', color: SUCCESS_COLOR, type: 'success' };
  } else return { text: 'Invalid url', color: ERROR_COLOR, type: 'error' };
}

export function updateUserProfile(formData, sb) {
  const { currentUser } = sb;
  const { nickname } = currentUser;

  const users = store.get('users');
  const activeUser = users.find(({ username }) => username === nickname);

  const { newPassword, newUsername, profileUrl, profileFile } = formData;
  const { name: fileImage } = profileFile;

  activeUser['password'] = newPassword ?? activeUser.password;
  activeUser['username'] = newUsername ?? activeUser.username;

  if (fileImage) {
    console.log('updated with file');
    sb.updateCurrentUserInfoWithProfileImage(
      newUsername,
      fileImage,
      handleSbResponse
    );
  } else {
    console.log('updated with url');
    sb.updateCurrentUserInfo(newUsername, profileUrl, handleSbResponse);
  }

  console.log(activeUser);
  store.set('users', users);
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
    case 'username':
    case 'newUsername':
      return isLoginForm
        ? validateUserExists(inputValue)
        : duplicateUserValidation(inputValue);

    case 'password':
    case 'newPassword':
      return !isLoginForm
        ? passwordStrengthValidation(inputValue)
        : validateUserPasswordIntegrity(inputValue);

    case 'confirmPassword':
      return !isLoginForm && passwordEqualityValidation(inputValue);

    case 'profileUrl':
      return urlValidator(inputValue);
  }
}
