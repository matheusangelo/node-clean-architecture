import { MongoHelper } from '../helper'
import { AccountRepository } from './account'

const makeSut = (): any => {
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
    expect(validate.name).toBe(account.name)
    expect(validate.password).toBe(account.password)
    expect(validate.email).toBe(account.email)
  })
})
