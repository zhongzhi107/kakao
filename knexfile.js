module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: process.env.MYSQL_HOST || 'localhost',
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || 'kakao',
      port: 3306,
      charset: 'utf8',
      timezone: 'UTC',
      // debug: true,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'migrations',
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
  production: {},
};
