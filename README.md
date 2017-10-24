# A+ Forms JSON Schema Validator

This a plugin for the [A+ forms](https://github.com/MadRabbit/a-plus-forms)
that enables JSON schemas based forms validation.

## Installation

```
npm install a-plus-forms
npm install a-plus-forms-json-validator
```

## Usage

```js
import { Form, ValidatorProvider, EmailInput, PasswordInput } from 'a-plus-forms';
import Validator from 'a-plus-forms-json-validator';

const schema = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string' }
  },
  required: ['email', 'password']
};

const SignInForm = ({ onSubmit }) =>
  <ValidatorProvider validator={Validator}>
    <Form schema={schema} onSubmit={onSubmit}>
      <EmailInput name="username" label="Username" />
      <PasswordInput name="password" label="Password" />
    </Form>
  </ValidatorProvider>;
```

The `ValidatorProvider` doesn't have to be right next to the `Form`. The best
practice is to place it next to your redux store provider or such, at the app
root scope level.

## Copyright & License

All code in this repo is released under the terms of the MIT license.
Copyright (C) 2017 Niklay Nemshilov
