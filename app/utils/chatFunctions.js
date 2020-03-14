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
    if (!metaData.hasOwnProperty(key)) {
      user.createMetaData({ [key]: desiredData[key] });
    } else if (metaData[key] !== desiredData[key]) {
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

    case 'New Chat':
      return {
        ...state,
        userChannel: 'Changing',
        messages: [],
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

export function getFriendList(user) {
  const { metaData } = user;
  const { friends } = metaData;
  return friends ? JSON.parse(friends) : [];
}

export function addFriend(friend, user) {
  const friendsArray = getFriendList(user);
  friendsArray.push(friend.userId);

  return JSON.stringify([...new Set(friendsArray)]);
}

export function removeFriend(friend, user) {
  const friendsArray = getFriendList(user).filter(
    user => user !== friend.userId
  );

  return JSON.stringify([...new Set(friendsArray)]);
}

export function handlefriendLogic(friend, user, remove = false) {
  createUserMetaData(user, {
    friends: remove ? removeFriend(friend, user) : addFriend(friend, user),
  });
  console.log(user);
  return user;
}
