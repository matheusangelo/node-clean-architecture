import { AccountModel } from '../models/account'

// layer responsible to handle with bussines rules
export interface AddAccountModel{
  name: string
  email: string
  password: string
}

export interface AddAccount{
  add(account: AddAccountModel): AccountModel
}
