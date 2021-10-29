import path from 'path';
import { Model } from 'objection';
import { Table } from '@app/database/common';
import BaseModel from './__base';
import jsonSchema from './json-schemas/subscribe.schema';

class Subscribe extends BaseModel {
  static get tableName() {
    return Table.SUBSCRIBE;
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
          from: `${Table.SUBSCRIBE}.shopId`,
          to: `${Table.SHOP}.id`
        }
      },
      type: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, 'shop'),
        join: {
          from: `${Table.SUBSCRIBE}.typeId`,
          to: `${Table.SUBSCRIBE_TYPE}.id`
        }
      }
    };
  }
}

export default Subscribe;
