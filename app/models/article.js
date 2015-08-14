/**
 * Article model
 */
'use strict';

import mongoose from 'mongoose';

/**
 * Getters
 */
var getTags = function (tags) {
  return tags.join(',');
};

/**
 * Setters
 */
var setTags = function (tags) {
  return tags.split(',');
};

/**
 * Article Schema
 */
let Schema = mongoose.Schema;
let ArticleSchema = new Schema({
  title: {
    type: String,
    default: '',
    trim: true
  },
  body: {
    type: String,
    default: '',
    trim: true
  },
  tags: {
    type: [],
    get: getTags,
    set: setTags
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


/**
 * Validations
 */
ArticleSchema.path('title').required(true, 'Article title cannot be blank');
ArticleSchema.path('body').required(true, 'Article body cannot be blank');

/**
 * Pre-remove hook
 */

ArticleSchema.pre('remove', function (next) {
  // var imager = new Imager(imagerConfig, 'S3');
  // var files = this.image.files;
  //
  // // if there are files associated with the item, remove from the cloud too
  // imager.remove(files, function (err) {
  //   if (err) return next(err);
  // }, 'article');

  next();
});

/**
 * Statics
 */
ArticleSchema.statics = {
  test: function(cb) {
    this.find({name: 'joe111'}, cb);
  }
};

/**
 * Methods
 */
ArticleSchema.methods = {};

mongoose.model('Article', ArticleSchema);
