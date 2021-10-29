import camelCaseString from 'lodash/camelCase';
import _knex from './knex';

export function transaction(fn) {
  return _knex.transaction(fn);
}

/**
 * Run a block of code, creating a new transaction if one isn't passed
 *
 * @param opts with nullable knex transaction object
 * @param fn async function that takes a modified opts object as its only argument
 * @return {Promise<*>}
 */
export function withTransaction(opts, fn) {
  if (opts && opts.transaction) {
    return fn(opts);
  }
  return transaction((trx) => fn({ ...opts, transaction: trx }));
}

export function queryBuilder(tableName, opts) {
  const trx = opts && opts.transaction;
  const builder = trx ? trx(tableName) : _knex(tableName);
  if (opts && opts.forUpdate) {
    return builder.forUpdate();
  }
  return builder;
}

export const Table = {
  LOG: camelCaseString('logs'),
  SHOP: camelCaseString('shops'),
  THEME: camelCaseString('themes'),
  TRIGGER: camelCaseString('triggers'),
  SCHEDULE: camelCaseString('schedules'),
  SUBSCRIBE: camelCaseString('subscribes'),
  SUBSCRIBE_TYPE: camelCaseString('subscribe_types')
};

export const knex = _knex;
