import winston from 'winston';
import 'winston-daily-rotate-file';
import {logDirectory} from '../config';

const transport = new winston.transports.DailyRotateFile({
  filename: 'log-',
  dirname: logDirectory,
  datePattern: 'yyyyMMdd.log',
  level: process.env.ENV === 'development' ? 'debug' : 'info',
});

export default new (winston.Logger)({
  transports: [
    transport,
  ],
});
