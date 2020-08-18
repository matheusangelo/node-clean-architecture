import {
  AddAccount,
  Controller,
  EmailValidator,
  HttpRequest,
  HttpResponse,
  badRequest,
  serverError,
  ok,
  MissingParamError,
  InvalidParamError
} from '../signup/sigunp.index'

export class SignUpController implements Controller {
  private readonly _emailValidation: EmailValidator
  private readonly _addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this._emailValidation = emailValidator
    this._addAccount = addAccount
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation'
      ]

      for (const required of requiredFields) {
        if (!httpRequest.body[required]) {
          return badRequest(new MissingParamError(required))
        }
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValidEmail = this._emailValidation.isValid(email)

      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'))
      }

      const account = await this._addAccount.add({
        name,
        email,
        password
      })

      return ok(account)
    } catch (error) {
      return serverError()
    }
  }
}
