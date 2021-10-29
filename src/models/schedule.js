import path from 'path';
import { Model } from 'objection';
import { Table } from '@app/database/common';
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
      theme: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, 'shop'),
        join: {
          from: `${Table.SCHEDULE}.themeId`,
          to: `${Table.THEME}.id`
        }
      }
    };
  }
}

export default Schedule;
