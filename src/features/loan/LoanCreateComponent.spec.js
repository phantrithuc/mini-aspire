import React from 'react';
import { shallow } from 'enzyme';
import LoanCreateComponent from './LoanCreateComponent';

describe('LoginComponent', () => {
  const createFormProps = { touched: {}, errors: {} };
  const setup = (props = {}, formProps = createFormProps) => {
    const wrapper = shallow(
      <LoanCreateComponent {...props}></LoanCreateComponent>
    );
    const createLoanForm = shallow(
      wrapper
        .find('ReactFinalForm')
        .props()
        .render(formProps)
    );
    return { wrapper, createLoanForm };
  };
  it('should call handleSubmit when Form is submitted', () => {
    const mockHandleSubmit = jest.fn();
    const { wrapper } = setup({ handleSubmit: mockHandleSubmit });
    wrapper
      .find('ReactFinalForm')
      .props()
      .onSubmit();
    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it('should disable submit button when Form is invalid', () => {
    createFormProps.invalid = true;
    createFormProps.dirtySinceLastSubmit = false;
    const { createLoanForm } = setup(null, createFormProps);
    expect(createLoanForm.find('[htmlType="submit"]').props().disabled).toEqual(
      true
    );
  });
  it('should enable submit button when Form is changed and valid', () => {
    createFormProps.invalid = false;
    createFormProps.dirtySinceLastSubmit = false;
    const { createLoanForm } = setup(null, createFormProps);
    expect(createLoanForm.find('[htmlType="submit"]').props().disabled).toEqual(
      undefined
    );
  });

  it('should validate email correctly - required title', async () => {
    const { wrapper } = setup();
    const values = {};
    const getValidateResult = async values =>
      await wrapper
        .find('ReactFinalForm')
        .props()
        .validate(values);
    let validateResult = await getValidateResult(values);
    expect(validateResult.title).toEqual('Title is required');
  });

  it('should validate amount correctly - number required and > 0', async () => {
    const { wrapper } = setup();

    const getValidateResult = async values =>
      await wrapper
        .find('ReactFinalForm')
        .props()
        .validate(values);

    const values = { title: 'Title', amount: -4 };
    let validateResult = await getValidateResult(values);
    expect(validateResult.amount).toEqual('Must be positive');
  });
  it('should validate term correctly - integer number required and > 0', async () => {
    const { wrapper } = setup();

    const getValidateResult = async values =>
      await wrapper
        .find('ReactFinalForm')
        .props()
        .validate(values);

    const values = { title: 'Title', amount: 4, term: 4.5 };
    let validateResult = await getValidateResult(values);
    expect(validateResult.term).toEqual('Must be an integer');
  });
});
