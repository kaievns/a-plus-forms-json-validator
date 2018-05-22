import Validator from '../src';

describe('Validator', () => {
  const schema = {
    type: 'object',
    properties: {
      username: { type: 'string', format: 'email' },
      password: { type: 'string' }
    },
    required: ['username', 'password'],
    id: 'floobtob'
  };

  const validator = new Validator(schema);

  describe.only('#validate(data)', () => {
    it('returns undefined if there is no errors', () => {
      const goodData = { username: 'nikolay@rocks.com', password: 'Ba(k0n!' };
      expect(validator.errorsFor(goodData)).to.equal(null);
    });

    it('returns some errors if the data is borked', () => {
      const badData = { username: 'blah!' };
      console.log('aaaaaaaa', validator.errorsFor(badData))
      expect(validator.errorsFor(badData)).to.eql({
        username: 'must be a valid email',
        password: 'is required'
      });
    });

    it('treats empty strings as no data', () => {
      const badData = { username: '', password: '' };
      expect(validator.errorsFor(badData)).to.eql({
        username: 'is required',
        password: 'is required'
      });
    });
  });
});
