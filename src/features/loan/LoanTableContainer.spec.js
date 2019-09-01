import React from 'react';
import { shallow } from 'enzyme';
import { useDispatch } from 'react-redux';
import { Button, message } from 'antd';
import { applyApiService } from 'services/apiService';
import { submitLoan, repay } from 'services/loanService';
import LoanTableContainer from './LoanTableContainer';
import { FORM_ERROR } from 'final-form';

jest.mock('react-redux');
jest.mock('services/apiService');
jest.mock('services/loanService');
jest.mock('antd');

describe('LoanTableContainer', () => {
  const loans = [{ id: 1, repaymentAmount: 12, status: 'approved' }];
  const setup = (initialValues = loans) => {
    const mockDispatch = jest.fn();
    const mockPush = jest.fn();
    useDispatch.mockImplementation(() => mockDispatch);
    submitLoan.mockImplementation(() => {});
    repay.mockImplementation(() => {});
    const props = {
      initialValues
    };
    const wrapper = shallow(
      <LoanTableContainer {...props}></LoanTableContainer>
    );
    return { wrapper, mockDispatch, submitLoan, repay, mockPush };
  };
  it('should run pass initialValues to loans', () => {
    const { wrapper } = setup();
    expect(wrapper.find('Styled(Table)').props().dataSource).toEqual(loans);
  });
  it('should render Balance and Amount as currency', () => {
    const { wrapper } = setup();
    const repayCol = wrapper
      .find('Styled(Table)')
      .props()
      .columns.find(item => item.dataIndex === 'repaymentAmount');
    const balanceCol = wrapper
      .find('Styled(Table)')
      .props()
      .columns.find(item => item.dataIndex === 'balance');
    expect(repayCol.render(5)).toEqual('$5.00');
    expect(balanceCol.render(5)).toEqual('$5.00');
  });
  const renderRepayButton = (record, initialValues = loans) => {
    const setupResult = setup(initialValues);
    const actionCol = setupResult.wrapper
      .find('Styled(Table)')
      .props()
      .columns.find(item => item.key === 'action');
    return { repayButton: actionCol.render('', record), ...setupResult };
  };
  it('should set disabled state of Repay button is true when repaymentAmount is 0 or status is processing, otherwise it is false', () => {
    const { repayButton } = renderRepayButton({
      repaymentAmount: 0,
      status: 'approved'
    });
    expect(repayButton.props.disabled).toEqual(true);
    const repayButton2 = renderRepayButton({ status: 'processing' })
      .repayButton;
    expect(repayButton2.props.disabled).toEqual(true);
    const repayButton3 = renderRepayButton({
      repaymentAmount: 23,
      status: 'approved'
    }).repayButton;
    expect(repayButton3.props.disabled).toEqual(false);
  });
  it('should update Table datasource when repay is return successfully', async () => {
    applyApiService.mockResolvedValue({
      id: 1,
      repaymentAmount: 0,
      status: 'approved'
    });

    const { repayButton, wrapper } = renderRepayButton({
      repaymentAmount: 100,
      status: 'approved'
    });
    await repayButton.props.onClick();
    expect(wrapper.find('Styled(Table)').props().dataSource).toEqual([
      {
        id: 1,
        repaymentAmount: 0,
        status: 'approved'
      }
    ]);
  });
  it('should show message info when repay return resolved value', async () => {
    message.info = jest.fn();
    applyApiService.mockResolvedValue({
      id: 1,
      repaymentAmount: 0,
      status: 'approved'
    });
    const { repayButton } = renderRepayButton({
      title: 'Title',
      repaymentAmount: 100,
      status: 'approved'
    });
    await repayButton.props.onClick();
    expect(message.info).toBeCalledWith('Title: repaid successfully', 5);
  });
  it('should show message error when repay return rejected value', async () => {
    message.info = jest.fn();
    applyApiService.mockRejectedValue({
      message: 'Error'
    });
    const { repayButton } = renderRepayButton({
      title: 'Title',
      repaymentAmount: 100,
      status: 'approved'
    });
    await repayButton.props.onClick();
    expect(message.error).toBeCalledWith('Title: repaid error', 5);
  });
  it('should add new item to loans state when create loan is submitted and clear creatingLoan', async () => {
    applyApiService.mockResolvedValue({
      data: {
        newLoan: 'newLoan'
      }
    });
    const { wrapper } = setup();
    wrapper
      .find('Button[icon="file-add"]')
      .props()
      .onClick();
    await wrapper
      .find('LoanCreateComponent')
      .props()
      .handleSubmit({ title: 'title' });
    expect(wrapper.find('Styled(Table)').props().dataSource).toEqual([
      {
        id: 1,
        repaymentAmount: 12,
        status: 'approved'
      },
      {
        newLoan: 'newLoan'
      }
    ]);
  });
  it('should return FORM_ERROR when when create loan is failed', async () => {
    applyApiService.mockRejectedValue({ message: 'error' });
    const { wrapper } = setup();
    wrapper
      .find('Button[icon="file-add"]')
      .props()
      .onClick();
    const response = await wrapper
      .find('LoanCreateComponent')
      .props()
      .handleSubmit({ title: 'title' });
    expect(response).toEqual({ [FORM_ERROR]: 'Submit Loan error' });
  });
});
