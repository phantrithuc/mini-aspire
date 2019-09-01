import { get, post } from 'axios';
import { apiUrl } from './endpoints';
const baseUrl = `${apiUrl}`;
export function getLoansByUserId(userId) {
  return get(`${baseUrl}/loans/user/${userId}`);
}

export function repay(loan) {
  return post(`${baseUrl}/loans/${loan.id}/repay`, loan).then(() => {
    //mock success repay for interestOnly
    loan.repaymentAmount = 0;
    return loan;
  });
}

export function submitLoan(loan) {
  return post(`${baseUrl}/loans`, loan);
}
