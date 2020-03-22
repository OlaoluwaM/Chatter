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

export const debounce = (func, ms = 0) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), ms);
  };
};

export function getContrast(hexcolor) {
  if (hexcolor.slice(0, 1) === '#') {
    hexcolor = hexcolor.slice(1);
  }

  if (hexcolor.length === 3) {
    hexcolor = hexcolor
      .split('')
      .map(function(hex) {
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
  return `_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
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

function formatDate(date) {
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

function prettyDateFormat(dateArr, removeYear = true) {
  if (removeYear) {
    dateArr.splice(3, 1, 'at');
  } else {
    dateArr.splice(3, 0, 'at');
  }

  return `Last seen ${dateArr.join(' ')}`;
}

export function formatTimeString(timeString) {
  const currentDateArr = formatDate(Date.now()).split(' ');
  const {
    '1': cMonth,
    '2': cDay,
    '3': cYear,
    '4': cTime,
    '5': cTimeOfDay,
  } = currentDateArr;

  const dateArr = formatDate(timeString).split(' ');
  const {
    '1': month,
    '2': day,
    '3': year,
    '4': time,
    '5': timeOfDay,
  } = dateArr;

  if (cYear !== year) return prettyDateFormat(dateArr, false);

  if (cMonth === month) {
    const diff = Number(cDay) - Number(day);

    if (diff === 0) {
      return `Last seen today at ${time}, ${timeOfDay}`;
    } else if (diff >= 1 && diff <= 7) {
      return `Last seen ${
        diff === 1 ? `yesterday` : `${diff} days ago`
      }, at ${time}, ${timeOfDay}`;
    } else {
      return prettyDateFormat(dateArr);
    }
  } else return prettyDateFormat(dateArr);
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
  e.preventDefault();
  document.cookie = `CurrentUserName=${activeUserName}; max-age=${sessionTimeout(
    8
  )};`;
  e.returnValue = 'Please logout before exiting the application';
  return 'Please logout before exiting the application';
}

export function extractCurrentUserFromCookie() {
  const cookie = document.cookie;
  if (!cookie) return null;

  const cookieArray = cookie.split('; ');
  const currentUserPair = cookieArray[0].split('=');
  return currentUserPair[1];
}
