import knex from 'knex';
import bookshelf from 'bookshelf';
import modelBase from 'bookshelf-modelbase';
import cascadeDelete from 'bookshelf-cascade-delete';
import knexfile from '../knexfile';

const NODE_ENV = process.env.NODE_ENV || 'production';
const knexInstance = knex(knexfile[NODE_ENV]);
const base = bookshelf(knexInstance);
base.plugin(modelBase.pluggable);
base.plugin('pagination');
base.plugin(cascadeDelete);

export default base;
export const k = knexInstance;
