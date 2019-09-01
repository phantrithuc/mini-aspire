import React from 'react';
import { Modal, Form, Input, Alert, Row, Select, Checkbox } from 'antd';
import { Form as FinalForm, Field } from 'react-final-form';
import * as Yup from 'yup';
import { validate, validateStatus } from 'utils/validation';
import { RepaymentMethods } from 'const/enums';
import { FloatRightButton } from 'components';

const { Option } = Select;
const validationSchema = Yup.object({
  title: Yup.string('Enter loan title').required('Title is required')
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
    <Form.Item
      label="Title"
      validateStatus={validateStatus(touched.firstName, errors.firstName)}
      help={touched.firstName && errors.firstName}
    >
      <Field name="title">
        {({ input, meta }) => (
          <Input type="text" placeholder="Title" {...input} />
        )}
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

const LoanCreateComponent = ({ handleSubmit, handleCancel, editingUser }) => (
  <Modal
    title="Create Loan"
    visible={editingUser !== null}
    footer={null}
    closable={true}
    onCancel={handleCancel}
  >
    <FinalForm
      render={props => <LoanCreateForm {...props} />}
      validate={values => validate(values, validationSchema)}
      onSubmit={handleSubmit}
      initialValues={editingUser}
    />
  </Modal>
);

export default LoanCreateComponent;
