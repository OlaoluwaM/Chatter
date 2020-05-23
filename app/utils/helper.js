'use strict';

export function extractFormData(data) {
  const FormDataObj = Array.from(data).reduce((total, curr) => {
    const key = curr[0];
    const value = curr[1];
    total[key] = value;
    return total;
  }, {});
  return FormDataObj;
}

export function capitalize(str) {
  return str.replace(str[0], str[0].toUpperCase());
}

export const strongRegex = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
);

// export const mediumRegex = new RegExp(
//   '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
// );

export function getContrast(hexcolor) {
  if (hexcolor.slice(0, 1) === '#') {
    hexcolor = hexcolor.slice(1);
  }

  if (hexcolor.length === 3) {
    hexcolor = hexcolor
      .split('')
      .map(function (hex) {
        return hex + hex;
      })
      .join('');
  }

  // Convert to RGB value
  var r = parseInt(hexcolor.substr(0, 2), 16);
  var g = parseInt(hexcolor.substr(2, 2), 16);
  var b = parseInt(hexcolor.substr(4, 2), 16);

  // Get YIQ ratio
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;

  // Check contrast
  return yiq >= 128 ? 'black' : 'white';
}

/**
 *
 * @param {string} hex
 * @param {number} alpha
 * @returns {string}
 */

export function hexToRgb(hex, alpha = 1) {
  const { r, g, b } = {
    r: parseInt(hex.substr(1, 2), 16),
    g: parseInt(hex.substr(3, 2), 16),
    b: parseInt(hex.substr(5, 2), 16),
  };
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// export function percentageOf(value1, value2) {
//   return (value1 / value2) * 100;
// }

export function randomID() {
  return `_${Math.random().toString(36).substr(2, 9)}`;
}

export function filterObject(obj, properties) {
  return properties.reduce((acc, curr) => {
    if (Array.isArray(curr)) {
      acc[curr[0]] = obj[curr[1]];
    } else {
      acc[curr] = obj[curr];
    }
    return acc;
  }, {});
}

export function formatDate(date) {
  const dateOptions = {
    year: 'numeric',
    day: 'numeric',
    month: 'long',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
  };

  return new Intl.DateTimeFormat('default', dateOptions).format(new Date(date));
}

export function prettyDateFormat(dateArr, removeYear = true) {
  if (removeYear) {
    dateArr.splice(3, 1, 'at');
  } else {
    dateArr.splice(3, 0, 'at');
  }

  return `Last seen ${dateArr.join(' ')}`;
}

export function isColor(str) {
  const regexp = new RegExp(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'igm');
  return !!str.match(regexp);
}

export function documentVisibility() {
  let visibilityChange;
  if (typeof document.hidden !== undefined) {
    visibilityChange = 'visibilitychange';
  } else if (typeof document.msHidden !== undefined) {
    visibilityChange = 'msvisibilitychange';
  } else {
    visibilityChange = 'webkitvisibilitychange';
  }
  return visibilityChange;
}

/**
 *
 * Converts specified number in minutes to milliseconds equivalent
 * @param {number} num - number in minutes
 */
export const sessionTimeout = (num = 20) => num * 60000;

export function unloadEventListener(e) {
  const activeUserName = sessionStorage.getItem('CurrentUser');
  if (!activeUserName) return;
  document.cookie = `CurrentUserName=${activeUserName}; max-age=${sessionTimeout(
    8
  )};`;
  sessionStorage.clear();
}

export function extractCurrentUserFromCookie() {
  const cookie = document.cookie;
  if (!cookie) return null;

  const cookieArray = cookie.split('; ');
  const currentUserPair = cookieArray[0].split('=');
  return currentUserPair[1];
}

export function colorMapping(colorName) {
  const map = { red: '#ff0000', green: '#008000' };
  return map[colorName];
}

export function removeHashTag(hex) {
  return hex.replace('#', '');
}

/**
 *
 * @param {string} colorCode - color code in hex format
 * @param {number} amt - positive integer to lighten; negative integer to darken
 */

export function lightenDarkenColor(colorCode, amt) {
  let usePound = false;

  if (colorCode[0] == '#') {
    colorCode = colorCode.slice(1);
    usePound = true;
  }

  let R = parseInt(colorCode.substring(0, 2), 16);
  let G = parseInt(colorCode.substring(2, 4), 16);
  let B = parseInt(colorCode.substring(4, 6), 16);

  R = R + amt;
  G = G + amt;
  B = B + amt;

  if (R > 255) R = 255;
  else if (R < 0) R = 0;

  if (G > 255) G = 255;
  else if (G < 0) G = 0;

  if (B > 255) B = 255;
  else if (B < 0) B = 0;

  var RR = R.toString(16).length == 1 ? '0' + R.toString(16) : R.toString(16);
  var GG = G.toString(16).length == 1 ? '0' + G.toString(16) : G.toString(16);
  var BB = B.toString(16).length == 1 ? '0' + B.toString(16) : B.toString(16);

  return (usePound ? '#' : '') + RR + GG + BB;
}

export function generateRandomColor() {
  const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  return randomColor;
}

export function filterUser(list, username) {
  return list.filter(user => {
    const name = user?.nickname ?? user;
    return name !== username;
  });
}

export function hashCode(str, seed = 0) {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 =
    Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
    Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 =
    Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
    Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

export const debounce = (func, ms = 0) => {
  let timeoutId;
  return function (...args) {
    timeoutId = setTimeout(() => func.apply(this, args), ms);
  };
};

export function generateRandomId() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

function isValidImage(str) {
  return new RegExp(/\.(jpe?g|png|gif)$/, 'i').test(str);
}

export function fileInputChangeHandler(e) {
  const label = e.target.nextElementSibling;
  const initialLabelValue = label.innerText;
  const { '0': file, length } = e.target.files;

  if (length >= 1) {
    const { name } = file;
    label.innerText = isValidImage(name) ? name : 'Not a valid image file';
  } else label.innerText = initialLabelValue;

  return length >= 1;
}

export function resetInputFileValue(e) {
  const label = e.currentTarget.previousElementSibling;
  const initialLabelText = 'New profile image file';

  if (label.innerText !== initialLabelText) {
    label.innerText = initialLabelText;
  } else return;
}

export function handleSbResponse(res, err) {
  if (err) throw err;
  console.log('sb response', res);
}

export function normalize(value) {
  const replacer = (_, val) => (val === '' ? null : val);

  return JSON.parse(JSON.stringify(value, replacer));
}

export function rawDataType(value) {
  const _toString = Object.prototype.toString;
  return _toString.call(value).slice(8, -1).toLowerCase();
}
