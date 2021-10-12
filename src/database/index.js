import log from '@app/utils/log';
import { knex, Table, transaction } from './common';

let tracingEnabled = false;
function enableTracing() {
  if (!tracingEnabled) {
    knex.on('query', ({ sql, bindings }) => log.trace(sql, bindings));
  }
  tracingEnabled = true;
}

export default {
  knex,
  enableTracing,
  transaction,
  Table
};
