import path from 'path';
import { Model } from 'objection';
import { Table } from '../database/common';
import BaseModel from './__base';
import jsonSchema from './json-schemas/shop.schema';

class Shop extends BaseModel {
  static get tableName() {
    return Table.SHOP;
  }

  static get jsonSchema() {
    return jsonSchema;
  }

  static get relationMappings() {
    return {
      themes: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, 'theme'),
        join: {
          from: `${Table.SHOP}.id`,
          to: `${Table.THEME}.shopId`
        }
      },
      schedules: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, 'schedule'),
        join: {
          from: `${Table.SHOP}.id`,
          to: `${Table.SCHEDULE}.shopId`
        }
      }
    };
  }
}

export default Shop;
