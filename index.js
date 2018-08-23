'use strict';
/* eslint-disable array-callback-return, guard-for-in */

const _ = require('lodash.get');

const getDeepKeys = obj => {
  let keys = [];
  for (const key in obj) {
    keys.push(key);
    if (typeof obj[key] === 'object') {
      const subkeys = getDeepKeys(obj[key]);
      keys = keys.concat(subkeys.map(subkey => {
        if (typeof key !== 'object') {
          return `${key}.${subkey}`;
        }
      }));
    }
  }
  return keys;
};

const jsonMultilevelDelta = (obj1, obj2) => {
  const objects = [getDeepKeys(obj1), getDeepKeys(obj2)];
  const deltaKeys = [];

  objects.forEach((obj, idx) => {
    obj.forEach(key => {
      if (!objects[(idx === 0) ? 1 : 0].includes(key)) {
        deltaKeys.push(key);
      }
    });
  });

  return deltaKeys;
};

const stringToObj = (path, value, obj) => {
  const parts = path.split('.');
  const last = parts.pop();
  let part = null;

  while (parts.length) {
    part = parts.shift();
    if (typeof obj[part] !== 'object') {
      obj[part] = {};
    }
    obj = obj[part];
  }
  obj[last] = value;
};

module.exports = (obj1, obj2) => jsonMultilevelDelta(obj1, obj2);
module.exports.json = (obj1, obj2) => {
  const keys = jsonMultilevelDelta(obj1, obj2);

  const jsonObj = {};
  keys.forEach(key => {
    const value = (typeof _(obj1, key) === 'undefined') ? _(obj2, key) : _(obj1, key);
    stringToObj(key, value, jsonObj);
  });

  return jsonObj;
};
