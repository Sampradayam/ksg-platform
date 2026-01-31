import pgPromise from 'pg-promise';

const pgp = pgPromise();
const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'app_db',
  user: 'postgres',
  password: 'password'
});

export default {
  db,
  transaction: (fn) => db.tx(fn)
};
