import { setIn } from 'final-form';

export const validate = async (values, schema) => {
  if (typeof schema === 'function') {
    schema = schema();
  }

  try {
    await schema.validate(values, { abortEarly: false });
  } catch (e) {
    return e.inner.reduce((errors, error) => {
      return setIn(errors, error.path, error.message);
    }, {});
  }
};

export const validateStatus = (touched, error) => (
    touched && error ? 'error' : 'success'
);