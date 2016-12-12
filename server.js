import fs from 'fs';
import path from 'path';
import Koa from 'koa';
import Router from 'koa-router';
import importDir from 'import-dir';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import qs from 'koa-qs';
import morgan from 'koa-morgan';
import FileStreamRotator from 'file-stream-rotator';
// import {capitalize} from 'lodash';
import {prefix, port, logDirectory} from './config';
import crud from './utils/crud';
import logger from './utils/logger';

logger.info('Hello');

// webserver端口
const PORT = port;

const router = new Router({prefix});
const routes = importDir('./routes');
Object.keys(routes).forEach((name) => routes[name](router));
crud(router, {
  patterns: ['**/*.js', '!base.js'],
  // cwd: './models',
});

const logDir = path.join(process.cwd(), logDirectory);
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// create a rotating write stream
const accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: logDir + '/access-%DATE%.log',
  frequency: 'daily',
  verbose: false,
});

const app = new Koa();
qs(app);
app.use(morgan('combined', {stream: accessLogStream}));
app.use(bodyParser());
app.use(json({pretty: true}));
app.use(router.routes());

// console.log(router);

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }

  console.log('✅ koa listening on port %s', PORT);
});
