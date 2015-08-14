'use strict';

let env = process.env.NODE_ENV || 'development';

// Get profile configs
let profile = require('./env/' + env);

// Set common configs
let common = {
  firstName: 'joe',
  lastName: 'zhong'
};

export default Object.assign({}, common, profile);
