import React from 'react';
import { Icon, Input, Row, Button, Form, Alert } from 'antd';
import { Form as FinalForm, Field } from 'react-final-form';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { validate, validateStatus } from 'utils/validation';
import { TitleStyled, ForgotPasswordStyled } from './AuthStyled';

const validationSchema = Yup.object({
  email: Yup.string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string('')
    .min(8, 'Password must contain atleast 8 characters')
    .required('Enter your password')
});

const LoginForm = ({
  handleSubmit,
  submitError,
  dirtySinceLastSubmit,
  touched,
  errors,
  ...rest
}) => (
  <Form onSubmit={handleSubmit} layout="vertical">
    <TitleStyled>Mini Aspire</TitleStyled>
    <Form.Item
      label="Email(demo: user@aspire.com)"
      validateStatus={validateStatus(touched.email, errors.email)}
      help={touched.email && errors.email}
    >
      <Field name="email">
        {({ input, meta }) => (
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="email"
            placeholder="Email"
            name="email"
            {...input}
          />
        )}
      </Field>
    </Form.Item>
    <Form.Item
      label="Password(demo: password)"
      validateStatus={validateStatus(touched.password, errors.password)}
      help={touched.password && errors.password}
    >
      <Field name="password">
        {({ input, meta }) => (
          <Input.Password
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Password"
            name="password"
            {...input}
          />
        )}
      </Field>
    </Form.Item>
    {submitError && !dirtySinceLastSubmit && (
      <Form.Item>
        <Alert message={submitError} type="error" banner />
      </Form.Item>
    )}
    <Row>
      <ForgotPasswordStyled>
        <Link to={`/forgot-password`} disabled={true}>
          Forgot your details?
        </Link>
      </ForgotPasswordStyled>
      <Button
        disabled={
          (rest.invalid && !dirtySinceLastSubmit) ||
          rest.pristine ||
          rest.submitting
        }
        htmlType="submit"
        type="primary"
        style={{ float: 'right' }}
      >
        Log in
      </Button>
    </Row>
  </Form>
);

const LoginComponent = props => (
  <FinalForm
    render={props => <LoginForm {...props} />}
    validate={values => validate(values, validationSchema)}
    onSubmit={props.handleSubmit}
  />
);

export default LoginComponent;
