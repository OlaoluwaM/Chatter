/**
 *
 * @param {{}} data
 * @returns {{}}
 */

export function handleSignUp(data) {
  const users = JSON.parse(localStorage.getItem('Users')) || [];
  const { id, password, confirmPassword } = data;

  if (users.some(({ id: name }) => id === name)) {
    return { error: 'User Already Exists', for: ['id'] };
  } else if (password !== confirmPassword) {
    return { error: 'Your passwords do not match', for: ['confirmPassword'] };
  } else {
    data['loggedIn'] = true;
    let { id, password, loggedIn } = data;
    users.push({ id, password, loggedIn });

    localStorage.setItem('Users', JSON.stringify(users));
    sessionStorage.setItem('CurrentUser', JSON.stringify(data));
    return { user: id, authed: true };
  }
}

/**
 *
 * @param {{}} data
 * @returns {{}}
 *
 */

export function handleLogin(data) {
  if (JSON.parse(localStorage.getItem('Users')) === null) {
    return { error: 'User does not exist', for: ['id'] };
  }

  const { id: username, password } = data;
  const users = JSON.parse(localStorage.getItem('Users'));

  const userData = users.find(
    ({ id: DBusername, password: DBpassword }) =>
      username === DBusername && password === DBpassword
  );
  const userDataCorrect = userData !== undefined;

  if (userDataCorrect) {
    let index = users.indexOf(userData);
    userData.loggedIn = true;
    users.splice(index, 1, userData);
    localStorage.setItem('Users', JSON.stringify(users));
    sessionStorage.setItem('CurrentUser', JSON.stringify(userData));

    return { user: username, authed: true };
  } else {
    return {
      error: 'Username or Password is incorrect',
      for: ['id', 'password'],
    };
  }
}
