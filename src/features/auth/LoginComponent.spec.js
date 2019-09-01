import React from 'react';
import { shallow } from 'enzyme';
import LoginComponent from './LoginComponent';

describe('LoginComponent', () => {
  const loginFormProps = { touched: {}, errors: {} };
  const setup = (props = {}, formProps = loginFormProps) => {
    const wrapper = shallow(<LoginComponent {...props}></LoginComponent>);
    const loginForm = shallow(
      wrapper
        .find('ReactFinalForm')
        .props()
        .render(formProps)
    );
    return { wrapper, loginForm };
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
    loginFormProps.invalid = true;
    loginFormProps.dirtySinceLastSubmit = false;
    const { loginForm } = setup(null, loginFormProps);
    expect(
      loginForm.find('Button[htmlType="submit"]').props().disabled
    ).toEqual(true);
  });
  it('should enable submit button when Form is changed and valid', () => {
    loginFormProps.invalid = false;
    loginFormProps.dirtySinceLastSubmit = false;
    const { loginForm } = setup(null, loginFormProps);
    expect(
      loginForm.find('Button[htmlType="submit"]').props().disabled
    ).toEqual(undefined);
  });

  it('should validate email correctly - required and email format', async () => {
    const { wrapper } = setup();
    const values = {};
    const getValidateResult = async values =>
      await wrapper
        .find('ReactFinalForm')
        .props()
        .validate(values);
    let validateResult = await getValidateResult(values);
    expect(validateResult.email).toEqual('Email is required');

    values.email = 'wrongEmail';
    validateResult = await getValidateResult(values);

    expect(validateResult.email).toEqual('Enter a valid email');
    values.email = 'correct.email@aspire.com';

    validateResult = await getValidateResult(values);
    expect(validateResult.email).toEqual(undefined);
  });

  it('should validate password correctly - required and length >= 8', async () => {
    const { wrapper } = setup();

    const getValidateResult = async values =>
      await wrapper
        .find('ReactFinalForm')
        .props()
        .validate(values);

    const values = { email: 'correct.email@aspire.com', password: '1234567' };
    let validateResult = await getValidateResult(values);
    expect(validateResult.password).toEqual(
      'Password must contain atleast 8 characters'
    );

    values.password = '';
    validateResult = await getValidateResult(values);
    expect(validateResult.password).toEqual('Enter your password');

    values.password = 'password';
    validateResult = await getValidateResult(values);
    expect(validateResult).toEqual(undefined);
  });
});
