import path from 'path';
import Koa from 'koa';
import importDir from 'import-dir';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import qs from 'koa-qs';
import morgan from 'koa-morgan';
import FileStreamRotator from 'file-stream-rotator';
import mkdirp from 'mkdirp';
import {port, logDirectory} from './config';
import logger from './utils/logger';

logger.info('Hello');

// 创建日志目录
const logDir = path.join(process.cwd(), logDirectory);
mkdirp.sync(logDir);

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

// 导入路由
const routes = importDir('./routes');
Object.keys(routes).map(
  (name) => app.use(routes[name].routes())
);

app.listen(port, (err) => {
  if (err) {
    throw err;
  }

  console.log('✅ koa listening on port %s', port);
});
