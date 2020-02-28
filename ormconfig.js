const runningLocal = Boolean(process.env.LOCAL);

const type = runningLocal ? "sqlite" : "postgres";
const database = runningLocal ? "./db.sqlite" : "consortium";

module.exports = {
    "type": type,
    "host": "localhost",
    "port": 5432,
    "username": "test",
    "password": "test",
    "database": database,
    "synchronize": true,
    "logging": true,
    "entities": [
        "dist/models/**/*.js"
    ],
    "migrations": [
        "dist/migration/**/*.js"
    ],
    "subscribers": [
        "dist/subscriber/**/*.js"
    ],
    "cli": {
        "entitiesDir": "src/models",
        "migrationsDir": "src/migration",
        "subscribersDir": "src/subscriber"
    }
};
