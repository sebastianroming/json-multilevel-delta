'use strict';
/* eslint-disable array-callback-return, guard-for-in */

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

module.exports = (obj1, obj2) => {
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
