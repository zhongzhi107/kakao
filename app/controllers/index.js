/**
 * Homepage router module.
 * @module app/controllers/index
 */
'use strict';

import mongoose from 'mongoose';
import '../models/Article';
import {add} from '../../lib/utils';

/** homepage router */
export default (router) => {
  router.get('/', function* () {
    let Article = mongoose.model('Article');
    let a = yield Article.find();
    console.log(a, add(1,2,3));

    var kitty = new Article({
      title: 'aaa11',
      body: 'bbb11'
    });
    try {
      yield kitty.save();
    } catch (e) {
      console.log(e);
    }

    // Render jade template
    // this.render('index');

    // Response JSON
    this.body = a;
  });
};
