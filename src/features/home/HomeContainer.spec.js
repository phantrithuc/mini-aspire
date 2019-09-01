import React from 'react';
import { shallow } from 'enzyme';
import { useDispatch, useSelector } from 'react-redux';
import { getUserId } from 'store/ducks/auth/selectors';
import { getLoansByUserId } from 'services/loanService';
import { applyApiService } from 'services/apiService';
import HomeContainer from './HomeContainer';

jest.mock('react-redux');
jest.mock('services/loanService');
jest.mock('services/apiService');
describe('HomeContainer', () => {
  const loans = ['loan'];
  let useEffect;
  const mockUseEffect = () => {
    useEffect.mockImplementationOnce(f => f());
  };
  const setup = (loanData = loans) => {
    const mockDispatch = jest.fn();
    useDispatch.mockImplementation(() => mockDispatch);
    useSelector.mockReturnValue(1);
    getLoansByUserId.mockImplementation(() => {});
    applyApiService.mockResolvedValue({ data: loanData });
    useEffect = jest.spyOn(React, 'useEffect');
    const wrapper = shallow(<HomeContainer></HomeContainer>);
    return {
      wrapper,
      mockDispatch,
      applyApiService,
      getLoansByUserId,
      useSelector
    };
  };
  it('should get value from selector getUserId', () => {
    const { useSelector } = setup();
    expect(useSelector).toBeCalledWith(getUserId);
  });
  it('should call applyApiService with correct arguments on useEffect ', () => {
    mockUseEffect();
    const { mockDispatch, applyApiService, getLoansByUserId } = setup();
    expect(applyApiService).toHaveBeenCalledWith(
      mockDispatch,
      getLoansByUserId,
      1
    );
  });
});
