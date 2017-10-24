import Ajv from 'ajv';
import humanize from './humanizer';

const EMPTY_SCHEMA = { type: 'object' };

export default class Validator {
  customValidator = () => null;

  constructor(schema = EMPTY_SCHEMA) {
    this.update({ schema });
  }

  update({ validate, schema }) {
    if (schema) {
      this.schema = schema;
      this.valid = new Ajv({ allErrors: true }).compile(schema);
    } else {
      this.valid = () => true;
    }
  }

  errorsFor(data) {
    return this.valid(data) ? null : humanize(this.valid.errors);
  }
}
