import React from 'react';
import { Modal, Form, Input, Alert, Row } from 'antd';
import { Form as FinalForm, Field } from 'react-final-form';
import * as Yup from 'yup';
import { validate, validateStatus } from 'utils/validation';
import { FIXED_RATE } from 'const/index';
import { FloatRightButton } from 'components';

const validationSchema = Yup.object({
  title: Yup.string('Enter loan title').required('Title is required'),
  amount: Yup.number('Enter number amount')
    .moreThan(0, 'Must be positive')
    .required('Amount is required'),
  term: Yup.number('Enter number term')
    .moreThan(0, 'Must be positive')
    .integer('Must be an integer')
    .required('Term is required')
});

const LoanCreateForm = ({
  handleSubmit,
  submitError,
  dirtySinceLastSubmit,
  touched,
  errors,
  ...rest
}) => (
  <Form onSubmit={handleSubmit} layout="vertical">
    <Alert
      message={`Fixed Rate: ${FIXED_RATE} and repay weekly`}
      type="info"
      showIcon
      banner
    />
    <Form.Item
      label="Title(demo: Success)"
      validateStatus={validateStatus(touched.title, errors.title)}
      help={touched.title && errors.title}
    >
      <Field name="title">
        {({ input, meta }) => (
          <Input type="text" placeholder="Title" {...input} />
        )}
      </Field>
    </Form.Item>
    <Form.Item
      label="Amount(demo: 8000)"
      validateStatus={validateStatus(touched.amount, errors.amount)}
      help={touched.amount && errors.amount}
    >
      <Field name="amount" type="number" parse={value => Number(value)}>
        {({ input, meta }) => <Input placeholder="Amount" {...input} />}
      </Field>
    </Form.Item>
    <Form.Item
      label="Term(number of week)(demo: 20)"
      validateStatus={validateStatus(touched.term, errors.term)}
      help={touched.term && errors.term}
    >
      <Field name="term" type="number" parse={value => Number(value)}>
        {({ input, meta }) => <Input placeholder="Term" {...input} />}
      </Field>
    </Form.Item>
    {submitError && !dirtySinceLastSubmit && (
      <Form.Item>
        <Alert message={submitError} type="error" banner />
      </Form.Item>
    )}
    <Row>
      <FloatRightButton
        disabled={
          (rest.invalid && !dirtySinceLastSubmit) ||
          rest.pristine ||
          rest.submitting
        }
        htmlType="submit"
        type="primary"
      >
        Submit
      </FloatRightButton>
    </Row>
  </Form>
);

const LoanCreateComponent = ({ handleSubmit, handleCancel, creatingLoan }) => (
  <Modal
    title="Create Loan"
    visible={creatingLoan !== null}
    footer={null}
    closable={true}
    onCancel={handleCancel}
  >
    <FinalForm
      render={props => <LoanCreateForm {...props} />}
      validate={values => validate(values, validationSchema)}
      onSubmit={handleSubmit}
      initialValues={creatingLoan}
    />
  </Modal>
);

export default LoanCreateComponent;
