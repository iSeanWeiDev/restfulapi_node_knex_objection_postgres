import path from 'path';
import { Model } from 'objection';
import { Table } from '../database/common';
import BaseModel from './__base';
import jsonSchema from './json-schemas/schedule.schema';

class Schedule extends BaseModel {
  static get tableName() {
    return Table.SCHEDULE;
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
          from: `${Table.SCHEDULE}.shopId`,
          to: `${Table.SHOP}.id`
        }
      },
      theme: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, 'theme'),
        join: {
          from: `${Table.SCHEDULE}.themeId`,
          to: `${Table.THEME}.id`
        }
      }
    };
  }
}

export default Schedule;
