import { Table } from '@app/database/common';
import BaseModel from './__base';
import jsonSchema from './json-schemas/subscribe-type.schema';

class SubscribeType extends BaseModel {
  static get tableName() {
    return Table.SUBSCRIBE_TYPE;
  }

  static get jsonSchema() {
    return jsonSchema;
  }

  static get relationMappings() {
    return {};
  }
}

export default SubscribeType;
