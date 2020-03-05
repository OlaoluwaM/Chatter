import { filterObject } from './helper';

/**
 *
 * @param {{}} user  current user
 * @param {{}} desiredData Data to be appended to users metaData object
 * @returns {{}}
 */

export function createUserMetaData(user, desiredData) {
  const { metaData } = user;
  Object.keys(desiredData).forEach(key => {
    if (!metaData.hasOwnProperty(key) || metaData[key] !== desiredData[key]) {
      // user.createMetaData({ [key]: desiredData[key] });
      user.updateMetaData({ [key]: desiredData[key] });
    } else return;
  });
}

/**
 * Generates channel parameters from current user
 * @param {string} user
 * @returns {[]}
 */
export function createGroupParamEntries(user) {
  return [
    ['isPublic', false],
    ['isDistinct', true],
    ['isEphemeral', false],
    ['operatorId', user],
    ['name', `${user}'s channel`],
  ];
}

/**
 *
 * @param {{}} messageObj
 * @returns {{}}
 */

export function extractNeededMessageData(messageObj) {
  return filterObject(messageObj, [
    'channelUrl',
    'messageId',
    'createdAt',
    ['sender', '_sender'],
    ['text', 'message'],
  ]);
}

export function chatManagerReducer(state, action) {
  const messages = !state
    ? ''
    : state.messages === undefined
    ? []
    : state.messages;

  switch (action.type) {
    case 'New message':
      console.log(action.messages);
      messages.push(...action.messages);

      return {
        ...state,
        messages,
      };

    case 'New channel':
      return {
        ...state,
        userChannel: action.channel,
      };

    case 'New channel and message':
      messages.push(...action.messages);

      return {
        ...state,
        userChannel: action.channel,
        messages,
      };

    case 'New user':
      return {
        user: action.user,
      };

    case 'Error':
      return {
        ...state,
        error: action.error,
      };

    case 'Reset':
      return null;

    default:
      console.error('action does not exist');
      throw new Error('Action does not exist');
  }
}
