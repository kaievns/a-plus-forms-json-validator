import Djv from 'djv';
import humanize from '../src/humanizer';

describe('Djv errors humanizer', () => {
  const schema = {
    properties: {
      name: { type: 'string', maxLength: 8 },
      info: {
        type: 'object',
        properties: {
          age: { type: 'integer', maximum: 100 },
          name: {
            type: 'object',
            properties: {
              first: { type: 'string' },
              last: { type: 'string' }
            },
            required: ['first', 'last']
          }
        },
        required: ['age']
      },
      email: { type: 'string', format: 'email' },
      list: {
        type: 'array',
        additionalProperties: false,
        items: {
          type: 'object',
          properties: {
            size: { type: 'string', enum: ['S', 'M', 'L'] }
          },
          required: ['size']
        }
      }
    },
    required: ['name'],
    id: 'floobtob'
  };

  const badData = {
    name: 'Super Nikolay',
    info: { age: 666, name: { last: false } },
    list: [{}, { size: 'S' }, { size: 'blah' }],
    email: 'blah!'
  };

  it('converst the errors alright', () => {
    const validator = new Djv().addSchema({ schema });
    validator(badData);
    expect(humanize(validator.errors)).to.eql({
      name: 'must be less than 8 characters long',
      email: 'must be a valid email',
      list: {
        0: { size: 'is required' },
        2: { size: 'is not acceptable' }
      },
      info: {
        age: 'must be less than or equal to 100',
        name: {
          first: 'is required',
          last: 'must be a string'
        }
      }
    });
  });
});
