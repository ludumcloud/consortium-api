let PostgressConnectionStringParser = require('pg-connection-string');

const runningLocal = Boolean(process.env.LOCAL);

const type = runningLocal ? 'sqlite' : 'postgres';
let database = runningLocal ? './db.sqlite' : 'consortium';

let host = 'localhost';
let port = 5432;
let username = 'test';
let password = 'test';

if (process.env.DATABASE_URL) {
  const connectionOptions = PostgressConnectionStringParser.parse(
    process.env.DATABASE_URL
  );
  host = connectionOptions.host;
  port = connectionOptions.port;
  username = connectionOptions.user;
  password = connectionOptions.password;
  database = connectionOptions.database;
}

module.exports = {
  type: type,
  host: host,
  port: port,
  username: username,
  password: password,
  database: database,
  synchronize: true,
  logging: false,
  entities: ['dist/models/**/*.js'],
  migrations: ['dist/migration/**/*.js'],
  subscribers: ['dist/subscriber/**/*.js'],
  cli: {
    entitiesDir: 'src/models',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber'
  }
};
