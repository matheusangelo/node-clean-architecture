import { SignUpController } from './signup'

describe('SignUpController', () => {
  test('Should return 400 if not send a valid request ', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        email: 'teste@gmail.com',
        password: 'teste',
        passwordConfirmation: 'teste'
      }
    }
    const validate = sut.handle(httpRequest)
    expect(validate.body).toEqual(new Error('Missing params: name'))
    expect(validate.statusCode).toBe(400)
  })
  test('Should return 400 if not send a valid request email', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        name: 'teste',
        password: 'teste',
        passwordConfirmation: 'teste'
      }
    }
    const validate = sut.handle(httpRequest)
    expect(validate.body).toEqual(new Error('Missing params: email'))
    expect(validate.statusCode).toBe(400)
  })
})
