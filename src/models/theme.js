import path from 'path';
import { Model } from 'objection';
import { Table } from '../database/common';
import BaseModel from './__base';
import jsonSchema from './json-schemas/theme.schema';

class Theme extends BaseModel {
  static get tableName() {
    return Table.THEME;
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
          from: `${Table.THEME}.shopId`,
          to: `${Table.SHOP}.id`
        }
      },
      schedules: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, 'schedule'),
        join: {
          from: `${Table.THEME}.id`,
          to: `${Table.SCHEDULE}.themeId`
        }
      }
    };
  }
}

export default Theme;
