import { AddAccount, AddAccountModel, AccountModel, Encripter } from './db-add-account-protocols'
import { AddAccountRepository } from '../../protocols/add-account-repository'

export class DbAddAccount implements AddAccount {
  private readonly _encripter: Encripter;
  private readonly _addAccountRepository: AddAccountRepository;

  constructor (encripter: Encripter, addAccountRepository: AddAccountRepository) {
    this._encripter = encripter
    this._addAccountRepository = addAccountRepository
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    const encriptedPassword = await this._encripter.encript(account.password)
    const addedAccount = await this._addAccountRepository.add({ ...account, password: encriptedPassword })
    return new Promise((resolve, reject) => {
      resolve(addedAccount)
    })
  }
}
