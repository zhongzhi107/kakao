# Kakao

[![Build status](https://ci.appveyor.com/api/projects/status/n1s6xqxlbk9f0fgr?svg=true)](https://ci.appveyor.com/project/zhongzhi107/kakao)
[![Dependency Status](https://david-dm.org/zhongzhi107/kakao.svg)](https://david-dm.org/zhongzhi107/kakao)
[![devDependency Status](https://david-dm.org/zhongzhi107/kakao/dev-status.svg)](https://david-dm.org/zhongzhi107/kakao#info=devDependencies)

An API-driven framework for building nodejs apps, using MVC conventions. It only will provide a structure, inspired on Ruby on Rails, that will allow you to organise better your projects, initialise your own or third party libraries, call in a easy way your models, helpers, etc.

## Features

* MVC architecture project
* ES6 support
* Helpers support
* ORM, ODM or DB driver independent
* Well organized configuration files and routes

## TODO
- [x] Log
  - [x] accessLog
  - [x] requestLog
- [x] Router
- [x] REST
  - [x] GET
  - [x] POST
  - [x] PUT
  - [x] DELETE
- [x] ORM
  - [x] withRelated返回指定的columns - mask plugin
  - [x] 自定义sql
  - [x] schema/joi
  - [x] 分页
  - [x] 使用bookshelf-cascade-delete删除关联表数据，避免使用数据库外键
  - [x] 根据models自动创建CRUD路由
  - [ ] insert/update时更新关联表数据
  - [ ] joi.description()不起作用
- [x] Debug
- [ ] HTTPS support
- [ ] Cache
- [ ] Task
- [ ] Test
- [ ] Deploy
- [ ] Daemon
- [ ] Others
  - [ ] xx

## Installation

First install [node.js](http://nodejs.org/) and [mysql](http://dev.mysql.com/downloads/mysql/). Then:

1. Clone the project to local
```
$ git clone https://github.com/zhongzhi107/kakao
```

1. Install dependencies
```
$ yarn
```

1. Modify config file `config/index.js`
```
$ vi config/index.js
```

  ```js
  connection: {
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'kakao',
    port: 3306,
    charset: 'utf8',
    timezone: 'UTC',
    // debug: true,
  }
  ```

1. Migrate data
```
$ yarn run migrate:latest
```

1. Start the application
```
$ yarn start
```
By default the app tries to connect to port 3000. After starting the application you can check it at [http://localhost:3000/roles](http://localhost:3000/roles)


## Convention
> 以下是默认约定，如果不想按着默认约定编码，可以在代码中使用指定参数的方式更改

- 数据库、表应该像变量名一样，全部采用小写，但单词之间以下划线分隔，而且表名始终是复数形式的
- 文件名应该全部小写，单词之间用下划线
- 关联表名称默认为用下划线连接的被关联的两个表名，且按2个表名称的字母排序先后顺序连接
  - `users`和`posts`的关联表名称应该为`posts_users`
  - `tags`和`posts`的关联表名称应该为`posts_tags`
  - `users`和`tags`的关联表名称应该为`tags_users`
- 关联表名中关联的字段默认为 `被关联表名称的单数_id`，如 `user_id` `tag_id` `post_id`
- ...

## 改变默认约定的方法
### 改变表名称和模型名称的约定
例如：表名称是 `tb_roles`，希望模型名称是 `roles`，可以在定义模型时指定 `tableName`

```js
// models/role.js
export default class extends bookshelf.Model {
  get tableName() {
    return 'tb_roles';
  }
}
```

### 改变表名称和路由地址的约定
例如：表名称是 `tb_roles`，模型名称是 `roles`，希望创建的路由是 `/roles`，可以在创建路由时指定 `name` 参数(不指定的话，创建出来的路由会使用 `tableName`，即/tb_roles)

```js
// routes/role.js
import Role from '../models/role';
import ResourceRouter from '../utils/router';

export default ResourceRouter.define({
  collection: Role.collection(),
  name: 'roles'
});
```


## 路由
kakao能根据model自动创建RESTful路由地址

### 创建一个最简单的CRUD路由
```js
import Role from '../models/roles';
import ResourceRouter from '../utils/router';

export default ResourceRouter.define(Role.collection())
```

上面的代码会自动创建以下路由：

提交方式 | 路由 | 说明
--- | --- | ---
POST | /roles | 新建一个角色
GET | /roles | 列出所有角色
GET | /roles/:id | 获取某个指定角色的信息
PATCH | /roles/:id | 更新某个指定角色的信息
DELETE | /roles/:id | 删除某个角色

### 创建一个嵌套路由
```js
import Role from '../models/role';
import ResourceRouter from '../utils/router';

const users = ResourceRouter.define({
  // 假设在role model中已经设定了role和user的关联关系
  collection: (ctx) => ctx.state.role.users(),
  name: 'users',
  setup(router) {
    router
      .use(async (ctx, next) => {
        ctx.state.role = await Role.findById(
          ctx.params.role_id,
          {require: true}
        );
        await next();
      })
      .crud();
  },
});

export default ResourceRouter.define({
  collection: Role.collection(),
  setup(router) {
    router.crud();
    // router.create().read().update().destroy();

    // 使用嵌套路由
    router.use('/roles/:role_id(\\d+)', users.routes());
  },
});

```
上面的代码会自动创建以下路由：

 提交方式 | 路由 | 说明
---|---|---
POST|/roles|新建一个角色
GET|/roles|列出所有角色
GET|/roles/:id|获取某个指定角色的信息
PATCH|/roles/:id|更新某个指定角色的信息
DELETE|/roles/:id|删除某个指定角色的信息
POST|/roles/:role_id/users|新增一个某个指定角色的用户
GET|/roles/:role_id/users|列出某个指定角色的所有用户
GET|/roles/:role_id/users/:user_id|列出某个指定角色的指定用户
PATCH|/roles/:role_id/users/:user_id|修改某个指定角色的指定用户
DELETE|/roles/:role_id/users/:user_id|删除某个指定角色的指定用户

## API支持的querystring
- 查询类
  - http://localhost/roles?where=id&where=>&where=10
  - http://localhost/roles??where[name]=sales
- 返回值类
  - 分页
    - http://localhost/roles?page=1&page_size=15
  - 自定义返回字段
    - http://localhost/roles?mask=custom
    - http://localhost/roles?mask=id,name
  - 返回关联模型数据
    - http://localhost/roles?withRelated=users
  - 排序
    - http://localhost/roles?sort=created_at&direction=DESC

### mask 的用法
mask 可以指定返回的记录中包含哪些字段，这样做有2点好处：
- 减少不必要的数据传输，减少带宽和流量的消耗
- 保护数据表中的敏感字段，如 `password` 字段

mask 有2种使用方式：
- 在模型中定义 mast 属性
  ```js
  class Role extends bookshelf.Model {
    static masks = {
      // 注册 custom1 mask
      custom1: 'id,name',
      // 注册 custom2 mask
      custom2: 'name,users(title,body)'
    }

    get tableName() {
      return 'roles';
    }

    users() {
      return this.hasMany(User);
    }
  }
  ```
- 在使用 mask 方法时直接传入字段参数，这种方式更加灵活
```js
Role
  .forge({ name: 'foo' })
  .fetch({ withRelated: 'users' })
  .then(function(model) {
    console.log(model.mask('custom1'));
    // => { id: 1, name: 'foo' }
    console.log(model.mask('name,users(title,body)'));
    // => { name: 'foo', users: [{ title: 'biz', body: 'baz' }, { title: 'qux', body: 'qix' }]}
  });
```
更多信息请查看 [这里](https://github.com/seegno/bookshelf-mask)

### virtuals 的用法
virtuals 让模型可以返回一个虚拟的字段，比如，用 `firstname` 和 `lastname` 生成 `fullname`，更多信息请查看 [这里](https://github.com/tgriesser/bookshelf/wiki/Plugin:-Virtuals)
```js
export default class extends bookshelf.Model {
  get virtuals() {
    return {
      fullName: () => {
        return this.firstname + this.lastname;
      },
    };
  }
}
```

### visibility 的用法
visibility 让模型 `toJSON` 方法显示或隐藏某些字段，比如隐藏密码字段。和 mask 相比，这个设置是全局的，在模型中设置后，会影响所以的返回结果。

更多信息请查看 [这里](https://github.com/tgriesser/bookshelf/wiki/Plugin:-Visibility)

```js
export default class extends bookshelf.Model {
  /**
   * 调用 toJSON 方法时需要隐藏的字段
   */
  get hidden() {
    return ['id', 'password'];
  }

  /**
   * 调用 toJSON 方法时需要显示的字段
   */
  get visible() {
    return ['name'];
  }
}
```

### 指定 withRelated 返回的字段
```js
var db    = require( '../config' ),
    Event = require( '../models/event' );

var Events = db.Collection.extend( {
  model: Event,
}, {

  fetchEvents: function () {
    return new this().fetch( { columns: [ 'id', 'name', 'description', 'user_id' ], withRelated: [ {
      'chef': function ( qb ) {
        qb.column( 'id', 'first_name', 'last_name' );
      }}]});
  },

});

module.exports = db.collection( 'Events', Events );
```

### 指定多级 withRelated
```js
// https://github.com/INTECH-RGB/homie-dashboard
const devices = await DeviceModel
    .fetchAll({ withRelated: ['nodes', 'nodes.tags', 'nodes.properties', {
      'nodes.properties.history': function (qb) {
        qb.groupBy('property_id')
      }
}]})
```


## Overview
...

## Notes
- curl传递多个querystring参数时，`&` 前需要加 `\`，如 `curl http://localhost/roles?sort=id\&direction=desc`
- curl传递带[]参赛时，需要加上 `--globoff` 参数，如 `curl --globoff http://localhost/roles?where[name]=sales`

## References

- [bookshelfjs docs](http://bookshelfjs.org)
- [knexjs docs](http://knexjs.org)
- [Joi docs](https://github.com/hapijs/joi)
- [koa-router docs](https://github.com/alexmingoia/koa-router)
