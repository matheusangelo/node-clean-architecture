import { Encripter } from '../../data/protocols/encripter'
import { BcriptAdapter } from './bcript-adapter'
import bcript from 'bcrypt'

const makeEncrpiterAdapterStub = (): Encripter => {
  class EncripterAdapterStub implements Encripter {
    async encript (value: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_value'))
    }
  }
  return new EncripterAdapterStub()
}

interface SutTypes {
  sut: BcriptAdapter
  encripterAdapterStub: Encripter
}
const makeSut = (): SutTypes => {
  const encripterAdapterStub = makeEncrpiterAdapterStub()
  return {
    sut: new BcriptAdapter(),
    encripterAdapterStub
  }
}
describe('Encripter Adapter suit tests', () => {
  test('return sucess when send a valid password', async () => {
    const { sut } = makeSut()
    const bcryptSpy = jest.spyOn(bcript, 'hash')
    await sut.encript('password')

    expect(bcryptSpy).toHaveBeenCalledWith('password', 12)
  })
})
