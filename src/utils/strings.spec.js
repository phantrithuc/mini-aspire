import { formatCurrency } from './strings';
describe('formatCurrency', () => {
  it('should return currency string in USD', () => {
    expect(formatCurrency(100)).toEqual('$100.00');
  });
  it('should return $0.00 when input value is null', () => {
    expect(formatCurrency(null)).toEqual('$0.00');
  });
});
