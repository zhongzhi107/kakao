# kakao

An API-driven framework for building nodejs apps, using MVC conventions.

## Installation

First install [node.js](http://nodejs.org/) and [mongodb](http://www.mongodb.org/downloads). Then:

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
$ node --harmony server.js
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

[mongoose api docs](http://mongoosejs.com/docs/unstable/docs/)
