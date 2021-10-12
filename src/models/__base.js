import { Model } from 'objection';
import knex from '../database/knex';
import CommonQueryBuilder from '../database/query-builder';

Model.knex(knex);

class BaseModel extends Model {
  static get QueryBuilder() {
    return CommonQueryBuilder;
  }

  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }
}

export default BaseModel;
