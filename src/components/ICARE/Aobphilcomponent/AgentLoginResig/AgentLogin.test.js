import AgentLogin from './AgentLogin';

// Test cases for onLogin function
describe('onLogin function', () => {
    let mockSetOpenloader;
    let mockMessage;
    let mockAxios;
    let mockDispatch;
    let mockShowModal;
  
    beforeEach(() => {
      mockSetOpenloader = jest.fn();
      mockMessage = { error: jest.fn(), success: jest.fn() };
      mockAxios = { post: jest.fn() };
      mockDispatch = jest.fn();
      mockShowModal = jest.fn();
    });
  
    it('should show error for empty phone number', async () => {
      const phoneNumber = '';
      await onLogin();
      expect(mockSetOpenloader).toHaveBeenCalledWith(true);
      expect(mockMessage.error).toHaveBeenCalledWith('Please enter phone Number');
    });
  
    it('should show error for invalid phone number length', async () => {
      const phoneNumber = '123456789';
      await onLogin();
      expect(mockSetOpenloader).toHaveBeenCalledWith(true);
      expect(mockMessage.error).toHaveBeenCalledWith('Please enter valid phone Number');
    });
  
    it('should make API call and handle success response', async () => {
      const phoneNumber = '1234567890';
      const mockResponse = { data: { errCode: -1, errMsg: { message: 'Success' } } };
      mockAxios.post.mockResolvedValue(mockResponse);
  
      await onLogin();
  
      expect(mockSetOpenloader).toHaveBeenCalledWith(true);
      expect(mockAxios.post).toHaveBeenCalledWith(
        `${baseURL}auth/agent/registerd/agent/login`,
        { mobileNumber: phoneNumber },
        { headers: { ciphertext, authorization: null, 'Content-Type': 'application/json' } }
      );
      expect(mockSetOpenloader).toHaveBeenCalledWith(false);
      expect(mockMessage.success).toHaveBeenCalledWith('Success');
      expect(mockDispatch).toHaveBeenCalledWith(actions.storeAgentONBoardForm(mockResponse.data.data));
      expect(mockShowModal).toHaveBeenCalled();
    });
  
    it('should handle API error', async () => {
      const phoneNumber = '1234567890';
      const mockError = { response: { data: { errCode: 1, errMsg: 'Error message' } } };
      mockAxios.post.mockRejectedValue(mockError);
  
      await onLogin();
  
      expect(mockSetOpenloader).toHaveBeenCalledWith(true);
      expect(mockSetOpenloader).toHaveBeenCalledWith(false);
      expect(mockMessage.error).toHaveBeenCalledWith('Error message');
    });
  });