import knex from 'knex';
import { knexSnakeCaseMappers } from 'objection';

let config;

if (global.DB_JSON) {
  config = JSON.parse(global.DB_JSON);
} else {
  config = {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      user: process.env.DB_USER
    },
    pool: {
      min: parseInt(process.env.DB_MIN_POOL || 2, 10),
      max: parseInt(process.env.DB_MAX_POOL || 10, 10)
    }
  };
}

export default knex({
  ...config,
  ...knexSnakeCaseMappers()
});
