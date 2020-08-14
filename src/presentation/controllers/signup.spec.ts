import { SignUpController } from './signup'
import { MissingParamError } from '../errors/missing-param-errors'

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
    expect(validate.body).toEqual(new MissingParamError('name'))
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
    expect(validate.body).toEqual(new MissingParamError('email'))
    expect(validate.statusCode).toBe(400)
  })
  test('Should return 400 if not send a valid request password', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        email: 'teste@gmail.com',
        name: 'teste',
        passwordConfirmation: 'teste'
      }
    }
    const validate = sut.handle(httpRequest)
    expect(validate.body).toEqual(new MissingParamError('password'))
    expect(validate.statusCode).toBe(400)
  })
  test('Should return 400 if not send a valid request passwordConfirmation', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        email: 'teste@gmail.com',
        name: 'teste',
        password: 'teste'
      }
    }
    const validate = sut.handle(httpRequest)
    expect(validate.body).toEqual(new MissingParamError('passwordConfirmation'))
    expect(validate.statusCode).toBe(400)
  })
})
