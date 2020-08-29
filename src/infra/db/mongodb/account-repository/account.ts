import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AddAccountModel } from '../../../../domain/usescases/add-account'
import { AccountModel } from '../../../../data/usescase/add-account/db-add-account-protocols'
import { MongoHelper } from '../helper'

export class AccountRepository implements AddAccountRepository {
  async add (command: AddAccountModel): Promise<AccountModel> {
    const LAST_REGISTER_INSERTED = 0
    const accountCollection = MongoHelper.getCollection('accounts')
    const results = await accountCollection.insertOne(command)
    const account = MongoHelper.map(results.ops[LAST_REGISTER_INSERTED])
    return new Promise(resolve => resolve(account))
  }
}
