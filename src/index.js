import Djv from 'djv';
import humanize from './humanizer';
import normalize from './normalizer';

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
      const djv = new Djv();
      djv.addSchema('test', schema);
      this.valid = data => djv.validate('test', data);
    } else {
      this.valid = () => true;
    }
  }

  errorsFor(data) {
    return this.valid(normalize(data)) ? humanize(this.valid(normalize(data))) : null;
  }
}
