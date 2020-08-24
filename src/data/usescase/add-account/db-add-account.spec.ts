import { DbAddAccount } from './db-add-account'
import { Encripter } from '../../protocols/encripter'
import { AddAccountModel } from './db-add-account-protocols'
import { AccountModel } from '../../../domain/models/account'
import { AddAccountRepository } from '../../protocols/add-account-repository'

interface SutTypes {
  sut: DbAddAccount
  encriptorStub: Encripter
  addAccountStub: AddAccountRepository
}

const makeAddAccountStub = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (command: AddAccountModel): Promise<AccountModel> {
      return new Promise(resolve => resolve({ ...command, id: 'valid_id' }))
    }
  }
  return new AddAccountRepositoryStub()
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
  const addAccountStub = makeAddAccountStub()
  const encriptorStub = makeEncripterStub()
  const sut = new DbAddAccount(encriptorStub, addAccountStub)
  return {
    sut,
    encriptorStub,
    addAccountStub
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
  test('should send a sucess when send a valid request ', async () => {
    const { sut } = makeSut()

    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }

    const newAccount = await sut.add(accountData)

    expect(newAccount).toEqual({
      ...accountData,
      id: 'valid_id',
      password: 'encripted'
    })
  })
})
