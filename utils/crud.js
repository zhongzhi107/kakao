import path from 'path';
import pluralize from 'pluralize';
import {format} from 'util';
import glob from 'packing-glob';
import assign from 'object-assign';

export default (router, options) => {
  const verbs = [
    {
      method: 'GET',
      urls: ['%s', '%s/:id'],
    },
    {
      method: 'POST',
      urls: ['%s'],
    },
    {
      method: 'PUT',
      urls: ['%s/:id'],
    },
    {
      method: 'DELETE',
      urls: ['%s/:id'],
    },
  ];

  const patterns = options.patterns || ['**/*.js'];
  delete options.patterns;
  options = assign({cwd: './models'}, options);

  glob(patterns, options)
    .map((item) => path.basename(item, '.js'))
    .forEach((endpoint) => {
      ['GET', 'POST', 'PUT', 'DELETE'].forEach((method) => {
        verbs
          .find((item) => item.method === method)
          .urls
          .map((item) => format(item, pluralize(endpoint)))
          .forEach((item) => {
            let found = router.stack.some(
              (stack) => stack.path === item &&
              stack.methods.indexOf(method) > -1
            );
            if (!found) {
              let verb = method.toLowerCase();
              let Model = require(path.resolve('models', endpoint));
              router[verb](`/${item}`, require(`./${verb}`)(new Model));
            }
          });
      });
    });
};
