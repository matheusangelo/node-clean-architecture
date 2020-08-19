import { EmailValidatorAdapter } from './email-validator.adapter'

interface SutTypes{
  sut: EmailValidatorAdapter
}
const makeSut = (): SutTypes => {
  return {
    sut: new EmailValidatorAdapter()
  }
}
describe('Email-Validator', () => {
  test('should return false when send a valid email to validate', () => {
    const { sut } = makeSut()
    const validate = sut.isValid('matheus@gmail.com')
    expect(validate).toBe(true)
  })

  test('should return false when send a invalid email to validate', () => {
    const { sut } = makeSut()
    const validate = sut.isValid('matheusgmail.com')
    expect(validate).toBe(false)
  })

  test('should return false when send a invalid email to validate', () => {
    const { sut } = makeSut()
    const isValidSpy = jest.spyOn(sut, 'isValid')
    sut.isValid('matheus@gmail.com')
    expect(isValidSpy).toHaveBeenCalledWith('matheus@gmail.com')
  })
})
