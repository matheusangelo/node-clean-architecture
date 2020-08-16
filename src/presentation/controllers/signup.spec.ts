import { SignUpController } from './signup'
import { MissingParamError } from '../errors/missing-param-errors'
import { EmailValidator } from '../protocols/email-validator'
import { InvalidParamError } from '../errors/invalid-param-errros'

interface SutTypes{
  sut: SignUpController
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  const emailValidatorStub = new EmailValidatorStub()
  const sut = new SignUpController(emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

describe('SignUpController', () => {
  test('Should return 400 if not send a valid request ', () => {
    const { sut } = makeSut()
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
    const { sut } = makeSut()
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
    const { sut } = makeSut()
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
    const { sut } = makeSut()
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
  test('Should return 400 if not send a valid request email', () => {
    const { sut, emailValidatorStub } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const httpRequest = {
      body: {
        email: 'teste@gmail.com',
        name: 'teste',
        password: 'teste',
        passwordConfirmation: 'teste'
      }
    }
    const validate = sut.handle(httpRequest)
    expect(validate.body).toEqual(new InvalidParamError('email'))
    expect(validate.statusCode).toBe(400)
  })
})
