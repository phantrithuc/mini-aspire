import React from 'react';
import { shallow } from 'enzyme';
import { useDispatch } from 'react-redux';
import { applyApiService } from 'services/apiService';
import { submitLoan, repay } from 'services/loanService';
import LoanTableContainer from './LoanTableContainer';
import { FORM_ERROR } from 'final-form';

jest.mock('react-redux');
jest.mock('services/apiService');
jest.mock('services/loanService');

describe('LoanTableContainer', () => {
  const loans = [{ loan: 'loan' }];
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
});
