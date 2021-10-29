import path from 'path';
import { Model } from 'objection';
import { Table } from '@app/database/common';
import BaseModel from './__base';
import jsonSchema from './json-schemas/trigger.schema';

class Trigger extends BaseModel {
  static get tableName() {
    return Table.TRIGGER;
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
          from: `${Table.TRIGGER}.shopId`,
          to: `${Table.SHOP}.id`
        }
      }
    };
  }
}

export default Trigger;
