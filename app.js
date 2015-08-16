/**
 * @file App enter
 * @author Zhongzhi<zhong.zhi@163.com>
 */
'use strict';

import koa from 'koa';
import logger from './config/middlewares/koa-log4js';
import compose from 'koa-compose';
import compress from 'koa-compress';
import json from 'koa-json';
import jade from 'koa-jade';
import Router from 'koa-router';
import requireAll from 'require-all';
import mongoose from 'mongoose';
import config from './config/config';
//import 'models/article';

// 递归添加路由配置
let setRoutes = (map, router) => {
  Object.keys(map).forEach(key => {
    let action = map[key];
    switch (typeof action) {
      case 'function':
        action(router);
        break;
      case 'object':
        setRoutes(action, router);
        break;
    }
  });
};

// Connect to mongodb
let connect = () => {
  let options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect(config.db, options);
};

// Const
const PORT = process.env.PORT || 3000;
const DEV = process.env.NODE_ENV === 'development';

connect();
mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

// 初始化路由
let router = new Router();
let controllers = requireAll(__dirname + '/app/controllers');
setRoutes(controllers, router);

let jadeMiddleware = jade.middleware({
  viewPath: __dirname + '/app/views',
  pretty: DEV
});

// 初始化应用程序
let app = koa();
let all = compose([
  logger(config.log4js),
  compress(),
  jadeMiddleware,
  json({pretty: DEV}),
  router.routes()
]);

app.name = 'kakao';
app.use(all);

// Start Server
app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }

  if (DEV) {
    console.log('koa listening on port %s', PORT);
  }
});
