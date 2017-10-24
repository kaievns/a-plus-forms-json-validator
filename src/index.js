import Ajv from 'ajv';
import humanize from './humanizer';

const EMPTY_SCHEMA = { type: 'object' };

export default class Validator {
  customValidator = () => null; // eslint-disable-line

  constructor(schema = EMPTY_SCHEMA) {
    this.update({ validate: () => {}, schema });
  }

  update({ validate, schema }) {
    this.customValidator = validate;

    if (schema) {
      this.schema = schema;
      this.valid = new Ajv({ allErrors: true }).compile(schema);
    } else {
      this.valid = () => true;
    }
  }

  errorsFor(data) {
    const customErrors = this.customValidator(data);
    const schemaErrors = this.valid(data) ? null : humanize(this.valid.errors);

    return customErrors || schemaErrors ? { ...schemaErrors, ...customErrors } : null;
  }
}
