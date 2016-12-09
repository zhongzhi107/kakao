import fs from 'fs';
import path from 'path';
import Koa from 'koa';
import Router from 'koa-router';
import importDir from 'import-dir';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import morgan from 'koa-morgan';
import FileStreamRotator from 'file-stream-rotator';
// import {capitalize} from 'lodash';
import {prefix, port} from './config';
import crud from './utils/crud';

// webserver端口
const PORT = port;

const router = new Router({prefix});
const routes = importDir('./routes');
console.log(routes);
Object.keys(routes).forEach((name) => routes[name](router));
crud(router, {
  patterns: ['**/*.js', '!base.js'],
  // cwd: './models',
});

const logDirectory = path.join(process.cwd(), 'log');
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// create a rotating write stream
const accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: logDirectory + '/access-%DATE%.log',
  frequency: 'daily',
  verbose: false,
});

const app = new Koa();
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
