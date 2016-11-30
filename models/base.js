import knex from 'knex';
import bookshelf from 'bookshelf';
import modelBase from 'bookshelf-modelbase';
import knexfile from '../knexfile';

const NODE_ENV = process.env.NODE_ENV || 'production';
const knexInstance = knex(knexfile[NODE_ENV]);
const base = bookshelf(knexInstance);
base.plugin(modelBase.pluggable);
base.plugin('pagination');

export default base;
export const k = knexInstance;
