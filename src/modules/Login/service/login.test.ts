import { requestLogin } from './login'

describe('Request to login', () => {
  describe('Happy cases', () => {
    it('should login successfully', async () => {
      // Arrange
      const username = 'harry'
      const password = '0000'
      // Act
      const response = await requestLogin(username, password)
      // Assert
      expect(response).toBe('ok')
    })
  })
})
