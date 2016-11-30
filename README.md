# Kakao Framework

An API-driven framework for building nodejs apps, using MVC conventions. It only will provide a structure, inspired on Ruby on Rails, that will allow you to organise better your projects, initialise your own or third party libraries, call in a easy way your models, helpers, etc.

## Features

* MVC architecture project
* ES6 support
* Helpers support
* ORM, ODM or DB driver independent
* Well organized configuration files and routes

## TODO
- [ ] Log
  - [x] accessLog
  - [ ] requestLog
- [x] Router
- [ ] REST
  - [x] GET
  - [x] POST
  - [ ] PUT
  - [ ] DELETE
- [x] ORM
  - [ ] withRelated返回指定的columns
  - [ ] 自定义sql
  - [ ] joi.description()不起作用
  - [ ] schema/joi
  - [x] 分页
- [x] Debug
- [ ] Cache
- [ ] Task
- [ ] Test
- [ ] Deploy
- [ ] Daemon
- [ ] Others
  - [ ] xx

## Installation

First install [node.js](http://nodejs.org/) and [mysql](http://dev.mysql.com/downloads/mysql/). Then:

Download the project to a local folder
```
$ git clone https://github.com/zhongzhi107/kakao
```
Install dependencies
```
$ npm install
```

Start the application with one of the following:
```
$ npm start
$ npm run serve
```
By default the app tries to connect to port 3000. After starting the application you can check it at [localhost:3000](http://localhost:3000)

The url [localhost:3000](http://localhost:3000) returns the json document yielded by mongoose. This assumes that you have a connection stablished with a mongodb instance and a mongo document has already been inserted in the db.

```sh
# Start mongodb Service
$ /usr/local/mongodb/bin/mongod --dbpath=./data

# mongodb Client
$ /usr/local/mongodb/bin/mongo
```

## Overview
...

## References

- [bookshelfjs docs](http://bookshelfjs.org)
- [knexjs docs](http://knexjs.org)
