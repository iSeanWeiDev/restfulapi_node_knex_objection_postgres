import path from 'path';
import { Model } from 'objection';
import { Table } from '../database/common';
import BaseModel from './__base';
import jsonSchema from './json-schemas/webhook.schema';

class Webhook extends BaseModel {
  static get tableName() {
    return Table.WEBHOOK;
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
          from: `${Table.WEBHOOK}.shopId`,
          to: `${Table.SHOP}.id`
        }
      }
    };
  }
}

export default Webhook;
