import { actions as apiActions } from 'store/ducks/api';
import { applyApiService } from './apiService';
jest.mock('store/ducks/api');

describe('applyApiService', () => {
  const mockArgs = 5;
  const mockDispatch = jest.fn();
  it('should dispatch beginCall and endCall of apiActions', async () => {
    const mockApiService = () => Promise.resolve('any');
    await applyApiService(mockDispatch, mockApiService, mockArgs);
    expect(mockDispatch).toHaveBeenCalledWith(apiActions.beginCall());
    expect(mockDispatch).toHaveBeenCalledWith(apiActions.endCall());
  });

  it('should call apiService with the provided args', async () => {
    const mockResult = 'any';
    const mockApiService = jest.fn(() => Promise.resolve(mockResult));
    const result = await applyApiService(
      mockDispatch,
      mockApiService,
      mockArgs
    );
    expect(mockApiService).toHaveBeenCalledWith(mockArgs);
    expect(result).toEqual(mockResult);
  });
});
