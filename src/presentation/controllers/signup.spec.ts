import { SignUpController } from './signup'
import { MissingParamError } from '../errors/missing-param-errors'
import { EmailValidator } from '../protocols/email-validator'
import { InvalidParamError } from '../errors/invalid-param-errros'
import { InternalServerError } from '../errors/internal-server-error'
import { AddAccountModel, AddAccount } from '../../domain/usescases/add-account'
import { AccountModel } from '../../domain/models/account'

class EmailValidatorInternalServerErrorStub implements EmailValidator {
  isValid (email: string): boolean {
    throw new InternalServerError()
  }
}

class AddAccountStub implements AddAccount {
  add (account: AddAccountModel): AccountModel {
    return {
      id: 'valid_Id',
      name: 'valid_name',
      email: 'valid@mail.com',
      password: 'teste'
    }
  }
}

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
  addAccountStub: AddAccountStub
}

const makeSut = (): SutTypes => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  const emailValidatorStub = new EmailValidatorStub()
  const addAccountStub = new AddAccountStub()

  const sut = new SignUpController(emailValidatorStub, addAccountStub)
  return {
    sut,
    emailValidatorStub,
    addAccountStub
  }
}

describe('SignUpController', () => {
  test('Should return 400 if not send a valid request ', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'teste@gmail.com',
        password: 'teste',
        passwordConfirmation: 'teste'
      }
    }
    const validate = await sut.handle(httpRequest)
    expect(validate.body).toEqual(new MissingParamError('name'))
    expect(validate.statusCode).toBe(400)
  })
  test('Should return 400 if not send a valid request email', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'teste',
        password: 'teste',
        passwordConfirmation: 'teste'
      }
    }
    const validate = await sut.handle(httpRequest)
    expect(validate.body).toEqual(new MissingParamError('email'))
    expect(validate.statusCode).toBe(400)
  })
  test('Should return 400 if not send a valid request password', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'teste@gmail.com',
        name: 'teste',
        passwordConfirmation: 'teste'
      }
    }
    const validate = await sut.handle(httpRequest)
    expect(validate.body).toEqual(new MissingParamError('password'))
    expect(validate.statusCode).toBe(400)
  })
  test('Should return 400 if not send a valid request passwordConfirmation', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'teste@gmail.com',
        name: 'teste',
        password: 'teste'
      }
    }
    const validate = await sut.handle(httpRequest)
    expect(validate.body).toEqual(new MissingParamError('passwordConfirmation'))
    expect(validate.statusCode).toBe(400)
  })
  test('Should return 400 if not send a valid request email', async () => {
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
    const validate = await sut.handle(httpRequest)
    expect(validate.body).toEqual(new InvalidParamError('email'))
    expect(validate.statusCode).toBe(400)
  })
  test('Should return 500 if not send a valid request email', async () => {
    const emailValidatorStubWithError = new EmailValidatorInternalServerErrorStub()
    const addAccountStub = new AddAccountStub()

    const sut = new SignUpController(emailValidatorStubWithError, addAccountStub)

    const httpRequest = {
      body: {
        email: 'teste@gmail.com',
        name: 'teste',
        password: 'teste',
        passwordConfirmation: 'teste'
      }
    }
    const validate = await sut.handle(httpRequest)
    expect(validate.body).toEqual(new InternalServerError())
    expect(validate.statusCode).toBe(500)
  })
  test('Should return 500 if not send a valid request email with spy', async () => {
    const { sut, emailValidatorStub } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpRequest = {
      body: {
        email: 'teste@gmail.com',
        name: 'teste',
        password: 'teste',
        passwordConfirmation: 'teste'
      }
    }
    const validate = await sut.handle(httpRequest)
    expect(validate.body).toEqual(new InternalServerError())
    expect(validate.statusCode).toBe(500)
  })
  test('Should return 400 if password and confirmPassword are not equal', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        email: 'teste@gmail.com',
        name: 'teste',
        password: 'teste',
        passwordConfirmation: 'teste1'
      }
    }
    const validate = await sut.handle(httpRequest)
    expect(validate.body).toEqual(new InvalidParamError('passwordConfirmation'))
    expect(validate.statusCode).toBe(400)
  })
  test('Should return 500 if not send a valid request for create account with spy', async () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')

    const httpRequest = {
      body: {
        email: 'teste@gmail.com',
        name: 'teste',
        password: 'teste',
        passwordConfirmation: 'teste'
      }
    }

    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      email: httpRequest.body.email,
      name: httpRequest.body.name,
      password: httpRequest.body.password
    })
  })
})
