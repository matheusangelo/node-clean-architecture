import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { MongoHelper } from '../helper'

interface SutTypes {
  accountRepository: AddAccountRepository
}

const makeSut = (): SutTypes => {
  return {
    sut: new AccountRepository()
  }
}
describe('MongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('should return sucess', async () => {
    const { sut } = makeSut()

    const account = {
      name: 'matheus',
      email: 'matheus@gmail.com',
      password: 'hashed_password'
    }

    const validate = await sut.add(account)

    expect(validate).toBeTruthy()
    expect(validate.id).toBeTruthy()
    expect(validate.name).toBeTruthy(account.name)
    expect(validate.password).toBeTruthy(account.password)
    expect(validate.email).toBeTruthy(account.email)
  })
})
