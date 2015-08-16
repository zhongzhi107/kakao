/**
 * 记录access.log和request.log
 * request.log是通过koa context中添加自定义属性requestLog来实现的
 *
 */
'use strict';

import log4js from 'log4js';

let wrapQuote = (s) => {
  return '"' + s + '"';
};

export default (opts) => {
  log4js.configure(opts);
  let accessLogger = log4js.getLogger('access');

  return function* (next) {
    let start = new Date();

    yield next;

    // 统计响应耗时
    var ms = new Date() - start;
    this.set('X-Response-Time', ms + 'ms');

    let req = this.request, res = this.response, originalReq = this.req;
    let reqHeader = req.header;

    let str = [
      wrapQuote(reqHeader['x-forwarded-for'] || req.ip),
      wrapQuote(this.method + ' ' + this.url + ' HTTP/' + originalReq.httpVersion),
      res.status,
      wrapQuote(reqHeader.referer || '-'),
      wrapQuote(reqHeader['user-agent']),
      wrapQuote(ms + 'ms')
    ].join(' ');

    // 写入access.log
    accessLogger.info(str);
  };
};
