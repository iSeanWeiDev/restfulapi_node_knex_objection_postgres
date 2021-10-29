import path from 'path';
import { Model } from 'objection';
import { Table } from '@app/database/common';
import BaseModel from './__base';
import jsonSchema from './json-schemas/log.schema';

class Log extends BaseModel {
  static get tableName() {
    return Table.LOG;
  }

  static get jsonSchema() {
    return jsonSchema;
  }

  static get relationMappings() {
    return {
      shop: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, 'shop'),
        join: {
          from: `${Table.LOG}.shopId`,
          to: `${Table.SHOP}.id`
        }
      }
    };
  }
}

export default Log;
