import lowerCaseString from 'lodash/lowerCase';
import { QueryBuilder, raw } from 'objection';

class CommonQueryBuilder extends QueryBuilder {
  whereLike(columnName, value) {
    return this.where(raw(`lower("${columnName}")`), 'like', `%${lowerCaseString(value)}%`);
  }
}

export default CommonQueryBuilder;
