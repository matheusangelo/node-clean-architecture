import { AddAccount, AddAccountModel } from '../../../domain/usescases/add-account'
import { AccountModel } from '../../../domain/models/account'
import { Encripter } from '../../protocols/encripter'

export class DbAddAccount implements AddAccount {
  private readonly _encripter: Encripter;

  constructor (encripter: Encripter) {
    this._encripter = encripter
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    await this._encripter.encript(account.password)
    return new Promise((resolve, reject) => {
      resolve(null)
    })
  }
}
