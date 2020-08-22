import { DbAddAccount } from './db-add-account'

describe('Add Account Implementation', () => {
  test('should send a password with encripter ', async () => {
    class EncriptorStub {
      async encript (value: string): Promise<string> {
        return new Promise(resolve => resolve('encripted'))
      }
    }
    const encriptorStub = new EncriptorStub()
    const sut = new DbAddAccount(encriptorStub)
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
