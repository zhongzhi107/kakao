import knex from 'knex';
import bookshelf from 'bookshelf';
import modelBase from 'bookshelf-modelbase';
import cascadeDelete from 'bookshelf-cascade-delete';
import {knexfile} from '../config';

const base = bookshelf(knex(knexfile));

// 让 Model 具有时间戳、数据校验和部分CURD功能
base.plugin(modelBase.pluggable);

// 让 Model 具有分页功能
base.plugin('pagination');

// 让 Model 具有删除关联数据功能
base.plugin(cascadeDelete);

// 外部可以base.knex取到knex client
export default base;
