import { DbAddAccount } from './db-add-account'
import { Encripter } from '../../protocols/encripter'

interface SutTypes {
  sut: DbAddAccount
  encriptorStub: Encripter
}

const makeEncripterStub = (): Encripter => {
  class EncriptorStub implements Encripter {
    async encript (value: string): Promise<string> {
      return new Promise(resolve => resolve('encripted'))
    }
  }
  return new EncriptorStub()
}

const makeSut = (): SutTypes => {
  const encriptorStub = makeEncripterStub()
  const sut = new DbAddAccount(encriptorStub)
  return {
    sut,
    encriptorStub
  }
}

describe('Add Account Implementation', () => {
  test('should send a password with encripter ', async () => {
    const { sut, encriptorStub } = makeSut()

    const encriptorSpy = jest.spyOn(encriptorStub, 'encript')

    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }

    await sut.add(accountData)
    expect(encriptorSpy).toHaveBeenLastCalledWith(accountData.password)
  })
})
