'use strict';

/**
 * example of rest agruments
 */
export var add = (...values) => {
  let sum = 0;

  for (let val of values) {
    sum += val;
  }

  return sum;
};
