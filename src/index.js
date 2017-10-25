import Ajv from 'ajv';
import humanize from './humanizer';

const EMPTY_SCHEMA = { type: 'object' };

export default class Validator {
  constructor(schema = EMPTY_SCHEMA) {
    this.schema = schema;
  }

  get schema() {
    return this._schema;
  }

  set schema(schema) {
    this._schema = schema;

    if (schema) {
      this.valid = new Ajv({ allErrors: true }).compile(schema);
    } else {
      this.valid = () => true;
    }
  }

  errorsFor(data) {
    return this.valid(data) ? null : humanize(this.valid.errors);
  }
}
