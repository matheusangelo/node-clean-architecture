import { AddAccountModel } from '../../domain/usescases/add-account'
import { AccountModel } from '../../domain/models/account'

export interface AddAccountRepository {
  add (command: AddAccountModel): Promise<AccountModel>
}
