import knex from 'knex';
import bookshelf from 'bookshelf';
import modelBase from 'bookshelf-modelbase';
import {db} from '../config';

const base = bookshelf(knex(db));
base.plugin(modelBase.pluggable);
base.plugin('pagination');

export default base;
