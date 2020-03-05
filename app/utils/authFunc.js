import { strongRegex } from './helper';

/**
 *
 * @param {{}} data - Form data
 * @returns {{}}
 */

export function handleSignUp(data) {
  const users = JSON.parse(localStorage.getItem('Users')) || [];
  const { name, password, color } = data;

  data['loggedIn'] = true;
  const { loggedIn } = data;
  users.push({ name, password, color, loggedIn });

  localStorage.setItem('Users', JSON.stringify(users));
  sessionStorage.setItem('CurrentUser', JSON.stringify(data));
  return { user: name, color, authed: true };
}

/**s
 *
 * @param {{}} data - Form data
 * @returns {{}}
 *
 */

export function handleLogin(data) {
  const users = JSON.parse(localStorage.getItem('Users'));
  const { name, password, color } = data;

  const userData = users.find(
    ({ name: DBusername, password: DBpassword }) =>
      name === DBusername && password === DBpassword
  );

  let index = users.indexOf(userData);
  userData.color = color;
  updateUserMessageAvatar(name, color);

  userData.loggedIn = true;
  users.splice(index, 1, userData);
  localStorage.setItem('Users', JSON.stringify(users));
  sessionStorage.setItem('CurrentUser', JSON.stringify(userData));

  return { user: name, color, authed: true };
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
    ({ name: DBusername, password: DBpassword }) =>
      username === DBusername && password === DBpassword
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

// ----------------------------------------------------------------------------

/**
 *
 * @param {string} user - User's name
 * @param {string} newColor - User's new avatar color
 */

function updateUserMessageAvatar(user, newColor) {
  if (!JSON.parse(localStorage.getItem(`${user}M`))) return;
  const messages = JSON.parse(localStorage.getItem(`${user}M`));

  const updatedMessages = messages.map(obj => {
    obj.color = newColor;
    return obj;
  });

  localStorage.setItem(`${user}M`, JSON.stringify(updatedMessages));
}

/**
 *
 * @param {{}} data
 * @param {string} avatarColor
 * @returns {string}
 */

export function setAvatarColor(data, avatarColor) {
  const users = JSON.parse(localStorage.getItem('Users')) || [];
  const existingUser =
    users.length > 0 ? users.find(({ name }) => name === data.name) : false;
  if (existingUser) {
    const { color } = existingUser;
    return avatarColor === '#7339ac' ? color : avatarColor;
  } else {
    return avatarColor;
  }
}
