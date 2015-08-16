'use strict';

export default {
  db: 'mongodb://localhost:27017/test',

  log4js: {
    appenders: [
      {
        type: 'dateFile',
        filename: 'logs/access.log',
        pattern: '-yyyy-MM-dd.log',
        alwaysIncludePattern: true,
        category: 'access',
        layout: {
          type: 'pattern',
          pattern: '[%d{ISO8601}] %m%n'
        }
      }
    ]
  }

};
