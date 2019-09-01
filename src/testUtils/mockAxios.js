import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
const mockUrl = 'http://mock/api';
const mocAuth = mock => {
  mock
    .onPost(`${mockUrl}/login`, {
      email: 'user@aspire.com',
      password: 'password'
    })
    .reply(200, {
      access_token: JSON.stringify({
        roles: ['user'],
        firstName: 'Neo',
        lastName: 'Smith',
        email: 'user@aspire.com',
        id: 1
      })
    });
  mock.onPost(`${mockUrl}/login`).reply(401);
};

const mockLoans = mock => {
  mock.onGet(`${mockUrl}/loans/user/1`).reply(200, [
    {
      id: 1,
      title: 'Processing Loan',
      initialAmount: 10000,
      interest: 0.05,
      term: 24,
      payFrequent: 'weekly',
      startedDate: new Date(2019, 12, 7),
      repaymentMethod: 'standard',
      balance: 10000,
      status: 'processing'
    },
    {
      id: 2,
      title: 'Approved Loan with no repayment amount',
      initialAmount: 10000,
      interest: 0.05,
      term: 24,
      payFrequent: 'weekly',
      startedDate: new Date(2019, 1, 7),
      repaymentMethod: 'onlyInterest',
      balance: 9000,
      status: 'approved'
    },
    {
      id: 3,
      title: 'Mock Repay Successfully',
      initialAmount: 10000,
      interest: 0.05,
      term: 24,
      payFrequent: 'weekly',
      startedDate: new Date(2019, 1, 7),
      repaymentMethod: 'onlyInterest',
      balance: 9000,
      repaymentAmount: 9000 * 0.05,
      status: 'approved'
    },
    {
      id: 4,
      title: 'Mock Repay Error',
      initialAmount: 10000,
      interest: 0.05,
      term: 24,
      payFrequent: 'weekly',
      startedDate: new Date(2019, 1, 7),
      repaymentMethod: 'onlyInterest',
      balance: 9000,
      repaymentAmount: 9000 * 0.05,
      status: 'approved'
    }
  ]);
  mock.onPost(`${mockUrl}/loans/3/repay`).reply(200);
  mock.onPost(`${mockUrl}/loans/4/repay`).reply(400);
};

export const initMockAxios = () => {
  const mock = new MockAdapter(axios, { delayResponse: 2000 });
  mocAuth(mock);
  mockLoans(mock);
  return mock;
};
